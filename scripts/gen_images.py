"""Download seedream results, center-crop to target aspect, resize, save as JPG."""
import io, json, re, subprocess, sys, urllib.request, os
from PIL import Image

SKILL_DIR = r"C:\Users\felic\.openclaw-autoclaw\skills\autoglm-generate-image-seedream"
OUT_DIR = r"C:\Users\felic\.openclaw-autoclaw\workspace\jepepage-2026\src\assets\img"
RAW_DIR = os.path.join(OUT_DIR, "_raw")
os.makedirs(RAW_DIR, exist_ok=True)

TASKS = {
    "hero-couple": ("Minimal romantic digital illustration, wide 16:9 landscape. A deep midnight-navy starry night sky filling the upper two thirds, with a soft violet nebula glow and scattered tiny white stars. Below the horizon, a distant dark mountain silhouette with tiny warm golden city lights, and a calm lake reflecting the stars and lights. On the right side, a small silhouette of a couple standing close together gazing at the sky, viewed from behind. A delicate crescent moon glows softly in the upper left. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, muted lavender, soft warm pink glow #F7A8B8 near the horizon, warm gold #F7D08A tiny lights. Flat vector style with soft gradients, dreamy, calm, elegant, cinematic, lots of negative space, no text, no watermark, no borders.", 16/9, 1600),
    "finale": ("Minimal romantic digital illustration, wide 16:9 landscape. A night sky over a calm lake: deep midnight navy and violet with scattered stars and a crescent moon. Soft pastel fireworks bloom gently in the sky - pink, lavender and warm gold, elegant and subtle, not overwhelming. A couple silhouette standing close together on a low grassy hill at the bottom edge, seen from behind, watching the fireworks. Distant mountain silhouette and tiny golden city lights, reflections shimmering on the water. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, soft pink #F7A8B8, warm gold #F7D08A. Flat vector style with soft gradients, dreamy, cinematic, magical, calm, no text, no watermark, no borders.", 16/9, 1600),
    "mem-01": ("Minimal romantic flat vector illustration, square composition. A couple walking at night under a string of warm golden fairy lights hung between two trees, seen from behind at a slight distance. Deep midnight navy night sky with soft violet glow, warm amber light bokeh dots. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm gold #F7D08A, soft pink #F7A8B8. Soft gradients, dreamy, calm, cozy, lots of negative space, no text, no watermark, no borders.", 1.0, 900),
    "mem-02": ("Minimal romantic flat vector illustration, square composition. A small cafe table by a window at night: two cups of hot drinks with gentle steam, a tiny candle, seen from inside. Outside the window, blurred warm city lights bokeh in the deep blue night. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm amber #F7D08A, soft pink accents. Soft gradients, dreamy, intimate, cozy, negative space, no text, no watermark, no borders.", 1.0, 900),
    "mem-03": ("Minimal romantic flat vector illustration, square composition. A couple sitting wrapped together in one blanket on a wooden pier at night, seen from behind, looking up at a starry sky with a crescent moon. Calm lake with soft star reflections, a small warm lantern beside them. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, muted lavender, warm gold lantern glow #F7D08A, soft pink horizon. Soft gradients, dreamy, peaceful, intimate, negative space, no text, no watermark, no borders.", 1.0, 900),
    "mem-04": ("Minimal romantic flat vector illustration, square composition. A bright shooting star crossing a deep midnight-navy starry sky over a calm mountain lake at night, mirror-like water reflection, dark mountain silhouettes on both sides, soft pink glow near the horizon. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, soft pink #F7A8B8, lavender. Soft gradients, serene, dreamy, vast sky with negative space, no text, no watermark, no borders.", 1.0, 900),
    "mem-05": ("Minimal romantic flat vector illustration, square composition. A cozy picnic blanket at night seen from a slight angle: tiny warm fairy lights strung low, two mugs, a small cake with one candle, a few polaroid photos scattered. Deep midnight navy background with soft violet glow and a few stars. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm gold #F7D08A, soft pink. Soft gradients, dreamy, intimate, cozy, negative space, no text, no watermark, no borders.", 1.0, 900),
    "env-happy": ("Minimal romantic flat vector illustration, square composition. A joyful night scene: a couple silhouette dancing and laughing under glowing paper lanterns and soft light bokeh, seen from behind at a distance. Deep midnight navy sky, warm pink and gold glow, tiny stars. Colors: midnight navy #0B0A1F, soft pink #F7A8B8, warm gold #F7D08A, violet #2B1B4D. Soft gradients, celebratory yet calm, dreamy, negative space, no text, no watermark, no borders.", 1.0, 900),
    "env-miss": ("Minimal romantic flat vector illustration, square composition. A windowsill at night with an open handwritten letter and a warm cup of tea, gentle rain droplets on the window glass, blurred city lights bokeh outside in the deep blue night. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm amber #F7D08A, muted lavender. Soft gradients, longing, tender, quiet, dreamy, negative space, no text, no watermark, no borders.", 1.0, 900),
    "env-hug": ("Minimal romantic flat vector illustration, square composition. A couple silhouette sharing a warm embrace under a soft blanket with tiny warm fairy lights around them at night, seen from the side, gentle golden glow surrounding them like a halo. Deep midnight navy background, a few stars. Colors: midnight navy #0B0A1F, warm gold #F7D08A, soft pink #F7A8B8, violet #2B1B4D. Soft gradients, comforting, safe, tender, dreamy, negative space, no text, no watermark, no borders.", 1.0, 900),
    "env-smile": ("Minimal romantic flat vector illustration, square composition. A playful couple silhouette sharing one umbrella in light night rain, one of them splashing a puddle, colorful reflections of warm city lights on the wet ground, seen from behind at a distance. Deep midnight navy sky with violet clouds, warm gold and pink reflections. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm gold #F7D08A, soft pink #F7A8B8. Soft gradients, playful, joyful, dreamy, negative space, no text, no watermark, no borders.", 1.0, 900),
    "env-down": ("Minimal romantic flat vector illustration, square composition. A single lighthouse on a calm night shore sending a soft warm beam across the sea, moonlight breaking gently through violet clouds, a tiny warm light glowing steadily in the darkness. Deep midnight navy sky, calm water with soft reflections. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm gold #F7D08A, muted lavender. Soft gradients, reassuring, calm, hopeful, dreamy, lots of negative space, no text, no watermark, no borders.", 1.0, 900),
    "letter-main": ("Minimal romantic flat vector illustration, square composition. A couple silhouette slow dancing on a rooftop terrace at night under a starry sky and crescent moon, a string of soft warm lights above them, distant city bokeh far below, seen from the side at a distance. Colors: midnight navy #0B0A1F, deep violet #2B1B4D, warm gold #F7D08A, soft pink #F7A8B8. Soft gradients, intimate, romantic, dreamy, negative space, no text, no watermark, no borders.", 1.0, 900),
}

def gen_one(name):
    prompt, aspect, width = TASKS[name]
    raw_path = os.path.join(RAW_DIR, name + ".png")
    out_path = os.path.join(OUT_DIR, name + ".jpg")
    if os.path.exists(out_path):
        return f"skip {name} (exists)"
    url = None
    if os.path.exists(raw_path):
        pass
    else:
        r = subprocess.run(
            [sys.executable, os.path.join(SKILL_DIR, "generate-image-seedream.py"), prompt],
            capture_output=True, text=True, encoding="utf-8", timeout=420, cwd=SKILL_DIR,
            env={**os.environ, "PYTHONIOENCODING": "utf-8"},
        )
        out = (r.stdout or "") + (r.stderr or "")
        m = re.search(r'"image_url"\s*:\s*"([^"]+)"', out)
        if m:
            url = m.group(1)
        if not url:
            return f"FAIL {name}: no image_url. output tail: {out[-300:]}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = resp.read()
        with open(raw_path, "wb") as f:
            f.write(data)
    img = Image.open(raw_path).convert("RGB")
    w, h = img.size
    target = aspect
    cur = w / h
    if cur > target:  # too wide -> crop width
        nw = int(h * target)
        x0 = (w - nw) // 2
        img = img.crop((x0, 0, x0 + nw, h))
    elif cur < target:  # too tall -> crop height
        nh = int(w / target)
        y0 = (h - nh) // 2
        img = img.crop((0, y0, w, y0 + nh))
    if img.width > width:
        img = img.resize((width, int(width / target)), Image.LANCZOS)
    img.save(out_path, "JPEG", quality=82, optimize=True, progressive=True)
    kb = os.path.getsize(out_path) // 1024
    return f"OK {name}: {img.width}x{img.height} {kb}KB"

if __name__ == "__main__":
    names = sys.argv[1:]
    results = []
    for n in names:
        try:
            results.append(gen_one(n))
        except Exception as e:
            results.append(f"FAIL {n}: {e}")
    print("\n".join(results), flush=True)
