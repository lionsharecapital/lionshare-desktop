import path from 'path';
import electron from 'electron';
import { ipcMain } from 'electron';

import config from './config';

const app = electron.app;
let tray = null;

const newTray = win => {
  const toggleWin = () => win.isVisible() ? win.hide() : win.show();

  const contextMenu = electron.Menu.buildFromTemplate([
    {
      role: 'quit',
    },
  ]);

  tray = new electron.Tray(path.join(__dirname, '../src/assets/icons/menubarTemplate.png'));
  // Disabling highlight mode makes toggling more reliable ¯\_(ツ)_/¯
  // https://github.com/electron/electron/issues/1825
  tray.setHighlightMode(false);
  tray.setToolTip(`${app.getName()}`);
  tray.on('click', e => {
    // Not sure why right click event doesn't work for me so doing manually
    if (e.ctrlKey) {
      tray.popUpContextMenu(contextMenu);
    } else {
      toggleWin();
    }
  });
  tray.on('right-click', () => tray.popUpContextMenu(contextMenu));
  tray.on('double-click', () => toggleWin());
  return tray;
};

const create = (app, mainWindow) => {
  tray = newTray(mainWindow);

  ipcMain.on('priceUpdate', (_event, change) => {
    if (tray) {
      if (config.get('priceSetting')) {
        tray.setTitle(change);
      } else {
        tray.setTitle('');
      }
    }
  });
}


export {
  create,
};
