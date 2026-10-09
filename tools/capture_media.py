"""Rebuild each project from its repository and capture fresh portfolio media.

Runs in GitHub Actions (see .github/workflows/capture-media.yml), where the real APIs,
fonts and map data are reachable. For every project it:

  1. clones the repo and builds it (npm for React apps, `python -m analysis.build` for reports)
  2. serves the build locally and opens it in Chromium
  3. saves media/<slug>/cover.webp (1200x750), gallery images and a short screen recording

and writes tools/media-manifest.json with the image sizes and captions for js/projects.js.

    python tools/capture_media.py [slug ...]
"""

import functools
import http.server
import json
import shutil
import subprocess
import sys
import tempfile
import threading
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "media"
WORK = Path(tempfile.gettempdir()) / "portfolio-capture"
OWNER = "Scarface96"
VIEW = {"width": 1200, "height": 750}


# ------------------------------------------------------------------ helpers --
def run(cmd, cwd=None, env=None):
    print("$", cmd, flush=True)
    subprocess.run(cmd, cwd=cwd, shell=True, check=True, env=env)


def build(repo: str, kind: str) -> Path:
    d = WORK / repo
    if not d.exists():
        run(f"git clone -q --depth 1 https://github.com/{OWNER}/{repo}.git {d}")
    if kind == "react":
        run("npm ci --no-audit --no-fund --loglevel=error && CI=false npm run build", cwd=d)
        return d / "build"
    run("python -m analysis.build", cwd=d)
    return d / "site"


class Server:
    def __init__(self, directory: Path):
        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(directory))
        handler.log_message = lambda *a: None
        self.srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
        threading.Thread(target=self.srv.serve_forever, daemon=True).start()
        self.url = f"http://127.0.0.1:{self.srv.server_port}/"

    def close(self):
        self.srv.shutdown()


def save_webp(png: Path, out: Path, max_w: int = 1200, size: tuple | None = None) -> tuple[int, int]:
    im = Image.open(png).convert("RGB")
    if size:
        im = im.resize(size, Image.LANCZOS)
    elif im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "WEBP", quality=82, method=6)
    return im.width, im.height


def settle(page, ms=1200):
    try:
        page.wait_for_load_state("networkidle", timeout=15000)
    except Exception:
        pass
    page.wait_for_timeout(ms)


def shot_section(page, sel: str, png: Path, max_h: int = 1000):
    """Screenshot a page section (heading, text and chart), capped in height."""
    el = page.locator(sel).first
    el.scroll_into_view_if_needed()
    page.wait_for_timeout(700)
    box = el.bounding_box()
    page.screenshot(path=str(png), full_page=True,
                    clip={"x": box["x"] - 16, "y": box["y"] + page.evaluate("scrollY") - 8,
                          "width": box["width"] + 32, "height": min(box["height"] + 16, max_h)})


def record(browser, url: str, out: Path, script, seconds_hint: float = 14):
    """Record a smooth scroll-through and encode it as a small H.264 MP4."""
    vdir = WORK / "video" / out.parent.name
    shutil.rmtree(vdir, ignore_errors=True)
    ctx = browser.new_context(viewport=VIEW, record_video_dir=str(vdir), record_video_size=VIEW)
    page = ctx.new_page()
    page.goto(url)
    settle(page, 1500)
    script(page)
    ctx.close()
    webm = next(vdir.glob("*.webm"))
    run(f'ffmpeg -y -loglevel error -ss 1.2 -i "{webm}" -vf "fps=24,scale=1200:-2" -c:v libx264 -preset slow -crf 33 '
        f'-pix_fmt yuv420p -movflags +faststart -an "{out}"')


def smooth_scroll(page, total_ms=11000, stops=None):
    """Scroll from top to bottom in small steps, pausing at `stops` (CSS selectors)."""
    height = page.evaluate("document.documentElement.scrollHeight - innerHeight")
    targets = []
    for s in stops or []:
        y = page.evaluate(f"(() => {{ const e = document.querySelector('{s}'); return e ? e.getBoundingClientRect().top + scrollY - 40 : null; }})()")
        if y is not None:
            targets.append(min(y, height))
    targets = sorted(set(targets)) + [height]
    pos, per = 0, total_ms / max(1, len(targets))
    for t in targets:
        steps = 30
        for i in range(1, steps + 1):
            page.evaluate(f"scrollTo(0, {pos + (t - pos) * i / steps})")
            page.wait_for_timeout(per * 0.6 / steps)
        page.wait_for_timeout(per * 0.4)
        pos = t


# ----------------------------------------------------------------- projects --
def report(slug, repo, gallery, prepare=None, video_stops=None):
    """A Python-built analysis report. gallery: [(section selector, caption)]"""
    return {"slug": slug, "repo": repo, "kind": "python", "gallery": gallery, "prepare": prepare, "stops": video_stops or [g[0] for g in gallery]}


def churn_prepare(page):
    page.evaluate("""() => { const f = document.getElementById('calc'); f.Geography.value = 'Germany'; f.IsActiveMember.value = '0';
                      f.NumOfProducts.value = '3'; f.Age.value = '52'; f.dispatchEvent(new Event('input')); }""")


def hr_prepare(page):
    page.evaluate("""() => { const f = document.getElementById('seg'); f.elements.o.value = 'Yes'; f.elements.l.value = '1'; f.dispatchEvent(new Event('input')); }""")


def retail_prepare(page):
    try:
        page.wait_for_function("document.getElementById('pg-status').textContent.includes('rows in')", timeout=45000)
    except Exception:
        print("  ! SQL editor did not finish loading", flush=True)


def co2_prepare(page):
    page.wait_for_timeout(2500)  # world map shapes


PROJECTS = [
    report("churn", "Bank-Customer-Churn-Classification",
           [("#s2", "Four models compared on held-out customers"), ("#s5", "In-browser churn-risk calculator"), ("#s6", "Retention budget planner")],
           prepare=churn_prepare),
    report("toy", "Toy-Store-KPI-Report",
           [("#s4", "Product portfolio map: units, margin and profit"), ("#s7", "Average daily revenue by weekday and month"), ("#s8", "Backtested Q4 2023 forecast")]),
    report("b2b", "B2B-Sales-Pipeline-CRM-Dashboard-for-TechSolutions-Inc.",
           [("#s2", "Agent win rates with 95% confidence ranges"), ("#s5", "Open deals vs how long winning deals take"), ("#s7", "Filterable team leaderboard")]),
    report("co2", "Global-CO2-Emissions-Dashboard",
           [("#s2", "Animated map of CO₂ per person"), ("#s4", "Historical responsibility vs population"), ("#s7", "Country explorer")],
           prepare=co2_prepare),
    report("hr", "HR-Analysis-Dashboard",
           [("#s2", "Overtime and seniority"), ("#s3", "Attrition drivers as odds ratios"), ("#s6", "Segment explorer")],
           prepare=hr_prepare),
    report("retail", "sql_retail_sales_p1",
           [("#s2", "The SQL questions beside their live results"), ("#s6", "RFM customer segments"), ("#s8", "Live SQL editor running DuckDB in the browser")],
           prepare=retail_prepare),
    report("restaurant", "Restaurant-Order-Analysis",
           [("#s3", "Busy hours by weekday"), ("#s4", "Menu engineering: Stars, Plowhorses, Puzzles and Dogs"), ("#s8", "What goes with each dish")]),
    report("covid", "covid-project",
           [("#s3", "South Africa's four waves"), ("#s4", "Excess deaths vs reported COVID deaths"), ("#s6", "Vaccination by continent")]),
]


def capture_report(browser, p, url):
    out = MEDIA / p["slug"]
    page = browser.new_page(viewport=VIEW)
    page.goto(url)
    settle(page, 2500)
    if p["prepare"]:
        p["prepare"](page)
        page.wait_for_timeout(800)
    tmp = WORK / "shots"
    tmp.mkdir(parents=True, exist_ok=True)
    page.evaluate("scrollTo(0,0)")
    page.wait_for_timeout(500)
    page.screenshot(path=str(tmp / "cover.png"))
    save_webp(tmp / "cover.png", out / "cover.webp", size=(1200, 750))
    gallery = []
    for i, (sel, cap) in enumerate(p["gallery"], 1):
        png = tmp / f"{p['slug']}-{i}.png"
        shot_section(page, sel, png)
        w, h = save_webp(png, out / f"{i:02d}.webp")
        gallery.append({"src": f"media/{p['slug']}/{i:02d}.webp", "w": w, "h": h, "cap": cap})
    page.close()

    def script(pg):
        if p["prepare"]:
            p["prepare"](pg)
        smooth_scroll(pg, 12000, p["stops"])

    record(browser, url, out / "video.mp4", script)
    return {"slug": p["slug"], "cover": f"media/{p['slug']}/cover.webp", "gallery": gallery, "video": f"media/{p['slug']}/video.mp4"}


# --- React apps: each gets its own capture routine ------------------------
def app_shots(browser, slug, url, steps):
    """steps: list of (callable(page), caption | 'cover' | ('mobile', caption))"""
    out = MEDIA / slug
    tmp = WORK / "shots"
    tmp.mkdir(parents=True, exist_ok=True)
    gallery, n = [], 0
    for fn, cap in steps:
        mobile = isinstance(cap, tuple)
        ctx = browser.new_context(viewport={"width": 390, "height": 844} if mobile else VIEW, device_scale_factor=1.5 if mobile else 1)
        page = ctx.new_page()
        page.on("pageerror", lambda e: print("   page error:", str(e)[:200], "\n", (e.stack or "")[:1500], flush=True))
        page.goto(url)
        settle(page, 1500)
        try:
            fn(page)
        except Exception as e:
            print(f"   step '{cap}' failed: {e}".splitlines()[0], flush=True)
            print("   page text:", page.inner_text("body")[:300].replace("\n", " | "), flush=True)
            page.screenshot(path=str(ROOT / "tools" / f"debug-{slug}-{n}.png"))
            ctx.close()
            raise
        settle(page, 1500)
        png = tmp / f"{slug}-{n}.png"
        page.screenshot(path=str(png))
        if cap == "cover":
            save_webp(png, out / "cover.webp", size=(1200, 750))
        else:
            n += 1
            w, h = save_webp(png, out / f"{n:02d}.webp", max_w=1400)
            gallery.append({"src": f"media/{slug}/{n:02d}.webp", "w": w, "h": h, "cap": cap[1] if mobile else cap})
        ctx.close()
    return gallery


def nothing(page):
    pass


def weather(browser, url):
    def pick_city(name):
        def pick(page):
            for attempt in range(3):  # the forecast API occasionally stalls on CI runners; retry with a fresh load
                page.get_by_role("button", name=name).first.click()
                try:
                    page.wait_for_selector("text=Feels like", timeout=15000)
                    break
                except Exception:
                    if attempt == 2:
                        raise
                    page.reload(); settle(page, 1500)
            page.wait_for_timeout(1200)
        return pick
    pick = pick_city("Cape Town")
    def search(page):
        page.fill("input[type=search]", "Lisbon")
        page.wait_for_selector("#city-results li", timeout=15000)
        page.wait_for_timeout(800)
    steps = [(pick, "cover"), (search, "City search with suggestions"), (pick_city("Tokyo"), "Forecast for Tokyo"), (pick, ("mobile", "Forecast on mobile"))]
    gallery = app_shots(browser, "weather", url, steps)
    def script(pg):
        pg.wait_for_timeout(800)
        pg.type("input[type=search]", "Lisbon", delay=120)
        pg.wait_for_selector("#city-results li", timeout=15000); pg.wait_for_timeout(1200)
        pg.keyboard.press("Enter")
        pg.wait_for_selector("text=Feels like", timeout=20000); pg.wait_for_timeout(2000)
        smooth_scroll(pg, 7000)
    record(browser, url, MEDIA / "weather" / "video.mp4", script)
    return gallery


def movie(browser, url):
    def search(page):
        page.fill("input[type=search]", "dune")
        page.wait_for_selector(".card-open", timeout=20000)
        page.wait_for_timeout(2500)
    def details(page):
        search(page)
        page.locator(".card-open").first.click()
        page.wait_for_timeout(2500)
    def watchlist(page):
        search(page)
        for i in range(3):
            page.locator(".save").nth(i).click()
        page.locator(".tabs button").nth(1).click()
    steps = [(search, "cover"), (search, "Search results with filters"), (details, "Details with ratings from three sources"), (watchlist, "Watchlist with watched tracking")]
    gallery = app_shots(browser, "movie", url, steps)
    def script(pg):
        pg.type("input[type=search]", "dune", delay=120); pg.wait_for_selector(".card-open", timeout=20000); pg.wait_for_timeout(2500)
        pg.locator(".card-open").first.click(); pg.wait_for_timeout(3500)
        pg.keyboard.press("Escape"); pg.wait_for_timeout(500)
        smooth_scroll(pg, 5000)
    record(browser, url, MEDIA / "movie" / "video.mp4", script)
    return gallery


def netflix(browser, url):
    def home(page):
        page.wait_for_timeout(3000)
    def info(page):
        page.wait_for_timeout(2500)
        page.get_by_role("button", name="More info").click()
        page.wait_for_timeout(3000)
    def search(page):
        page.goto(url + "?fresh=1#/search?q=dune"); settle(page, 1500)
        page.wait_for_selector("main img", timeout=20000)
        page.wait_for_timeout(3500)
        print("   netflix search text:", page.inner_text("body")[:160].replace("\n", " | "))
    def signin(page):
        page.goto(url + "?fresh=2#/login"); settle(page, 1500)
        page.wait_for_selector("text=Welcome back", timeout=20000)
        page.wait_for_timeout(3500)
    steps = [(home, "cover"), (home, "Home with trending hero and genre rows"), (info, "Details dialog with trailer, cast and similar films"),
             (search, "Search across the TMDB catalogue"), (signin, "Sign-in page with poster wall")]
    # Diagnostic: does navigating away from Home crash the app?
    ctx = browser.new_context(viewport=VIEW); pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(url); settle(pg, 2500)
    print("   scrollTo returns:", pg.evaluate("String(window.scrollTo(0, 0))"), "| is native:", pg.evaluate("String(window.scrollTo).includes('native code')"), flush=True)
    pg.evaluate("location.hash = '#/login'"); pg.wait_for_timeout(2500)
    print("   home -> login errors:", errs, "| text:", pg.inner_text("body")[:80].replace("\n", " "), flush=True)
    ctx.close()
    gallery = app_shots(browser, "netflix", url, steps)
    def script(pg):
        pg.wait_for_timeout(2500)
        smooth_scroll(pg, 5000)
        pg.evaluate("scrollTo(0,0)"); pg.wait_for_timeout(600)
        pg.get_by_role("button", name="More info").click(); pg.wait_for_timeout(4000)
    record(browser, url, MEDIA / "netflix" / "video.mp4", script)
    return gallery


def bmi(browser, url):
    def metric(page):
        page.fill("input[placeholder='70']", "82"); page.fill("input[placeholder='175']", "178")
        page.click("button[type=submit]"); page.wait_for_timeout(1200)
    def imperial(page):
        page.locator("button[role=radio]").nth(1).click()
        page.fill("input[placeholder='154']", "120"); page.fill("input[placeholder='5']", "5"); page.fill("input[placeholder='9']", "10")
        page.click("button[type=submit]"); page.wait_for_timeout(1200)
        metric_again = None  # noqa: F841
    steps = [(metric, "cover"), (metric, "Result on the measuring-tape scale"), (imperial, ("mobile", "Imperial units and reading history on mobile"))]
    gallery = app_shots(browser, "bmi", url, steps)
    def script(pg):
        pg.type("input[placeholder='70']", "82", delay=150); pg.type("input[placeholder='175']", "178", delay=150)
        pg.click("button[type=submit]"); pg.wait_for_timeout(2500)
        pg.fill("input[placeholder='70']", "58"); pg.click("button[type=submit]"); pg.wait_for_timeout(2500)
    record(browser, url, MEDIA / "bmi" / "video.mp4", script)
    return gallery


APPS = {
    "weather": ("weather-react-app", weather),
    "movie": ("movie-app", movie),
    "netflix": ("netflix-clone", netflix),
    "bmi": ("bmi-calculator", bmi),
}


def main(only):
    WORK.mkdir(parents=True, exist_ok=True)
    manifest_path = ROOT / "tools" / "media-manifest.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    failures = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for p in PROJECTS:
            if only and p["slug"] not in only:
                continue
            try:
                srv = Server(build(p["repo"], "python"))
                manifest[p["slug"]] = capture_report(browser, p, srv.url)
                srv.close()
            except Exception as e:  # keep going so one broken project doesn't block the rest
                print(f"!! {p['slug']} failed: {e}", flush=True)
                failures.append(p["slug"])
        for slug, (repo, fn) in APPS.items():
            if only and slug not in only:
                continue
            try:
                srv = Server(build(repo, "react"))
                manifest[slug] = {"slug": slug, "cover": f"media/{slug}/cover.webp", "gallery": fn(browser, srv.url), "video": f"media/{slug}/video.mp4"}
                srv.close()
            except Exception as e:
                print(f"!! {slug} failed: {e}", flush=True)
                failures.append(slug)
        browser.close()
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    print("Failures:", failures or "none")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(set(sys.argv[1:])))
