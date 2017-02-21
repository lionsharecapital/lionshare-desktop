import { ipcMain } from 'electron';
import AutoLaunch from 'auto-launch';

const setup = app => {
  const autoLauncher = new AutoLaunch({
    name: app.getName(),
    isHidden: true,
  });

  ipcMain.on('settingsUpdated', (_event, settings) => {
    autoLauncher
      .isEnabled()
      .then(isEnabled => {
        if (settings.launchOnStartup && !isEnabled) {
          autoLauncher.enable();
        } else if (!settings.launchOnStartup && isEnabled) {
          autoLauncher.disable();
        }
      })
      .catch(() => {});
  });
};

export default setup;
