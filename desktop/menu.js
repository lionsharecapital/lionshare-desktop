import { Menu, shell } from 'electron';
import config from './config';

const createMenu = (app, mainWindow) => {
  const template = [
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
        {
          type: 'separator',
        },
        {
          role: 'toggledevtools',
        },
        {
          type: 'separator',
        },
        {
          role: 'reload',
        },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { shell.openExternal('https://lionshare.capital'); },
        },
        {
          label: 'Donate',
          click() { shell.openExternal('https://lionshare.capital#donate'); },
        },
        {
          label: 'Twitter (@getlionshare)',
          click() { shell.openExternal('https://twitter.com/getlionshare'); },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          label: 'Preferences…',
          accelerator: 'Cmd+,',
          click() { mainWindow.webContents.send('showSettings'); },
        },
        {
          type: 'separator',
        },
        {
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          role: 'hide',
        },
        {
          role: 'hideothers',
        },
        {
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
        },
      ],
    });
    // Window menu.
    template[1].submenu = [
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
      {
        type: 'separator',
      },
      {
        role: 'toggledevtools',
      },
      {
        role: 'reload',
      },
      {
        type: 'separator',
      },
      {
        label: 'Show Profit/Loss in Taskbar',
        type: 'checkbox',
        checked: config.get('priceSetting'),
        click() {
          const setting = !config.get('priceSetting');
          config.set('priceSetting', setting);
          mainWindow.webContents.send('priceSetting', setting);
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Bring All to Front',
        role: 'front',
      },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

export {
  createMenu,
};
