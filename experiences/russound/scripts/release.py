"""Prepare immutable public assets and package only the clean demo's dependency closure.

Original client-review payload and source are read-only. Private evidence/ZIP/manifest
live beside upload/, never inside the directory served or deployed.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
from urllib.parse import unquote, urlsplit
import zipfile

if not __debug__:
    raise RuntimeError('Privacy verification requires Python without -O or PYTHONOPTIMIZE.')

ROOT = Path(__file__).resolve().parents[1]
FROZEN = Path(r'C:\Dev\russound-marketing\projects\russound-website-direction\work\client-package-simplification-2026-11-01\release\upload')
ASSET_ROOTS = {'media', 'navigation31', 'oct27', 'oct28', 'refinement29', 'revision28', 'streaming01', 'fonts'}
BINARY_EXT = {'.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg', '.mp4', '.webm', '.woff', '.woff2'}
ASSET_EXT = BINARY_EXT | {'.js', '.css', '.json'}
TEXT_EXT = {'.html', '.js', '.css', '.json', '.svg', '.txt'}
PAGE_KEYS = {'index.html', 'audio-systems/index.html', 'products/smz8/index.html',
             'catalog/index.html', 'connectivity-control/index.html', 'news/index.html', '404.html'}
FORBIDDEN = [
    r'/handoff-review(?:/|[?\"\'`])', r'/documents/', r'/review(?:/|[?\"\'`])',
    r'russound-(?:november-review|design-review|consolidated-review|team-review|refinement-review|cinematic-preview)\.pages\.dev',
    r'\breview\s+guide\b', r'review package and pdfs', r'\bMavlers\b', r'\bNate(?:[’\']s)?\b',
    r'Maureen(?:[’\']s)?\s+(?:screenshots|review|feedback)', r'\bmeeting (?:changes|notes|feedback)\b',
    r'joey(?:[’\']s)?\s+(?:clarifications|private|remaining.decisions)',
    r'JOEY-REMAINING-DECISIONS', r'review-cover', r'buyer-journey-walkthrough-r5', r'proposed-sitemap\.pdf',
    r'for joey.s preparation only', r'one.page package overview',
    r'file://', r'127\.0\.0\.1', r'localhost', r'C:[/\\](?:Users|Dev)',
    r'mail\.google\.com', r'outlook\.office365\.com/owa', r'BEGIN (?:RSA )?PRIVATE KEY',
    r'(?<![\w-])api[_-]?key\s*[:=]',
    r'sourceMappingURL\s*=',
]
PRIVATE_RE = re.compile('|'.join(f'(?:{p})' for p in FORBIDDEN), re.I)
MARKER_RE = re.compile(r'ds-review-launcher|direction-review-dialog|data-direction-review-open|data-smz-review|data-smz-option', re.I)
EXT_PATTERN = r'(?:js|css|woff2?|avif|webp|png|jpe?g|svg|mp4|webm|json|pdf|map|zip|md|astro|tsx?)'
QUOTED = re.compile(r'''["'`]((?:https?://)?[/A-Za-z0-9_.%~@-]+\.''' + EXT_PATTERN + r'''(?:[?#][^"'`<>\s]*)?)["'`]''')
CSS_URL = re.compile(r'''url\(\s*['"]?([^)'"\s]+)['"]?\s*\)''')
DYNAMIC = re.compile(r'''["'`](/(?:media|oct27|oct28|revision28|refinement29|navigation31|streaming01|fonts|_astro)/[^"'`<>\s]+)["'`]''')
ROOT_URL = re.compile(r'''["'`](/[^"'`<>\s\\]*)["'`]''')


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def frozen_inventory() -> list[dict]:
    return [{'path': p.relative_to(FROZEN).as_posix(), 'bytes': p.stat().st_size,
             'sha256': digest(p.read_bytes())} for p in sorted(FROZEN.rglob('*')) if p.is_file()]


def verify_preserved() -> dict:
    record = json.loads((ROOT / 'asset-provenance.json').read_text(encoding='utf-8'))
    assert record['frozenFiles'] == frozen_inventory(), 'Original frozen client-review payload changed'
    for item in record['copiedAssets']:
        p = ROOT / 'public' / item['path']
        assert p.is_file() and digest(p.read_bytes()) == item['sha256'], f'Public source changed: {p}'
    return record


def prepare() -> None:
    record_path = ROOT / 'asset-provenance.json'
    if record_path.exists():
        record = verify_preserved()
        print(json.dumps({'status': 'existing asset snapshot verified', 'copied': len(record['copiedAssets'])}))
        return
    originals = frozen_inventory()
    assert len(originals) == 86, 'Unexpected approved source payload; inspect before proceeding'
    selected = [item for item in originals if Path(item['path']).parts[0] in ASSET_ROOTS]
    assert selected and all(Path(i['path']).suffix.lower() in BINARY_EXT for i in selected)
    assert not (ROOT / 'public').exists(), 'Preserve existing public folder; inspect it before staging assets'
    for item in selected:
        target = ROOT / 'public' / item['path']
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(FROZEN / item['path'], target)
    record = {'capturedAtUtc': datetime.now(timezone.utc).isoformat(), 'frozenSource': str(FROZEN),
              'policy': 'Only original image/font/video assets. No HTML, JavaScript, documents or review PDFs copied.',
              'frozenFiles': originals, 'copiedAssets': selected}
    record_path.write_text(json.dumps(record, indent=2) + '\n', encoding='utf-8')
    verify_preserved()
    print(json.dumps({'status': 'prepared', 'copied': len(selected), 'protectedFiles': len(originals)}))


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs: list[str] = []
        self.ids: list[str] = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key in ('src', 'href', 'poster', 'action'):
                self.refs.append(value)
            elif key == 'srcset':
                self.refs.extend(piece.strip().split()[0] for piece in value.split(',') if piece.strip())
            elif key == 'id':
                self.ids.append(value)


def privacy_scan(key: str, data: bytes) -> None:
    assert not PRIVATE_RE.search(key), f'Private path: {key}'
    # Binary metadata also passes the exact phrase/path scan, without copying it to the report.
    text = unescape(data.decode('utf-8', errors='ignore'))
    match = PRIVATE_RE.search(text)
    assert match is None, f'Internal-content signature in {key}: {match.group(0) if match else ""}'
    if Path(key).suffix in {'.html', '.js', '.json'}:
        assert not MARKER_RE.search(text), f'Review UI or query hook remains in {key}'


def extract(text: str, suffix: str) -> list[str]:
    refs = QUOTED.findall(text) + DYNAMIC.findall(text) + ROOT_URL.findall(text)
    if suffix in ('.html', '.css', '.svg'):
        refs += CSS_URL.findall(text)
    if suffix in ('.html', '.svg'):
        parser = References()
        parser.feed(text)
        refs += parser.refs
    return sorted(set(unescape(ref) for ref in refs))


def resolve(ref: str, parent: Path, dist: Path) -> Path | None:
    parsed = urlsplit(ref)
    if parsed.scheme or parsed.netloc or ref.startswith('#'):
        return None
    part = unquote(parsed.path)
    if not part:
        return None
    assert '\\' not in part and '\x00' not in part, f'Invalid local reference: {ref}'
    path = dist / part.lstrip('/') if part.startswith('/') else parent.parent / part
    path = path.resolve()
    assert path.is_relative_to(dist), f'Reference escapes build: {ref}'
    if part.endswith('/') or path.is_dir():
        path /= 'index.html'
    elif not path.suffix and not path.exists():
        path /= 'index.html'
    assert path.is_file(), f'Missing dependency: {parent.relative_to(dist)} -> {ref}'
    key = path.relative_to(dist).as_posix()
    if path.suffix == '.html':
        assert key in PAGE_KEYS, f'Unexpected local page: {key}'
    else:
        assert path.parts[len(dist.parts)] in ASSET_ROOTS | {'_astro'}, f'Unexpected asset root: {key}'
        assert path.suffix.lower() in ASSET_EXT, f'Forbidden file type: {key}'
    return path


def collect(dist: Path) -> tuple[dict[str, bytes], list[dict], int]:
    html_keys = {p.relative_to(dist).as_posix() for p in dist.rglob('*.html')}
    assert html_keys == PAGE_KEYS, f'Unexpected build routes: {sorted(html_keys ^ PAGE_KEYS)}'
    selected = {key: (dist / key).read_bytes() for key in sorted(PAGE_KEYS)}
    pending = list(sorted(PAGE_KEYS))
    seen = set(selected)
    edges = []
    while pending:
        key = pending.pop()
        parent = dist / key
        text = selected[key].decode('utf-8')
        for ref in extract(text, parent.suffix):
            child = resolve(ref, parent, dist)
            if child is None:
                continue
            child_key = child.relative_to(dist).as_posix()
            edges.append({'from': key, 'reference': ref, 'to': child_key})
            if child_key in seen:
                continue
            seen.add(child_key)
            selected[child_key] = child.read_bytes()
            if child.suffix in {'.html', '.js', '.css', '.json', '.svg'}:
                pending.append(child_key)
    ids = {}
    parsers = {}
    for key in sorted(PAGE_KEYS):
        parser = References()
        parser.feed(selected[key].decode('utf-8'))
        assert len(parser.ids) == len(set(parser.ids)), f'Duplicate IDs: {key}'
        ids[key] = set(parser.ids)
        parsers[key] = parser
    anchors = 0
    for key, parser in parsers.items():
        for ref in parser.refs:
            parsed = urlsplit(ref)
            if parsed.scheme or parsed.netloc:
                continue
            target = resolve(ref, dist / key, dist)
            target_key = target.relative_to(dist).as_posix() if target else key
            assert target_key in selected, f'Unpackaged reference: {key} -> {ref}'
            if parsed.fragment and target_key in ids:
                assert unquote(parsed.fragment) in ids[target_key], f'Missing fragment: {key} -> {ref}'
                anchors += 1
    selected['robots.txt'] = b'User-agent: *\nDisallow: /\n'
    selected['_headers'] = b'''/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
'''
    for key, data in selected.items():
        privacy_scan(key, data)
    assert any(key.endswith('.mp4') for key in selected), 'Expected the original cinematic media'
    assert 'streaming01/russound-rooms-original.jpg' in selected, 'Authentic App artwork missing'
    assert not any(Path(key).suffix in {'.map', '.pdf', '.md', '.ts', '.astro', '.zip'} for key in selected)
    return selected, edges, anchors


def package(release: Path) -> None:
    preserved = verify_preserved()
    dist = (ROOT / 'dist').resolve()
    selected, edges, anchors = collect(dist)
    assert not release.exists(), f'Preserve existing release: {release}. Select --release-dir for a new revision.'
    upload = release / 'upload'
    upload.mkdir(parents=True)
    for key, data in sorted(selected.items()):
        path = upload / key
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    archive = release / 'russound-portfolio-edition.zip'
    with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=7) as z:
        for key, data in sorted(selected.items()):
            info = zipfile.ZipInfo(key, (2026, 11, 3, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, data)
    manifest = {'preparedAtUtc': datetime.now(timezone.utc).isoformat(), 'purpose': 'Clean Russound portfolio edition',
                'status': 'Local release candidate; no deployment performed', 'routes': sorted(PAGE_KEYS),
                'protectedClientFiles': len(preserved['frozenFiles']), 'sourceProvenance': '../asset-provenance.json',
                'files': [{'path': key, 'bytes': len(data), 'sha256': digest(data)} for key, data in sorted(selected.items())],
                'referenceEdges': edges, 'anchorsChecked': anchors, 'zipSha256': digest(archive.read_bytes()),
                'privacyPolicy': 'No review routes, review PDFs, internal feedback, source maps, private paths or earlier review-site links. Public company history and visitor planner notes retained.'}
    (release / 'package-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    verify_release(release)
    print(json.dumps({'upload': str(upload), 'files': len(selected), 'bytes': sum(map(len, selected.values())), 'anchors': anchors, 'zip': str(archive)}, indent=2))


def verify_release(release: Path) -> None:
    verify_preserved()
    manifest = json.loads((release / 'package-manifest.json').read_text(encoding='utf-8'))
    upload = release / 'upload'
    expected = {item['path']: item for item in manifest['files']}
    actual = {p.relative_to(upload).as_posix() for p in upload.rglob('*') if p.is_file()}
    assert actual == set(expected), f'Unexpected/missing uploaded files: {sorted(actual ^ set(expected))}'
    for key, item in expected.items():
        path = upload / key
        assert path.resolve().is_relative_to(upload.resolve()), f'Unsafe symlink: {key}'
        data = path.read_bytes()
        assert digest(data) == item['sha256'], f'Release file changed: {key}'
        privacy_scan(key, data)
    archive = release / 'russound-portfolio-edition.zip'
    assert digest(archive.read_bytes()) == manifest['zipSha256'], 'Release ZIP changed'
    with zipfile.ZipFile(archive) as z:
        assert z.testzip() is None and set(z.namelist()) == set(expected)
        for key in z.namelist():
            assert digest(z.read(key)) == expected[key]['sha256'], f'ZIP mismatch: {key}'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['prepare', 'package', 'verify'])
    parser.add_argument('--release-dir', default='release')
    args = parser.parse_args()
    release = (ROOT / args.release_dir).resolve()
    assert release.is_relative_to(ROOT), 'Release output must stay inside this isolated project'
    if args.action == 'prepare':
        prepare()
    elif args.action == 'package':
        package(release)
    else:
        verify_release(release)
        print('Release bytes, archive, privacy scan and protected originals verified.')
