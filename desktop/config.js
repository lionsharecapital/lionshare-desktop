
const Config = require('electron-config');

module.exports.config = new Config({
  defaults: {
    zoomFactor: 1,
    lastWindowState: {
      height: 550,
    },
  },
});