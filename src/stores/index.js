import { ipcRenderer } from 'electron';
import UiStore from './UiStore';
import PricesStore from './PricesStore';

const ui = new UiStore();
const prices = new PricesStore();

// Open settings from application menu
ipcRenderer.on('showSettings', () => {
  ui.changeView('settings');
});

export default {
  ui,
  prices,
};
