const fs = require('fs')
const h = fs.readFileSync('C:/Users/felic/.openclaw-autoclaw/workspace/jepepage-2026/dist/index.html', 'utf8')
// find all occurrences of Begin the journey with context
let idx = 0
let n = 0
while ((idx = h.indexOf('Begin the journey', idx)) !== -1) {
  n++
  console.log('occurrence ' + n + ':', JSON.stringify(h.slice(idx - 100, idx + 40)))
  idx += 10
}
// and the note section CTA
const i = h.indexOf('note-copy')
console.log('note-copy ctx:', JSON.stringify(h.slice(i, i + 300)))
