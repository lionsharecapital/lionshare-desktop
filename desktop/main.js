// ./main.js
const {app, BrowserWindow} = require('electron')
const {config} = require('./config');
const path = require('path');
const url = require('url');

let win = null;
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

function createWindow() {
    // enter last window state
  const lastWindowState = config.get('lastWindowState');

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    title: app.getName(),
    show: true,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: 360,
    maxWidth: 360,
    minWidth: 360,
    height: lastWindowState.height,
    minHeight: 450,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    backgroundColor: '#000000',
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  let index = url.format({
    pathname: path.resolve(__dirname, '../build/index.html'),
    protocol: 'file',
    slashes: true,
  })

  // Specify entry point
  win.loadURL(index);

  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools({mode: 'detach'})

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

  return win;
}


app.on('ready', function () {

  createWindow();

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});