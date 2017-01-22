import _ from 'lodash';

const CURRENCIES = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    color: '#FF7300',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#8C01FF',
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    color: '#B4B4B4',
  },
  {
    name: 'Augur',
    symbol: 'REP',
    color: '#EC3766',
  },
  {
    name: 'ZCash',
    symbol: 'ZEC',
    color: '#F0AD4E',
  },
  {
    name: 'Lisk',
    symbol: 'LSK',
    color: '#38E6B2',
  },
  {
    name: 'Monero',
    symbol: 'XMR',
    color: '#CF4900',
  },
  {
    name: 'Ethereum Classic',
    symbol: 'ETC',
    color: '#4FB858',
  },
  {
    name: 'Ripple',
    symbol: 'XRP',
    color: '#27A2DB',
  },
  {
    name: 'Dash',
    symbol: 'DASH',
    color: '#1E73BE',
  },
  {
    name: 'Stellar',
    symbol: 'STR',
    color: '#08B5E5',
  },
  {
    name: 'MaidSafeCoin',
    symbol: 'MAID',
    color: '#5592D7',
  },
  {
    name: 'Factom',
    symbol: 'FCT',
    color: '#417BA4',
  },
  {
    name: 'NEM',
    symbol: 'XEM',
    color: '#FABE00',
  },
  {
    name: 'Steem',
    symbol: 'STEEM',
    color: '#4BA2F2',
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    color: '#F2A51F',
  },
  {
    name: 'ShadowCash',
    symbol: 'SDC',
    color: '#E2213D',
  },
  {
    name: 'BitShares',
    symbol: 'BTS',
    color: '#00A9E0',
  },
  {
    name: 'GameCredits',
    symbol: 'GAME',
    color: '#7CBF3F',
  },
  {
    name: 'Ardor',
    symbol: 'ARDR',
    color: '#1162A1',
  },
];

const currencyData = (currencySymbol) => (
  _.find(CURRENCIES, data => data.symbol === currencySymbol)
);

const currencyColors = {};
CURRENCIES.forEach(currency => currencyColors[currency.symbol] = currency.color);

export {
  CURRENCIES,
  currencyData,
  currencyColors,
};
