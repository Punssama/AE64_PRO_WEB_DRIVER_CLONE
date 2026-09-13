// The desktop app IS the web app: it loads the very same index.html. This copies it into
// app/ with the only change a desktop build needs - the Google Fonts <link>s swapped for the
// bundled VT323 files - so there is one source of truth for the UI and logic, never a fork.
// Run by `npm run prep` before `electron .` / `electron-builder`.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const srcHtml = join(here, '..', 'index.html');   // the web app, one directory up
const outDir = join(here, 'app');
const assets = join(here, 'assets');

const SUBSETS = [
  ['VT323-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'],
  ['VT323-latin-ext.woff2', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF'],
  ['VT323-vietnamese.woff2', 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'],
];
const fontCss = '<style>\n' + SUBSETS.map(([file, range]) =>
  `@font-face{font-family:'VT323';font-style:normal;font-weight:400;font-display:swap;src:url('${file}') format('woff2');unicode-range:${range};}`
).join('\n') + '\n</style>';

let html = readFileSync(srcHtml, 'utf8');
const before = html;
html = html
  .replace(/[ \t]*<link rel="preconnect" href="https:\/\/fonts\.g(oogleapis|static)\.com"[^>]*>\r?\n/g, '')
  .replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=VT323[^>]*>/, fontCss);

// Fail loud rather than ship a build that silently falls back to Courier New, or one that
// still phones Google Fonts on every launch.
if (html === before || /fonts\.(googleapis|gstatic)\.com/.test(html)) {
  console.error('build-html: the Google Fonts <link>s were not where expected in index.html - aborting so the font is not silently dropped.');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'index.html'), html);
for (const [file] of SUBSETS) copyFileSync(join(assets, file), join(outDir, file));
console.log('build-html: wrote app/index.html + ' + SUBSETS.length + ' font files from ../index.html');
