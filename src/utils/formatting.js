const formatNumber = (amount, currency, options = {}) => {
  if (
    !(options.maximumFractionDigits || options.maximumFractionDigits === 0) &&
    currency
  ) {
    options.maximumFractionDigits = Math.max(
      0,
      7 - parseInt(amount, 10).toString().length
    );
  }

  if (!currency || options.minPrecision) {
    options.maximumFractionDigits = 2;
    options.minimumFractionDigits = 2;
  }

  let value = new Intl.NumberFormat(navigator.language, options).format(
    Math.abs(amount)
  );

  if (currency) {
    value = `$${value}`;
  }

  if (options.directionSymbol) {
    const direction = amount >= 0.0 ? '+' : '-';
    value = `${direction}${value}`;
  }

  return value;
};

// eslint-disable-next-line import/prefer-default-export
export { formatNumber };
