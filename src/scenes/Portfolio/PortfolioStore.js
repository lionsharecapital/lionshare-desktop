import { observable, computed, action, asMap, autorun } from 'mobx';
import { ipcRenderer } from 'electron';
import EventEmitter from 'events';

import { formatNumber } from 'utils/formatting';

const PORTFOLIO_KEY = 'PORTFOLIO_KEY';

class PortfolioStore {
  @observable balances = asMap({});
  @observable changes = asMap({});
  @observable editMode = 'crypto';
  @observable rawEditedBalances = asMap({}); // Temporary when user enters edit mode

  @observable isEditing = false;
  @observable hideOnboarding = false;

  /* computed */

  @computed get editedBalances() {
    const balances = {};
    this.rawEditedBalances.forEach((amount, currency) => {
      balances[currency] = parseFloat(amount);
    });

    return asMap(balances);
  }

  @computed get isLoaded() {
    return this.prices.isLoaded;
  }

  @computed get activeBalances() {
    return this.isEditing ? this.editedBalances : this.balances;
  }

  @computed get totalBalance() {
    let value = 0.0;

    if (this.editMode === 'crypto') {
      // When editing in crypto, or exited edit more
      this.activeBalances.forEach((amount, currency) => {
        value += this.prices.convert(amount, currency);
      });
    } else {
      // When editing in USD - and we can just sum up all
      this.activeBalances.forEach((amount, _currency) => {
        value += amount;
      });
    }

    return value;
  }

  @computed get totalChange() {
    let value = 0.0;
    this.balances.forEach((amount, currency) => {
      value += this.prices.change(amount, currency);
    });
    return value;
  }

  @computed get assetListData() {
    const currencies = this.balances.keys();
    return currencies.map(currency => {
      const balance = this.balances.get(currency);
      const nativeBalance = this.prices.convert(balance, currency);
      const change = this.prices.change(balance, currency);

      return {
        ...this.prices.assetData[currency], // Generic currency data (name, symbol, color)
        balance,
        nativeBalance,
        change,
      };
    });
  }

  @computed get userDataReady() {
    return this.balances.keys().length > 0;
  }

  @computed get allowSave() {
    return this.editedBalances.keys().length > 0 && this.totalBalance > 0.0;
  }

  @computed get doughnutData() {
    const data = {
      datasets: [
        {
          borderWidth: 0,
          data: [0.01],
          backgroundColor: ['rgba(255, 255, 255, 0.20)'],
          hoverBackgroundColor: ['rgba(255, 255, 255, 0.20)'],
        },
      ],
    };
    if (this.userDataReady || this.isEditing) {
      this.activeBalances.forEach((amount, currency) => {
        data.datasets[0].data.push(this.prices.convert(amount, currency));
        data.datasets[0].backgroundColor.push(
          this.prices.assetData[currency].color
        );
        data.datasets[0].hoverBackgroundColor.push(
          this.prices.assetData[currency].color
        );
      });
    }
    return data;
  }

  @computed get fiatCurrency() {
    return 'USD';
  }

  @computed get showEditCancel() {
    return this.userDataReady;
  }

  @computed get showOnboarding() {
    return this.totalBalance <= 0.0 && !this.hideOnboarding;
  }

  /* actions */

  @action toggleEdit = () => {
    this.isEditing = !this.isEditing;
    this.rawEditedBalances.clear();
    this.editMode = 'crypto';
    if (this.isEditing) {
      this.rawEditedBalances.merge(this.balances);
    }
  };

  @action toggleEditMode = () => {
    if (this.editMode === 'crypto') {
      this.editMode = 'fiat';
      this.editedBalances.forEach((amount, currency) => {
        this.rawEditedBalances.set(
          currency,
          this.prices.convert(amount, currency)
        );
      });
    } else {
      this.editMode = 'crypto';
      this.editedBalances.forEach((amount, currency) => {
        this.rawEditedBalances.set(
          currency,
          amount / this.prices.convert(1.00, currency)
        );
      });
    }
  };

  @action updateBalance = event => {
    const { name, value } = event.target;
    if (value) {
      this.rawEditedBalances.set(name, value);
    } else {
      this.rawEditedBalances.delete(name);
    }
  };

  @action saveEdit = () => {
    if (this.editMode === 'fiat') this.toggleEditMode();

    // Clean empty values
    this.editedBalances.keys().forEach(currency => {
      if (this.editedBalances.get(currency) <= 0.0)
        this.rawEditedBalances.delete(currency);
    });

    this.balances.clear();
    this.balances.merge(this.editedBalances);
    // Persist store to localStorage
    localStorage.setItem(PORTFOLIO_KEY, this.toJSON());
    this.toggleEdit();
  };

  @action toggleOnboarding = () => {
    this.hideOnboarding = true;
  };

  @action fromJSON = jsonData => {
    const parsed = JSON.parse(jsonData);
    if (parsed.balances) {
      // Only set balances that are also visible, disregard others
      const balances = {};
      asMap(parsed.balances).forEach((amount, currency) => {
        if (this.ui.visibleCurrencies.includes(currency)) {
          balances[currency] = amount;
        }
      });
      this.balances.merge(balances);

      // Don't show balance again if the user has already set values
      if (this.totalBalance > 0) this.hideOnboarding = true;
    }
  };

  /* other */

  toJSON = () => JSON.stringify({
    balances: this.balances,
  });

  constructor(options) {
    // General store references
    this.prices = options.prices;
    this.ui = options.ui;

    // Rehydrate store from persisted data
    const data = localStorage.getItem(PORTFOLIO_KEY);
    if (data) {
      this.fromJSON(data);
    }

    // If user doens't have assets defined,
    // enter edit mode until they do
    if (!this.userDataReady) {
      this.isEditing = true;
    }

    if (EventEmitter.listenerCount(ipcRenderer, 'priceSetting') === 0) {
      ipcRenderer.on('priceSetting', (_event, setting) => {
        if (setting) {
          ipcRenderer.send(
            'priceUpdate',
            formatNumber(this.totalChange, 'USD', {
              directionSymbol: true,
              minPrecision: true,
            })
          );
        } else {
          ipcRenderer.send('priceUpdate', '');
        }
      });
    }

    autorun(() => {
      // Taskbar change updates
      const trayChange = formatNumber(this.totalChange, 'USD', {
        directionSymbol: true,
        minPrecision: true,
      });
      ipcRenderer.send('priceUpdate', trayChange);
    });
  }
}

export default PortfolioStore;
