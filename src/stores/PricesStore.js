import _ from 'lodash';
import { observable, computed, action, autorun } from 'mobx';
import ReconnectingWebsocket from 'reconnecting-websocket';

const PRICES_STORE_KEY = 'PRICES_STORE_KEY';

export default class PricesStore {
  @observable assetData = {};
  @observable period = 'day';
  @observable isLoaded = false;
  @observable error = null;

  /* computed */

  @computed get rates() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.assetData, (value, key) => {
        data[key] = value['price'].slice(-1)[0];
      });
    }
    return data;
  }

  @computed get changes() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.assetData, (value, key) => {
        const price = value['price'];
        const change = (price.slice(-1)[0] - price[0]) / price[0];
        data[key] = change;
      });
    }
    return data;
  }

  @computed get priceListData() {
    let data;
    if (this.isLoaded) {
      data = [];
      _.map(this.assetData, (asset, key) => {
        const labels = [];
        const historic = [];
        asset['price'].forEach(rate => {
          historic.push(parseFloat(rate));
          labels.push('');
        });

        data.push({
          ...asset,
          price: asset['price'].slice(-1)[0],
          change: this.changes[key] * 100,
          chartData: {
            labels,
            datasets: [
              {
                radius: 0,
                borderColor: asset['color'],
                data: historic,
              },
            ],
          },
          highestPrice: this.highestPrice(key),
          lowestPrice: this.lowestPrice(key),
        });
      });
    }

    return data;
  }

  /* actions */

  @action fetchData = async () => {
    try {
      const assetRes = await fetch(
        `${API_URL}/api/assets?period=${this.period}`
      );
      const assetData = await assetRes.json();
      this.assetData = assetData.data;

      this.isLoaded = true;
      this.error = null;
    } catch (_e) {
      throw _e;
      if (!this.isLoaded) {
        // Only show the error if the first load fails
        this.error = 'Error loading content, please check your connection and try again.';
      }
      setTimeout(
        () => {
          this.fetchData();
        },
        2000
      );
    }
  };

  @action updatePrice = message => {
    const data = JSON.parse(message.data);
    const cryptoCurrency = data.cryptoCurrency;
    const price = parseFloat(data.price);
    if (this.isLoaded) {
      const index = this.assetData[cryptoCurrency]['price'].length - 1;
      this.assetData[cryptoCurrency]['price'][index] = price;
    }
  };

  @action connectToWebsocket = () => {
    this.websocket = new ReconnectingWebsocket(WS_URL, [], {});
    this.websocket.addEventListener('message', this.updatePrice);
  };

  @action selectPeriod = period => {
    this.period = period;
    this.fetchData();
  };

  @action fromJSON = jsonData => {
    const parsed = JSON.parse(jsonData);
    this.assetData = parsed.assetData;
    if (parsed.period) this.period = parsed.period;
    this.isLoaded = true;
  };

  /* other */

  toJSON = () => JSON.stringify({
    assetData: this.assetData,
    period: this.period,
  });

  highestPrice = currency => {
    let highestPrice = 0.0;
    if (this.isLoaded) {
      highestPrice = Math.max(...this.assetData[currency]['price']);
    }
    return highestPrice;
  };

  lowestPrice = currency => {
    const lowestPrice = 0.0;
    if (this.isLoaded) {
      return Math.min(...this.assetData[currency]['price']);
    }
    return lowestPrice;
  };

  convert = (amount, currency) => {
    return amount * this.rates[currency];
  };

  change = (amount, currency) => {
    let change = this.changes[currency];
    return this.convert(amount, currency) * change / (1 + change);
  };

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
    setInterval(
      () => {
        this.fetchData();
      },
      interval
    );
  }
}
