import { ipcRenderer } from 'electron';
import UiStore from './UiStore';
import PricesStore from './PricesStore';

const ui = new UiStore();
const prices = new PricesStore();

// Open views from application menu (/desktop/menu.js)
ipcRenderer.on('showSettings', () => ui.changeView('settings'));
ipcRenderer.on('showPrices', () => ui.changeView('prices'));
ipcRenderer.on('showPortfolio', () => ui.changeView('portfolio'));

export default {
  ui,
  prices,
};
