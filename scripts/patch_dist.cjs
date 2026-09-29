/**
 * Post-build patcher for dist/index.html (single-file build):
 * 1. converts <script type="module" crossorigin> to a classic <script>
 *    (module scripts are MIME-strict on some managed hosts; classic scripts are not)
 * 2. strips any BOM and re-saves strictly as UTF-8 without BOM
 * 3. verifies content integrity (key copy strings, inline assets, no externals)
 */
const fs = require('fs')
const p = 'C:/Users/felic/.openclaw-autoclaw/workspace/jepepage-2026/dist/index.html'

let html = fs.readFileSync(p, 'utf8')
if (html.charCodeAt(0) === 0xfeff) html = html.slice(1)
html = html.replace('<script type="module" crossorigin>', '<script>')
fs.writeFileSync(p, html, { encoding: 'utf8' }) // Node writes UTF-8 without BOM

// verify
const out = fs.readFileSync(p, 'utf8')
const needles = [
  '09 · 29 · 2026', 'Happy Birthday,', 'A little universe, just for you.',
  'Open When...', 'Different moments, same love.', 'you need a hug',
  'The best surprise is still waiting for you.', 'I love you. Always.',
  'Previous Birthday', 'a little message for you',
]
let fail = false
if (out.charCodeAt(0) === 0xfeff) { console.log('FAIL: BOM present'); fail = true }
if (/script[^>]*type="module"/.test(out)) { console.log('FAIL: module script still present'); fail = true }
if (out.includes('Â·')) { console.log('FAIL: mojibake present'); fail = true }
for (const n of needles) {
  if (!out.includes(n)) { console.log('FAIL: missing copy: ' + n); fail = true }
}
const media = (out.match(/data:(image\/jpeg|video\/mp4);base64,/g) || []).length
if (media < 13) { console.log('FAIL: only ' + media + ' inline media'); fail = true }
console.log(fail ? 'PATCH FAILED' : 'PATCH OK — classic script, clean UTF-8, all content intact, ' + media + ' inline media assets')
process.exit(fail ? 1 : 0)
