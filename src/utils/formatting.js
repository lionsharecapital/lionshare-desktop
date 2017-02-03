import numeral from 'numeral';

const formatNumber = (amount, currency, options = {}) => {
  if (!(options.maximumFractionDigits || options.maximumFractionDigits === 0)) {
    options.maximumFractionDigits = Math.max(0, 7 - parseInt(amount, 10).toString().length);
  }

  let value = new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
    ...options,
  }).format(Math.abs(amount));

  if (currency) {
    value = `$${value}`;
  }

  if (options.directionSymbol) {
    const direction = amount >= 0.0 ? '+' : '-';
    value = `${direction}${value}`;
  }

  if (options.minPrecision) {
    // Set min precision
    value = value.replace(/\d+(?:\,\d+)*(?:\.\d+)?/, (match) => {
      const matchValue = parseFloat(match.replace(/,/g, ''));
      if (matchValue >= 0.1 || options.directionSymbol) {
        match = numeral(matchValue).format('0,0.00');
      }
      return match;
    });
  }

  return value;
};

export {
  formatNumber,
};
