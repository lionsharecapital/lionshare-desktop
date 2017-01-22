const formatNumber = (amount, currency, options = {}) => {
  if (!(options.maximumFractionDigits || options.maximumFractionDigits === 0)) {
    options.maximumFractionDigits = 7 - parseInt(amount, 10).toString().length;
  }

  let value = new Intl.NumberFormat(navigator.language, {
    style: currency ? 'currency' : 'decimal',
    currency,
    ...options,
  }).format(Math.abs(amount));

  let minPrecision;
  if (options.directionSymbol) {
    const direction = amount >= 0.0 ? '+' : '-';
    value = `${direction}${value}`;
    minPrecision = 2;
  }

  if (options.minPrecision) {
    // Set min precision
    value = value.replace(/\d+(?:\.\d+)?/, (match) => {
      const decimals = match.split('.')[1] || '';
      minPrecision = minPrecision || Math.max(2, decimals.length);
      return parseFloat(match).toFixed(minPrecision);
    });
  }

  return value;
};

export {
  formatNumber,
};
