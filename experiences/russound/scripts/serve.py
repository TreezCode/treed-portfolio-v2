"""Serve only the verified clean upload allowlist, with real 404s and video ranges."""
from __future__ import annotations

import argparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import mimetypes
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

import release


def make_handler(upload: Path, manifest: dict):
    upload = upload.resolve()
    allowed = {item['path'] for item in manifest['files']} - {'_headers'}
    if '404.html' not in allowed:
        raise ValueError('A real 404 document is required')
    for key in allowed:
        if not (upload / key).resolve().is_relative_to(upload):
            raise ValueError(f'Unsafe upload entry: {key}')

    class Handler(BaseHTTPRequestHandler):
        server_version = 'PortfolioPreview/1.0'
        sys_version = ''

        def do_GET(self):
            self.respond(False)

        def do_HEAD(self):
            self.respond(True)

        def respond(self, head_only):
            status = 200
            parsed = urlsplit(self.path)
            raw = unquote(parsed.path)
            invalid = (not raw.startswith('/') or raw.startswith('//') or any(c in raw for c in ('\\', '\x00', '%', ':'))
                       or any(part in ('.', '..') for part in raw.split('/')))
            key = raw.lstrip('/') if not invalid else ''
            if not invalid and raw.endswith('/'):
                key += 'index.html'
            if not invalid and key not in allowed and key + '/index.html' in allowed:
                self.send_response(308)
                self.send_header('Location', parsed.path + '/' + ('?' + parsed.query if parsed.query else ''))
                self.send_header('Content-Length', '0')
                self.end_headers()
                return
            if invalid or key not in allowed:
                key, status = '404.html', 404
            path = (upload / key).resolve()
            if not path.is_relative_to(upload) or not path.is_file():
                key, status = '404.html', 404
                path = upload / key
            size = path.stat().st_size
            start, end = 0, size - 1
            request_range = self.headers.get('Range') if status == 200 else None
            if request_range:
                match = re.fullmatch(r'bytes=(\d*)-(\d*)', request_range)
                if match and (match[1] or match[2]):
                    if match[1]:
                        start = int(match[1])
                        end = min(int(match[2]), size - 1) if match[2] else size - 1
                    else:
                        start, end = max(0, size - int(match[2])), size - 1
                    if start < size and start <= end:
                        status = 206
                    else:
                        status = 416
                else:
                    status = 416
            self.send_response(status)
            self.send_header('Content-Type', mimetypes.guess_type(key)[0] or 'application/octet-stream')
            self.send_header('X-Robots-Tag', 'noindex, nofollow')
            self.send_header('X-Content-Type-Options', 'nosniff')
            self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Accept-Ranges', 'bytes')
            if status == 416:
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers()
                return
            if status == 206:
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
            remaining = end - start + 1
            self.send_header('Content-Length', str(remaining))
            self.end_headers()
            if head_only:
                return
            try:
                with path.open('rb') as stream:
                    stream.seek(start)
                    while remaining:
                        data = stream.read(min(remaining, 65536))
                        if not data:
                            break
                        self.wfile.write(data)
                        remaining -= len(data)
            except (ConnectionResetError, BrokenPipeError):
                pass

    return Handler


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4336)
    parser.add_argument('--release-dir', default='release')
    args = parser.parse_args()
    directory = (release.ROOT / args.release_dir).resolve()
    if not directory.is_relative_to(release.ROOT):
        raise ValueError('Release must stay inside this isolated project')
    release.verify_release(directory)
    manifest = json.loads((directory / 'package-manifest.json').read_text(encoding='utf-8'))
    server = ThreadingHTTPServer(('127.0.0.1', args.port), make_handler(directory / 'upload', manifest))
    print(f'Verified upload only: http://127.0.0.1:{args.port}/', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
