const fs = require('fs')
const h = fs.readFileSync('C:/Users/felic/.openclaw-autoclaw/workspace/jepepage-2026/dist/index.html', 'utf8')

// 1. parallax layer hooks present in the bundle
const hooks = ['px-moon', 'px-clouds', 'px-text', 'px-landscape', 'px-cue', 'px-photo']
const missingHooks = hooks.filter((k) => !h.includes(k))
console.log('parallax layers in bundle:', hooks.length - missingHooks.length + '/' + hooks.length, missingHooks.length ? 'MISSING: ' + missingHooks : '')

// 2. ghost button removed: exactly one "Begin the journey" CTA, no "Skip to the surprise"
const begin = (h.match(/Begin the journey/g) || []).length
const skip = h.includes('Skip to the surprise')
console.log('"Begin the journey" occurrences:', begin, '(hero expected: 1)')
console.log('"Skip to the surprise" removed:', !skip)

// 3. pointer parallax code present
console.log('pointer parallax bound:', h.includes('pointermove'))

// 4. integrity re-check
const ok = !/type="module"/.test(h) && !h.includes('Â·') && h.includes('09 · 29 · 2026') && h.includes('I love you. Always.')
console.log('integrity:', ok ? 'OK' : 'BROKEN')
process.exit(missingHooks.length || skip || !ok || begin !== 1 ? 1 : 0)
