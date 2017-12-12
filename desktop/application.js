import electron from 'electron';
import path from 'path';
import url from 'url';
import isDev from 'electron-is-dev';
import ua from 'universal-analytics';
import { machineId } from 'electron-machine-id';
import { ipcMain } from 'electron';

import scheduleUpdates from './updates';
import { create as createTray } from './tray';
import { createMenu } from './menu';
import config from './config';
import setupAutoLaunch from './autoLaunch';

const app = electron.app;

let mainWindow;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (isAlreadyRunning) {
  app.quit();
}

const createMainWindow = () => {
  const lastWindowState = config.get('lastWindowState');

  const win = new electron.BrowserWindow({
    title: app.getName(),
    show: false,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: 360,
    maxWidth: 360,
    minWidth: 360,
    height: lastWindowState.height,
    minHeight: 450,
    maximizable: false,
    fullscreenable: false,
    // Only go frameless on macOS
    frame: process.platform !== 'darwin',
    titleBarStyle: 'hidden-inset', // darwin only
    autoHideMenuBar: true,
    backgroundColor: '#000000',
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  const index = url.format({
    pathname: path.join(__dirname, 'window.html'),
    protocol: 'file:',
    slashes: true,
  });
  win.loadURL(index);

  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        win.hide();
      }
    }
  });

  win.on('page-title-updated', e => {
    e.preventDefault();
  });

  return win;
};

app.on('ready', () => {
  mainWindow = createMainWindow();
  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  if (!isDev) scheduleUpdates();
  createMenu(app, mainWindow);
  createTray(app, mainWindow);
  setupAutoLaunch(app, mainWindow);

  const page = mainWindow.webContents;

  ipcMain.on('settingsUpdated', (_event, settings) => {
    // app.dock is macOS only
    if ((process.platform !== 'darwin') || (app.dock === undefined)) {
      return;
    }
    if (settings.dockItemVisible) {
      if (!app.dock.isVisible()) {
        app.dock.show();
      }
    } else if (app.dock.isVisible()) {
      app.dock.hide();
    }
  });

  page.on('dom-ready', () => {
    mainWindow.show();
  });

  app.on('activate', () => {
    mainWindow.show();
  });
});

app.on('before-quit', () => {
  isQuitting = true;
  config.set('lastWindowState', mainWindow.getBounds());
});

// UA for GA
const trackUser = async () => {
  const id = await machineId();
  const user = ua('UA-90111350-1', id, { strictCidFormat: false, https: true });
  user.pageview('/').send();
  setInterval(
    () => {
      user.pageview('/').send();
    },
    60000 * 5
  );
};
if (!isDev) trackUser();
