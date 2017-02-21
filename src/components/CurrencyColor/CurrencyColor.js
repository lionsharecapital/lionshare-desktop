import React from 'react';
import classNames from 'classnames/bind';

import styles from './CurrencyColor.scss';

const cx = classNames.bind(styles);

const CurrencyColor = ({ color, className }) => (
  <div
    className={cx(styles.container, className)}
    style={{ backgroundColor: color }}
  />
);

export default CurrencyColor;
