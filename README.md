# AE64 Pro Tuner

A standalone, single-file WebHID tool for configuring an **AE64 Pro** Hall-effect
keyboard (Sparklink / StarFlash "星闪悦动", `vid=0x1ca6 pid=0x300a`) from the browser,
without depending on the vendor's website.

Everything lives in one file: `index.html`. No build step, no dependencies,
no framework — vanilla JS and the WebHID API.

> **Tiếng Việt:** [README.vi.md](README.vi.md) · [Hướng dẫn chi tiết cho người mới](HUONG-DAN.md)

## What it does

- **Virtual keyboard picker** — click keys to select them, click again to deselect.
  Presets for WASD / Select all / Invert / Clear.
- **Rapid Trigger** — a toggle per key selection. Off, you set one actuation point;
  on, you also get press and release sensitivity. Keys in RT mode show an `RT` tag
  on the keycap.
- **Dead zones** — top and bottom travel the keyboard ignores.
- **Configs** — the keyboard stores 4 independent configs; switch between them and
  every setting follows.
- **Travel test** — proves a key really fires where you configured it. Reads the
  firmware's own actuation state alongside live travel, catches the switching edges and
  compares them against your settings. Each press narrows the reading, so it converges
  to roughly 0.01mm.
- **Calibration** — has the firmware relearn each switch's top and bottom, showing which
  keys you have already pressed.
- **Polling rate** — 125 Hz to 8000 Hz.
- **Per-key RGB** — lights each key by its mode (white = normal, red = Rapid Trigger).
- **Travel gauge** — a live meter drawn from the key's real measured travel, read from
  the device, not assumed.
- **Raw HID log** — every packet in and out, so you can see exactly what was sent.

Changes save the moment you make them; there is no Save button.

### The dead-zone trap

**The top dead zone swallows any trigger point shallower than itself.** With a 0.35mm
dead zone and Rapid Trigger first-touch set to 0.10mm, the key fires at **0.35mm**, not
0.10mm — silently, with nothing to tell you. The effective trigger depth is
`max(your setting, top dead zone)`.

Lower the dead zone below your trigger point to actually get it. Travel test detects
this and says so outright.

## Running it

**<https://punssama.github.io/AE64_PRO_WEB_DRIVER_CLONE/>** — open it and click
**Connect keyboard**. Nothing to clone, nothing to install, and it is always the
current build, because the page is served straight from `main`.

WebHID is only available in a **secure context**, which is why a hosted page exists at
all: `https://` and `localhost` qualify, `file://` does not. Double-clicking the HTML
file leaves `navigator.hid` undefined and the Connect button dead.

To run your own copy - offline, or with local edits - serve it over localhost:

```sh
git clone https://github.com/Punssama/AE64_PRO_WEB_DRIVER_CLONE.git
cd AE64_PRO_WEB_DRIVER_CLONE
python -m http.server 8787
```

Then open <http://localhost:8787/>. Any static server works; `python -m http.server`
just happens to need no install. Add `?selftest` to the URL to run the device-filter
assertions in the console.

**Browser support:** WebHID ships in Chrome, Edge and other Chromium browsers.
Firefox and Safari do not implement it.

## Safety

This writes to your keyboard's firmware settings. A few things the tool does to avoid
damaging them, worth knowing if you fork it:

- Each key's **axis calibration** (`axisRangeMax`, `axisCoefficient`, …) is re-read
  before every write and passed through unchanged. Zeroing those fields wipes that
  key's factory calibration.
- The form is filled from the device on selection. A write sends *all* performance
  fields at once, so a stale value left on screen would silently overwrite a real one.
- Every write is **read back and compared**. The firmware ignores values it rejects
  without reporting an error, so an unverified write can look like a success.
- Empty inputs are refused rather than encoded as `0.00mm`.

With several keys selected, editing any control writes to all of them.

## How this was made

The protocol was reverse-engineered from the vendor's own web app by reading its
compiled JavaScript bundle and observing HID traffic against a device I own. Command
opcodes were taken from that source, not guessed.

The vendor's bundle is **not** included in this repository — it is their copyrighted
code. `.gitignore` excludes it.

## Disclaimer

Not affiliated with, endorsed by, or supported by the manufacturer or xsyd.top.
Use at your own risk.
