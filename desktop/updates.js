import { autoUpdater } from 'electron';
import { version } from '../package.json';

const scheduleUpdates = () => {
  autoUpdater.setFeedURL(
    `https://api.lionshare.capital/api/updates?v=${version}&os=darwin`
  );

  autoUpdater.on('error', error => console.error(error));
  autoUpdater.on('update-downloaded', () => {
    console.log('Installing update');
    autoUpdater.quitAndInstall();
  });

  const checkForUpdates = () => {
    if (process.env.CONNECTION === 'offline') {
      return;
    }

    console.log('Check for update');
    autoUpdater.checkForUpdates();
  };

  // Check for updates at startup and once an hour
  setInterval(
    () => {
      checkForUpdates();
    },
    60 * 60 * 1000
  );
  setTimeout(
    () => {
      checkForUpdates();
    },
    10 * 1000
  );
};

export default scheduleUpdates;
