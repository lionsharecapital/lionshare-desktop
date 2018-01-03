import { Menu, shell } from 'electron';
import config from './config';

const createMenu = (app, mainWindow) => {
  const template = [
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Prices',
          accelerator: 'CmdOrCtrl+1',
          click() {
            mainWindow.webContents.send('showPrices');
          },
        },
        {
          label: 'Portfolio',
          accelerator: 'CmdOrCtrl+2',
          click() {
            mainWindow.webContents.send('showPortfolio');
          },
        },
        { type: 'separator' },
        {
          label: 'Toggle Profit/Loss in Taskbar',
          type: 'checkbox',
          checked: config.get('priceSetting'),
          click() {
            const setting = !config.get('priceSetting');
            config.set('priceSetting', setting);
            mainWindow.webContents.send('priceSetting', setting);
          },
        },
        { type: 'separator' },
        {
          label: 'Developer',
          submenu: [
            {
              role: 'toggledevtools',
            },
          ],
        },
      ],
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        { type: 'separator' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'reload' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://lionshare.capital');
          },
        },
        {
          label: 'Donate',
          click() {
            shell.openExternal('https://lionshare.capital#donate');
          },
        },
        {
          label: 'Twitter (@getlionshare)',
          click() {
            shell.openExternal('https://twitter.com/getlionshare');
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Preferences…',
          accelerator: 'Cmd+,',
          click() {
            mainWindow.webContents.send('showSettings');
          },
        },
        { type: 'separator' },
        {
          role: 'services',
          submenu: [],
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
    // Window menu.
    template[3].submenu = [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      { type: 'separator' },
      { role: 'reload' },

      { type: 'separator' },
      {
        label: 'Bring All to Front',
        role: 'front',
      },
    ];
  } else {
    // linux/windows
    template.unshift({
      label: 'File',
      submenu: [
        {
          label: 'Preferences…',
          accelerator: 'CmdOrCtrl+,',
          click() {
            mainWindow.webContents.send('showSettings');
          },
        },
        { type: 'separator' },
        { role: 'close' },
        { role: 'quit' },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

export { createMenu };
