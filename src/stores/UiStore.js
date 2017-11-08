import { ipcRenderer } from 'electron';
import { observable, action, autorun } from 'mobx';
import { CURRENCIES } from 'utils/currencies';
import { SORT_TYPES } from 'utils/sortBy';

const UI_STORE_KEY = 'UI_STORE_KEY';
const AVAILABLE_VIEWS = ['prices', 'portfolio', 'settings'];

export default class Ui {
  @observable view = AVAILABLE_VIEWS[0];
  @observable visibleCurrencies = CURRENCIES.map(currency => currency.symbol);
  @observable sortBy = SORT_TYPES.marketCap;
  @observable dockItemVisible = true;
  @observable launchOnStartup = false;

  /* actions */


  /* other */



  constructor() {
    // Rehydrate store from persisted data
    const data = localStorage.getItem(UI_STORE_KEY);
    if (data) this.fromJSON(data);

    // Persist store to localStorage
    autorun(() => {
      localStorage.setItem(UI_STORE_KEY, this.toJSON());

      // Send settings to main process for tray configuration
      // ipcRenderer.send('settingsUpdated', this.toObject());
    });
  }
}
