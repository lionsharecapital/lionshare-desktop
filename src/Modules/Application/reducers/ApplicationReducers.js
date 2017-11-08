import {
    GET_PRICES,
    GET_UI,
    TOGGLE_CURRENCY,
    CURRENCIES_NONE,
    CURRENCIES_ALL,
    CHANGE_VIEW,
    SORT
} from '../actions/actionTypes';

import { CURRENCIES } from '../../../Core/utils/currencies';
import { SORT_TYPES } from '../../../Core/utils/sortBy';
import {AVAILABLE_VIEWS} from '../config/ApplicationConfig';

const initialState = {
    prices: {
        priceListData: [],
        period: 'day',
        isLoaded: false,
        error: null
    },
    ui: {
        view: AVAILABLE_VIEWS[0],
        visibleCurrencies: CURRENCIES.map(currency => currency.symbol),
        sortBy: SORT_TYPES.marketCap,
        dockItemVisible: true,
        launchOnStartup: false
    }
}

const pricesReducer = (state = initialState.prices, action) => {
    switch (action.type) {
        case GET_PRICES: {
            const {prices} = action;
            // always return new state; 
            const newState = Object.assign({}, state, 
                    {
                       priceListData: prices,
                       isLoaded: true,
                       error: null
                    }
                )
            return newState;
        }
        case 'SELECT_PERIOD': {
            const {period} = action;
            const newState = Object.assign({}, state, {
                period: period
            });

            return newState;
        }
        default:
            return state;
    };
};

const uiReducer = (state = initialState.ui, action) => {
    switch (action.type) {
        case TOGGLE_CURRENCY: {
            debugger;
            const {visibleCurrencies} = state;
            const currency = action.currency;

            if (visibleCurrencies.includes(currency)) {
                let indexOfCurrency = visibleCurrencies.indexOf(currency);

                if (indexOfCurrency >= 0) {
                    visibleCurrencies.splice(indexOfCurrency, 1);
                }
                // visibleCurrencies.remove(currency);
            } else {
                visibleCurrencies.push(currency);
            }

            const newState = Object.assign({}, state, {
                visibleCurrencies
            })
            return newState;
        }
        case CURRENCIES_NONE: {
            const newState = Object.assign({}, state, {
                visibleCurrencies: []
            })
            return newState;
        }
        case CURRENCIES_ALL: {
            const visibleCurrencies = [];

            CURRENCIES.forEach(currency =>
                visibleCurrencies.push(currency.symbol));

            const newState = Object.assign({}, state, {
                visibleCurrencies
            });
            return newState; 
        }
        case SORT: {
            const {sortBy} = action;
            const newState = Object.assign({}, state, {
                sortBy
            })
            return newState;
        }
        case CHANGE_VIEW: {
            const {view} = action;
            const newState = Object.assign({}, state, {
               view: view 
            })
            return newState;
        }
        default:
            return state;
    }
}

export {pricesReducer, uiReducer};