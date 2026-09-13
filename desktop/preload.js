// Runs in the tuner page but stays out of it: the page is the shared web app, untouched.
// The active profile is already mirrored in the CONFIG dropdown (#configSelect) - its value
// tracks the keyboard's active config however it changes: the on-screen picker, or the
// keyboard's own profile key (which the page detects and re-renders). So we just watch that
// dropdown and tell the main process the current profile name; main owns the tray + popup.
const { ipcRenderer } = require('electron');

function currentProfile() {
  const sel = document.getElementById('configSelect');
  if (!sel || sel.disabled) return null;                 // disconnected -> the picker shows '--', disabled
  const opt = sel.selectedOptions && sel.selectedOptions[0];
  const t = opt ? opt.textContent.trim() : '';
  return (!t || t === '--') ? null : t;
}

let last;   // undefined before the first read; then null (disconnected) or a profile name
function report() {
  const p = currentProfile();
  if (p === last) return;
  const prev = last;
  last = p;
  // "changed" only for a real switch between two profiles - not the first read on connect
  // (null/undefined -> name) and not a disconnect (name -> null). Those update the tray but
  // don't pop a toast.
  const changed = typeof prev === 'string' && prev !== null && p !== null;
  ipcRenderer.send('ae64:profile', { profile: p, changed });
}

function start() {
  const sel = document.getElementById('configSelect');
  if (!sel) { setTimeout(start, 200); return; }   // the page builds the picker on load
  // childList/characterData: renderConfigPicker() rebuilds the <option>s on every config
  // change; attributes: a plain value change flips the selected option.
  new MutationObserver(report).observe(sel, { childList: true, subtree: true, attributes: true, characterData: true });
  sel.addEventListener('change', () => setTimeout(report, 30));
  report();
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', start);
else start();
