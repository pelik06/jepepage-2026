const fs = require('fs')
const dir = 'C:/Users/felic/.openclaw-autoclaw/workspace/projects/website-fa6636ad37b4e1bb881a0e2f'
const html = fs.readFileSync(dir + '/index.html', 'utf8')
const jsFile = fs.readdirSync(dir + '/assets').find((f) => f.endsWith('.js'))
const js = fs.readFileSync(dir + '/assets/' + jsFile, 'utf8')
const cssFile = fs.readdirSync(dir + '/assets').find((f) => f.endsWith('.css'))
const css = fs.readFileSync(dir + '/assets/' + cssFile, 'utf8')

// 1. every html ref exists and is local
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])
for (const r of refs) {
  if (r.startsWith('http') || r.startsWith('//')) throw new Error('external ref in html: ' + r)
  const p = dir + '/' + r.replace(/^\.\//, '')
  if (!fs.existsSync(p)) throw new Error('missing ref target: ' + r)
}

// 2. css has no fetchable external urls (xmlns is inert)
const cssExt = [...css.matchAll(/https?:\/\/[^\s"')]+/g)].map((m) => m[0]).filter((u) => !u.includes('www.w3.org'))
if (cssExt.length) throw new Error('css external: ' + cssExt)

// 3. js fetchable externals (react error-decoder string is inert)
const jsExt = [...js.matchAll(/https?:\/\/[^\s"')]+/g)].map((m) => m[0]).filter((u) => !u.includes('www.w3.org') && !u.includes('reactjs.org/docs/error-decoder'))
if (jsExt.length) throw new Error('js external: ' + jsExt)

// 4. images referenced from JS all exist
const imgs = [...js.matchAll(/"(\.\/assets\/img\/[^"]+)"/g)].map((m) => m[1].replace(/^\.\//, ''))
for (const i of imgs) if (!fs.existsSync(dir + '/' + i)) throw new Error('missing image: ' + i)

// 5. fonts referenced from CSS all exist (css lives at /assets/index.css)
const fonts = [...css.matchAll(/url\(([^)]+\.woff2)\)/g)].map((m) => m[1].replace(/["']/g, ''))
for (const f of fonts) {
  const p = dir + '/assets/' + f.replace(/^\.\//, '').replace(/^\.\.\//, '')
  if (!fs.existsSync(p)) throw new Error('missing font: ' + f + ' -> ' + p)
}

console.log('delivery check OK: ' + refs.length + ' html refs exist, no fetchable externals, ' + imgs.length + ' images + ' + fonts.length + ' fonts resolve')
