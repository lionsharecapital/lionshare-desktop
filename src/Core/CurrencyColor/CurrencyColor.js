import React from 'react';
// import classNames from 'classnames/bind';

import styles from './CurrencyColor.scss';

// const cx = classNames.bind(styles);

const CurrencyColor = ({ color, className }) => (
  <div
    className="test"
    style={{ backgroundColor: color }}
  />
);

export default CurrencyColor;
