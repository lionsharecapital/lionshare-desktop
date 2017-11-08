import _ from 'lodash';
import {
  GET_PRICES,
  CHANGE_VIEW,
  TOGGLE_CURRENCY,
  SORT,
  CURRENCIES_NONE,
  CURRENCIES_ALL
} from './actionTypes';
import { currencyColors } from '../../../Core/utils/currencies';

import { CURRENCIES } from '../../../Core/utils/currencies';
import { SORT_TYPES } from '../../../Core/utils/sortBy';

import {API_URL, UI_STORE_KEY, AVAILABLE_VIEWS} from '../config/ApplicationConfig';

const getHighestPrice = (currency, rateData) => {
    let highestPrice = 0.0;
     
    highestPrice = Math.max(...rateData[currency]);
    return highestPrice;
  };

const getLowestPrice = (currency, rateData) => {
    const lowestPrice = 0.0;

     return Math.min(...rateData[currency]) || lowestPrice;
  };

const getMarketCap = (currency, marketData) => {
    const marketCap = 0.0;
     
    return marketData[currency] || marketCap;
  };

const getRates = (rateData) => {
    let data = {};

    _.map(rateData, (value, key) => {
      data[key] = value.slice(-1)[0];
    });

    return data;
  }

const getChanges = (rateData) => {
    let data = {};

    _.map(rateData, (value, key) => {
      const change = (value.slice(-1)[0] - value[0]) / value[0];
      data[key] = change;
    });

    return data;
  }

const priceListData = (rateData, marketData) => {
  let data = [];

  _.map(rateData, (value, key) => {
    const color = currencyColors[key];
    const labels = [];
    const historic = [];
    value.forEach(rate => {
      historic.push(parseFloat(rate));
      labels.push('');
    });

    data.push({
      color,
      symbol: key,
      price: getRates(rateData)[key],
      change: getChanges(rateData)[key] * 100,
      chartData: {
        labels,
        datasets: [
          {
            radius: 0,
            borderColor: color,
            data: historic,
          },
        ],
      },
      highestPrice: getHighestPrice(key, rateData),
      lowestPrice: getLowestPrice(key, rateData),
      marketCap: getMarketCap(key, marketData),
    });
  });


    return data;
  }  

const selectPeriod = (period) => {
  return {
    type: 'SELECT_PERIOD',
    period: period
  };
};

const getPrices = (period) => {
  return async (dispatch) => {
      try {
        const rateRes = await fetch(`${API_URL}/api/prices?period=${period}`);
        const rateData = await rateRes.json();
        // rateData = rateData.data;
      //   this.setState({rateData: rateData.data})

        const marketRes = await fetch(`${API_URL}/api/markets`);
        const marketData = await marketRes.json();
        // this.marketData = marketData.data;
      //   this.setState({marketData: marketData})

        const prices = priceListData(rateData.data, marketData.data);

      
        // this.isLoaded = true;
      //   this.setState({isLoaded: true})
        //mychanges
      //   this.priceListData();
      //   this.error = null;
        dispatch({
            type: GET_PRICES,
            prices: prices
        }); 
      } catch (_e) {
      //   if (!this.state.isLoaded) {
      //     // Only show the error if the first load fails
      //     this.error = 'Error loading content, please check your connection and try again.';
      //   }
      //   setTimeout(
      //     () => {
      //       this.fetchData();
      //     },
      //     2000
      //   );
          console.error(_e);
      }

  }
}

const changeView = view => {
  if (AVAILABLE_VIEWS.includes(view)) {
    return {
      type: 'CHANGE_VIEW',
      view: view
    }      
  }
}

const toggleCurrency = currency => {
  return {
    type: TOGGLE_CURRENCY,
    currency
  }
};

const setSortBy = sortBy => {
  return {
    type: SORT,
    sortBy
  }
};

const toggleCurrenciesAll = () => {
  return {
    type: CURRENCIES_ALL
  }
};

const toggleCurrenciesNone = () => {
  return {
    type: CURRENCIES_NONE
  } 
};

const setLaunchOnStartup = launchOnStartup => {
  return {
    type: 'LAUNCH_ON_STARTUP',
    launchOnStartup
  }
};

const setDockItemVisible = visible => {
  return {
    type: "DOCK_ITEM_VISIBLE",
    dockItemVisible: visible
  }
};


const toObject = () => {
  return {
    view: this.view,
    visibleCurrencies: this.visibleCurrencies,
    sortBy: this.sortBy,
    launchOnStartup: this.launchOnStartup,
    dockItemVisible: this.dockItemVisible,
  };
};

const toJSON = () => JSON.stringify(this.toObject());


const fromJSON = jsonData => {
  const parsed = JSON.parse(jsonData);

  const view = parsed.view;
  this.visibleCurrencies.replace(parsed.visibleCurrencies);

  const setIfDefined = key => {
    if (typeof parsed[key] !== 'undefined') {
      this[key] = parsed[key];
    }
  };

  setIfDefined('dockItemVisible');
  setIfDefined('sortBy');
  setIfDefined('launchOnStartup');
};

export {
  getPrices,
  changeView,
  selectPeriod,
  toggleCurrenciesAll,
  toggleCurrenciesNone,
  toggleCurrency,
  setSortBy
};