# AE64 Pro Tuner - Desktop (Electron)

The same tuner as the web app, wrapped in Electron so it runs as a normal Windows program -
no browser needed, works offline, and connects to the keyboard without the OS device picker.

It is **not a fork**: `build-html.mjs` copies the web app's `../index.html` into `app/` at
build time, changing only the web fonts to the bundled VT323 files. Edit the tuner in the
one `index.html`; both the web build and this desktop build follow.

## What the Electron shell adds (see `main.js`)

- **No device chooser.** It auto-selects the AE64 Pro's control interface, so Connect just
  works. The page's own vetting still runs, so a wrong device is still rejected.
- **Offline.** VT323 is bundled; nothing is fetched from the network.
- **Reconnect.** HID permission is granted for the keyboard's vendor, so the tool reconnects
  by itself after a polling-rate change or a replug, same as the web build.
- **System tray.** The tray icon's tooltip and menu show the active profile. Closing the
  window keeps the app running in the tray (Quit is on the tray menu); clicking the tray
  reopens it.
- **Profile toast.** When the active profile changes - from the on-screen picker or the
  keyboard's own profile key - a small always-on-top, click-through popup shows the new
  profile name, then fades. `preload.js` watches the CONFIG dropdown for this; the page
  itself is unchanged.

Everything else - the protocol, every read and write - is the shared `index.html`, unchanged.

## Build the installer

```sh
cd desktop
npm install
npm run dist
```

The installer lands in `desktop/dist/AE64-Pro-Tuner-Setup-<version>.exe`. It is **not code
signed**, so on first run Windows SmartScreen shows "Windows protected your PC" - click
**More info -> Run anyway**. (Signing needs a paid certificate; not required for the app to work.)

## Run without packaging (development)

```sh
cd desktop
npm install
npm start
```

## Requirements

- Node.js 18+ and npm.
- Windows for the `.exe` target. `npm run dist` on macOS/Linux builds their own installers
  instead (add the matching `mac`/`linux` build targets first).
