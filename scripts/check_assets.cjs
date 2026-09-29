const fs = require('fs')
const dir = 'C:/Users/felic/.openclaw-autoclaw/workspace/projects/website-fa6636ad37b4e1bb881a0e2f'
const jsFile = fs.readdirSync(dir + '/assets').find((f) => f.endsWith('.js'))
const js = fs.readFileSync(dir + '/assets/' + jsFile, 'utf8')
const re = /new URL\("([^"]+)",\s*import\.meta\.url\)/g
const names = [...new Set([...js.matchAll(re)].map((m) => m[1]))]
const missing = names.filter((n) => !fs.existsSync(dir + '/assets/' + n))
console.log('import.meta.url asset refs:', names.length, '(imgs:', names.filter((n) => n.endsWith('.jpg')).length + ', fonts:', names.filter((n) => n.endsWith('.woff2')).length + ')')
console.log('missing:', missing.length ? missing : 'none')
if (missing.length) process.exit(1)
