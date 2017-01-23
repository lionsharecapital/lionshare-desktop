import _ from 'lodash';
import numeral from 'numeral';
import { observable, computed, action, autorun } from 'mobx';
import ReconnectingWebsocket from 'reconnecting-websocket';

import { currencyColors } from 'utils/currencies';

const PRICES_STORE_KEY = 'PRICES_STORE_KEY';

export default class PricesStore {
  @observable rateData = {};
  @observable marketData = {};
  @observable period = 'day';
  @observable isLoaded = false;
  @observable error = null;

  /* computed */

  @computed get rates() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.rateData, (value, key) => {
        data[key] = value.slice(-1)[0];
      });
    }
    return data;
  }

  @computed get changes() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.rateData, (value, key) => {
        const change = (value.slice(-1)[0] - value[0]) / value[0];
        data[key] = change;
      });
    }
    return data;
  }

  @computed get priceListData() {
    let data;
    if (this.isLoaded) {
      data = [];
      _.map(this.rateData, (value, key) => {
        const color = currencyColors[key];
        const labels = [];
        const historic = [];
        for (const rate of value) {
          historic.push(parseFloat(rate));
          labels.push('');
        }

        data.push({
          color,
          symbol: key,
          price: this.rates[key],
          change: this.changes[key] * 100,
          chartData: {
            labels,
            datasets: [{
              radius: 0,
              borderColor: color,
              data: historic,
            }],
          },
          highestPrice: this.highestPrice(key),
          lowestPrice: this.lowestPrice(key),
          marketCap: this.marketCap(key),
        });
      });
    }

    return data;
  }

  /* actions */

  @action fetchData = async () => {
    try {
      const rateRes = await fetch(`${API_URL}/api/prices?period=${ this.period }`);
      const rateData = await rateRes.json();
      this.rateData = rateData.data;

      const marketRes = await fetch(`${API_URL}/api/markets`);
      const marketData = await marketRes.json();
      this.marketData = marketData.data;

      this.isLoaded = true;
      this.error = null;
    } catch (_e) {
      if (!this.isLoaded) {
        // Only show the error if the first load fails
        this.error = 'Error loading content, please check your connection and try again.';
      }
      setTimeout(() => {
        this.fetchData();
      }, 2000);
    }
  }

  @action updatePrice = (message) => {
    const data = JSON.parse(message.data);
    const cryptoCurrency = data.cryptoCurrency;
    const price = parseFloat(data.price);
    if (this.isLoaded) {
      const index = this.rateData[cryptoCurrency].length - 1;
      this.rateData[cryptoCurrency][index] = price;
    }
  }

  @action connectToWebsocket = () => {
    this.websocket = new ReconnectingWebsocket(WS_URL, [], {});
    this.websocket.addEventListener('message', this.updatePrice);
  }

  @action selectPeriod = (period) => {
    this.period = period;
    this.fetchData();
  }

  @action fromJSON = (jsonData) => {
    const parsed = JSON.parse(jsonData);
    this.rateData = parsed.rateData;
    this.marketData = parsed.marketData;
    if (parsed.period) this.period = parsed.period;
    this.isLoaded = true;
  }

  /* other */

  toJSON = () => (
    JSON.stringify({
      rateData: this.rateData,
      marketData: this.marketData,
      period: this.period,
    })
  )

  highestPrice = (currency) => {
    let highestPrice = 0.0;
    if (this.isLoaded) {
      highestPrice = Math.max(...this.rateData[currency]);
    }
    return highestPrice;
  }

  lowestPrice = (currency) => {
    const lowestPrice = 0.0;
    if (this.isLoaded) {
      return Math.min(...this.rateData[currency]);
    }
    return lowestPrice;
  }

  marketCap = (currency) => {
    const marketCap = 0.0;
    if (this.isLoaded) {
      return numeral(this.marketData[currency]).format('0.0a');
    }
    return marketCap;
  }

  convert = (amount, currency) => {
    return amount * this.rates[currency];
  }

  change = (amount, currency) => {
    return this.convert(amount, currency) * this.changes[currency];
  }

  constructor() {
    // Rehydrate store from persisted data
    const data = localStorage.getItem(PRICES_STORE_KEY);
    if (data) this.fromJSON(data);

    // Persist store to localStorage
    autorun(() => {
      localStorage.setItem(PRICES_STORE_KEY, this.toJSON());
    });

    this.fetchData();
    this.connectToWebsocket();

    // Update price data once every hour,
    // because we use 12 buckets for 24hrs and update
    // them from the websocket messages, there is no need
    // to update more frequently than this.
    const interval = 60 * 60 * 1000;
    setInterval(() => {
      this.fetchData();
    }, interval);
  }
}
