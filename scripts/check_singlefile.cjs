/**
 * Static + runtime sanity check for the single-file build.
 * Verifies: IIFE script (not type=module), inline CSS, data-URI images/fonts,
 * no fetchable external URLs, and that key content strings are present.
 */
const fs = require('fs')
const p = 'C:/Users/felic/.openclaw-autoclaw/workspace/jepepage-2026/dist/index.html'
const html = fs.readFileSync(p, 'utf8')

const checks = []
const ok = (name, cond) => checks.push([name, !!cond])

ok('no type=module script', !/script[^>]*type=["']module["']/.test(html))
ok('has inline <script>', /<script>/i.test(html))
ok('has inline <style>', /<style>/i.test(html))
ok('media inlined as data URIs', (html.match(/data:(image\/jpeg|video\/mp4);base64,/g) || []).length >= 13)
ok('fonts inlined as data URIs', (html.match(/data:font\/woff2;base64,/g) || []).length >= 10)

const fetchable = (html.match(/(?:src|href)="(https?:)?\/\/[^"]+"/g) || []).filter(
  (u) => !u.includes('www.w3.org') && !u.includes('reactjs.org'),
)
ok('no fetchable external refs', fetchable.length === 0)

const needles = [
  'Happy Birthday,', 'A little universe, just for you.', 'Open When...',
  'Different moments, same love.', 'Our Memories', 'you need a hug',
  'The best surprise is still waiting for you.', 'I love you. Always.',
  '09 · 29 · 2026', 'Previous Birthday', 'a little message for you',
]
const missing = needles.filter((n) => !html.includes(n))
ok('all key copy present', missing.length === 0)

let pass = true
for (const [name, good] of checks) {
  console.log((good ? 'PASS' : 'FAIL') + '  ' + name)
  if (!good) pass = false
}
if (missing.length) console.log('missing copy:', missing)
if (fetchable.length) console.log('external refs:', fetchable)
process.exit(pass ? 0 : 1)
