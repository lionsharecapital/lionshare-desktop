import _sortBy from 'lodash/sortBy';

const SORT_TYPES = {
  marketCap: 'marketCap',
  change: 'change',
};

const sortByType = (priceList, sortBy) => {
  switch (sortBy) {
    case SORT_TYPES.marketCap:
      return _sortBy(priceList, x => -x.marketCap);
    case SORT_TYPES.change:
      return _sortBy(priceList, x => {
        let change = x.change / 100.0;
        return -Math.abs(change * x.price / (1 + change));
      });
    default:
      return priceList;
  }
};

export { SORT_TYPES, sortByType };
