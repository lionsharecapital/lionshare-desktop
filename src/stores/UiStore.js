import { observable, action, autorun } from 'mobx';
import { CURRENCIES } from 'utils/currencies';

const UI_STORE_KEY = 'UI_STORE_KEY';
const AVAILABLE_VIEWS = [
  'prices',
  'portfolio',
  'settings',
];

export default class Ui {
  @observable view = AVAILABLE_VIEWS[0];
  @observable visibleCurrencies = CURRENCIES.map(currency => currency.symbol);

  /* actions */

  @action changeView(view) {
    if (AVAILABLE_VIEWS.includes(view)) {
      this.view = view;
    }
  }

  @action toggleCurrency = (currency) => {
    if (this.visibleCurrencies.includes(currency)) {
      this.visibleCurrencies.remove(currency);
    } else {
      this.visibleCurrencies.push(currency);
    }
  }

  @action toggleCurrenciesAll = () => {
    this.toggleCurrenciesNone(); // Clear first
    CURRENCIES.forEach(currency => this.visibleCurrencies.push(currency.symbol));
  }

  @action toggleCurrenciesNone = () => {
    this.visibleCurrencies = [];
  }

  @action fromJSON = (jsonData) => {
    const parsed = JSON.parse(jsonData);
    this.view = parsed.view;
    this.visibleCurrencies.replace(parsed.visibleCurrencies);
  }

  /* other */

  toJSON = () => (
    JSON.stringify({
      view: this.view,
      visibleCurrencies: this.visibleCurrencies,
    })
  )

  constructor() {
    // Rehydrate store from persisted data
    const data = localStorage.getItem(UI_STORE_KEY);
    if (data) this.fromJSON(data);

    // Persist store to localStorage
    autorun(() => {
      localStorage.setItem(UI_STORE_KEY, this.toJSON());
    });
  }
}
