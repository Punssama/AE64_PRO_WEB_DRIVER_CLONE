// Electron shell around the exact same tuner UI (app/index.html, generated from ../index.html).
// It gives the page WebHID with no OS device chooser, runs offline, and adds a system tray
// that shows the active profile plus a small toast when the profile changes. All the keyboard
// logic still lives in the page - this file adds nothing to the protocol.
const { app, BrowserWindow, Tray, Menu, session, shell, ipcMain, screen } = require('electron');
const path = require('path');

// The same vendor ids the web app filters on (index.html HID_VENDORS). A USB vendor id is
// per-manufacturer, so this never locks anyone out of their own board; the page's own
// pickControlDevice() still vets whatever is handed back.
const HID_VENDORS = [0x1ca6, 0x38a6, 0x1a86, 0x391d, 0x371c, 0x3806, 0x31e3];
const isOurs = d => d && HID_VENDORS.includes(d.vendorId);
// The keyboard exposes several HID interfaces; only the control one has an output report.
const hasOutput = d => Array.isArray(d.collections) && d.collections.some(c => (c.outputReports || []).length);

const ICON = path.join(__dirname, 'assets', 'icon.ico');

let win = null, tray = null, popup = null, popupTimer = null;
let currentProfile = null, trayTip = '', hintShown = false;
app.isQuitting = false;

// Small hook for the automated test to read state; harmless in production.
global.__ae64 = { state: () => ({ profile: currentProfile, trayTip, popupVisible: !!(popup && !popup.isDestroyed() && popup.isVisible()) }) };

// One instance only: two would fight over the same HID device.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) { win.show(); win.focus(); } });
  app.whenReady().then(init);
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 940, minHeight: 600,
    backgroundColor: '#12352B', title: 'AE64 Pro Tuner', autoHideMenuBar: true, icon: ICON,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  // Closing the window keeps the app in the tray (that is the whole point of the tray -
  // to show the profile while it runs in the background). Quit is on the tray menu.
  win.on('close', e => {
    if (app.isQuitting) return;
    e.preventDefault();
    win.hide();
    if (!hintShown) { hintShown = true; showToast('Still running in the tray', 'AE64 PRO TUNER'); }
  });
}

function createPopup() {
  popup = new BrowserWindow({
    width: 250, height: 96, show: false, frame: false, transparent: true, resizable: false,
    movable: false, minimizable: false, maximizable: false, skipTaskbar: true, focusable: false,
    hasShadow: false, alwaysOnTop: true,
    webPreferences: { contextIsolation: true },
  });
  popup.setAlwaysOnTop(true, 'screen-saver');   // above fullscreen games
  popup.setIgnoreMouseEvents(true);             // clicks pass straight through
  popup.loadFile(path.join(__dirname, 'assets', 'popup.html'));
}

function showToast(big, label) {
  if (!popup || popup.isDestroyed()) return;
  const { workArea } = screen.getPrimaryDisplay();
  const [w, h] = popup.getSize();
  popup.setPosition(Math.round(workArea.x + workArea.width - w - 16), Math.round(workArea.y + workArea.height - h - 16));
  popup.webContents.executeJavaScript(`window.setMessage(${JSON.stringify(big)}, ${JSON.stringify(label || 'PROFILE')})`).catch(() => {});
  popup.showInactive();   // visible but never takes focus
  clearTimeout(popupTimer);
  popupTimer = setTimeout(() => { if (popup && !popup.isDestroyed()) popup.hide(); }, 1700);
}

function updateTray() {
  if (!tray) return;
  trayTip = 'AE64 Pro Tuner' + (currentProfile ? ' — Profile: ' + currentProfile : ' — not connected');
  tray.setToolTip(trayTip);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: currentProfile ? 'Profile: ' + currentProfile : 'Not connected', enabled: false },
    { type: 'separator' },
    { label: 'Show window', click: showWindow },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } },
  ]));
}

function showWindow() { if (win) { win.show(); win.focus(); } }

function init() {
  const ses = session.defaultSession;

  // No OS chooser: pick the AE64 Pro's control interface ourselves.
  ses.on('select-hid-device', (event, details, callback) => {
    event.preventDefault();
    const list = details.deviceList || [];
    const pick = list.find(d => isOurs(d) && hasOutput(d)) || list.find(d => isOurs(d)) || list.find(hasOutput) || list[0];
    callback(pick ? pick.deviceId : null);
  });
  ses.setDevicePermissionHandler(details => isOurs(details.device));
  ses.setPermissionCheckHandler((wc, permission) => permission === 'hid');
  ses.setPermissionRequestHandler((wc, permission, cb) => cb(permission === 'hid'));

  // The page (via preload.js) tells us the active profile whenever it changes.
  ipcMain.on('ae64:profile', (e, msg) => {
    currentProfile = msg && msg.profile;
    updateTray();
    if (msg && msg.changed && msg.profile) showToast(msg.profile, 'PROFILE');
  });

  createWindow();
  createPopup();

  tray = new Tray(ICON);
  updateTray();
  tray.on('click', showWindow);
  tray.on('double-click', showWindow);

  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
}

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => { app.isQuitting = true; });
