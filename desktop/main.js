// Electron shell around the exact same tuner UI (app/index.html, generated from ../index.html).
// Its whole job: give the page WebHID with no OS device chooser, and run offline. All the
// keyboard logic lives in the page - this file adds nothing to the protocol.
const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');

// The same vendor ids the web app filters on (index.html HID_VENDORS). A USB vendor id is
// per-manufacturer, so this never locks anyone out of their own board; the page's own
// pickControlDevice() still vets whatever is handed back.
const HID_VENDORS = [0x1ca6, 0x38a6, 0x1a86, 0x391d, 0x371c, 0x3806, 0x31e3];
const isOurs = d => d && HID_VENDORS.includes(d.vendorId);
// The keyboard exposes several HID interfaces; only the control one has an output report.
// The media interface (usagePage 12) has none, so preferring an output report picks right.
const hasOutput = d => Array.isArray(d.collections) && d.collections.some(c => (c.outputReports || []).length);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 940,
    minHeight: 600,
    backgroundColor: '#12352B',
    title: 'AE64 Pro Tuner',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: { contextIsolation: true, nodeIntegration: false },
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  // Any target=_blank / external link opens in the real browser, never a second Electron window.
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  return win;
}

app.whenReady().then(() => {
  const ses = session.defaultSession;

  // No OS chooser: pick the AE64 Pro's control interface ourselves. requestDevice() in
  // Electron resolves with the single device selected here, so it must be the control one.
  ses.on('select-hid-device', (event, details, callback) => {
    event.preventDefault();
    const list = details.deviceList || [];
    const pick = list.find(d => isOurs(d) && hasOutput(d))
      || list.find(d => isOurs(d))
      || list.find(hasOutput)
      || list[0];
    callback(pick ? pick.deviceId : null);
  });

  // Grant HID for our keyboard so navigator.hid.getDevices() returns it with no prompt -
  // that is the path the page uses to reconnect after a polling-rate change and on relaunch.
  ses.setDevicePermissionHandler(details => isOurs(details.device));
  ses.setPermissionCheckHandler((wc, permission) => permission === 'hid');
  ses.setPermissionRequestHandler((wc, permission, cb) => cb(permission === 'hid'));

  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
