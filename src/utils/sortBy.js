import _sortBy from 'lodash/sortBy';

export const SORT_TYPES = {
  marketCap: 'marketCap',
  price: 'price',
  default: null,
};

export function sortByType(priceList, sortBy) {
  switch (sortBy) {
    case SORT_TYPES.marketCap:
      return _sortBy(priceList, x => -x.marketCap);
    case SORT_TYPES.price:
      return _sortBy(priceList, x => -x.price);
    default:
      return priceList;
  }
}
