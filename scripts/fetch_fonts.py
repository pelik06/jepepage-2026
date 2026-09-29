"""Fetch latin woff2 subsets from Google Fonts for self-hosting (strict CSP: no CDN at runtime)."""
import re, urllib.request, os, sys

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CSS_URL = ("https://fonts.googleapis.com/css2?"
           "family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500"
           "&family=Jost:wght@300;400;500"
           "&family=Parisienne"
           "&family=Caveat:wght@400;500&display=swap")
OUT = r"C:\Users\felic\.openclaw-autoclaw\workspace\jepepage-2026\src\assets\fonts"
os.makedirs(OUT, exist_ok=True)

SLUG = {
    "Cormorant Garamond": "cormorant",
    "Jost": "jost",
    "Parisienne": "parisienne",
    "Caveat": "caveat",
}

req = urllib.request.Request(CSS_URL, headers={"User-Agent": UA})
css = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")

blocks = re.findall(r"/\*\s*(\S+)\s*\*/\s*@font-face\s*\{([^}]+)\}", css)
saved = []
for subset, body in blocks:
    if subset != "latin":
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", body).group(1)
    style = re.search(r"font-style:\s*(\w+)", body).group(1)
    weight = re.search(r"font-weight:\s*(\d+)", body).group(1)
    url = re.search(r"src:\s*url\((\S+?)\)", body).group(1)
    slug = SLUG[fam]
    suffix = "-italic" if style == "italic" else ""
    fname = f"{slug}-{weight}{suffix}.woff2"
    data = urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60
    ).read()
    with open(os.path.join(OUT, fname), "wb") as f:
        f.write(data)
    saved.append((fname, len(data)))

for name, size in saved:
    print(f"{name}  {size//1024}KB")
print(f"total: {sum(s for _, s in saved)//1024}KB, {len(saved)} files")
