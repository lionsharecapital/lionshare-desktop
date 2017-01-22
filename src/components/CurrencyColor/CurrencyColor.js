import React from 'react';

import styles from './CurrencyColor.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CurrencyColor = ({ color, className }) => (
  <div
    className={ cx(styles.container, className) }
    style={{ backgroundColor: color }}
  ></div>
);

export default CurrencyColor;
