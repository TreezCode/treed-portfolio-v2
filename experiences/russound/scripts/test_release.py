"""Negative tests for the release boundary, independent of project dependencies."""
from __future__ import annotations

from http.client import HTTPConnection
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
import tempfile
from threading import Thread
import unittest

import release
from serve import make_handler


class ReleaseBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.dist = Path(self.temp.name).resolve() / 'dist'
        self.dist.mkdir()
        for page in release.PAGE_KEYS:
            self.write(page, '<main id="main">Maureen Baldwin acquires the company. MY NOTES</main><a href="/#main">Home</a>')
        self.write('index.html', '<main id="main">Home</main><link rel="stylesheet" href="/_astro/main.css"><script src="/_astro/main.js"></script><img srcset="/media/one.webp 1x, /media/two.webp 2x">')
        self.write('_astro/main.css', '@font-face{src:url("./font.woff2")}')
        self.write('_astro/main.js', 'import "./data.js";const movie="/oct27/hero.mp4#t=0,6.25";const art="/streaming01/russound-rooms-original.jpg";const page="/catalog/?family=audio";')
        self.write('_astro/data.js', 'const data={message:"Internal amplifier; installation notes and MY NOTES"};')
        for asset in ('media/one.webp', 'media/two.webp', '_astro/font.woff2', 'oct27/hero.mp4', 'streaming01/russound-rooms-original.jpg'):
            self.write(asset, 'sample-asset-0123456789')
        # Unreachable private input must never be copied as part of a broad dist operation.
        self.write('documents/private.pdf', 'internal-not-for-release')

    def tearDown(self):
        self.temp.cleanup()

    def write(self, key, text):
        path = self.dist / key
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding='utf-8')

    def test_closure_includes_dynamic_media_imports_fonts_and_srcset(self):
        selected, edges, anchors = release.collect(self.dist)
        self.assertIn('_astro/data.js', selected)
        self.assertIn('_astro/font.woff2', selected)
        self.assertIn('oct27/hero.mp4', selected)
        self.assertIn('media/two.webp', selected)
        self.assertNotIn('documents/private.pdf', selected)
        self.assertGreater(anchors, 0)
        self.assertTrue(any(edge['reference'] == '/catalog/?family=audio' for edge in edges))

    def test_private_content_in_comment_bundle_or_metadata_fails(self):
        for key, text in [('index.html', '<!-- Nate review notes -->'), ('_astro/tool.js', 'const payload="/documents/proposed-sitemap.pdf"'), ('_astro/tool.css', '/* Review guide */'), ('media/a.jpg', 'metadata file:///C:/Users/private')]:
            with self.subTest(key=key), self.assertRaises(AssertionError):
                release.privacy_scan(key, text.encode())

    def test_public_history_and_visitor_notes_are_allowed(self):
        release.privacy_scan('index.html', b'Maureen Baldwin acquires the company. Internal amplifier. Installation notes. MY NOTES')
        release.privacy_scan('refinement29/maureen-lobby.webp', b'photo')

    def test_forbidden_page_document_and_traversal_fail(self):
        self.write('review/index.html', '<main>private</main>')
        cases = ['/review/', '/documents/private.pdf', '../private.pdf', '/media/missing.webp']
        for reference in cases:
            with self.subTest(ref=reference), self.assertRaises(AssertionError):
                release.resolve(reference, self.dist / 'index.html', self.dist)

    def test_missing_dependency_extra_route_and_broken_anchor_fail(self):
        self.write('_astro/main.js', 'const image="/media/missing.webp";')
        with self.assertRaises(AssertionError):
            release.collect(self.dist)
        self.write('secret/index.html', 'private page')
        with self.assertRaises(AssertionError):
            release.collect(self.dist)

    def test_broken_fragment_fails(self):
        self.write('news/index.html', '<a href="/#does-not-exist">Broken</a>')
        with self.assertRaises(AssertionError):
            release.collect(self.dist)

    def test_server_boundary_and_video_ranges(self):
        selected, _, _ = release.collect(self.dist)
        upload = Path(self.temp.name) / 'upload'
        for key, data in selected.items():
            target = upload / key
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
        (upload.parent / 'source-manifest.json').write_text('private')
        # Even an unexpected file placed inside upload is not part of the server allowlist.
        (upload / 'private.pdf').write_text('private')
        manifest = {'files': [{'path': key} for key in selected]}
        handler = make_handler(upload, manifest)
        handler.log_message = lambda *args: None
        server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
        worker = Thread(target=server.serve_forever, daemon=True)
        worker.start()
        try:
            def request(path, headers=None, method='GET'):
                conn = HTTPConnection('127.0.0.1', server.server_port)
                conn.request(method, path, headers=headers or {})
                response = conn.getresponse()
                result = response.status, dict(response.getheaders()), response.read()
                conn.close()
                return result
            for path in ('/handoff-review/', '/review/', '/documents/proposed-sitemap.pdf', '/source-manifest.json', '/asset-provenance.json', '/package-manifest.json', '/russound-portfolio-edition.zip', '/scripts/release.py', '/src/pages/index.astro', '/private.pdf', '/media/', '/_astro/', '/_headers', '/unknown', '/../source-manifest.json', '/%2e%2e/source-manifest.json', '/%252e%252e/source-manifest.json', '/%5c..%5csource-manifest.json'):
                with self.subTest(path=path):
                    status, _, data = request(path)
                    self.assertEqual(status, 404)
                    self.assertEqual(data, selected['404.html'])
            self.assertEqual(request('/')[0], 200)
            self.assertEqual(request('/catalog/')[0], 200)
            self.assertEqual(request('/catalog')[0], 308)
            status, headers, data = request('/oct27/hero.mp4', {'Range': 'bytes=0-5'})
            self.assertEqual((status, data), (206, b'sample'))
            self.assertEqual(headers['Content-Range'], 'bytes 0-5/23')
            self.assertEqual(request('/oct27/hero.mp4', {'Range': 'bytes=999-1000'})[0], 416)
            self.assertEqual(request('/oct27/hero.mp4', {'Range': 'bytes=-2'})[2], b'89')
            self.assertEqual(request('/oct27/hero.mp4', method='HEAD')[2], b'')
        finally:
            server.shutdown()
            server.server_close()
            worker.join()


if __name__ == '__main__':
    unittest.main()
