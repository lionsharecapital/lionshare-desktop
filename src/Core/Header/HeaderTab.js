import React from 'react';
// import classNames from 'classnames/bind';

import styles from './Header.scss';

// const cx = classNames.bind(styles);

const HeaderTab = props => (
  <span
    onClick={props.onClick}
    className="headerTab"
  >
    {props.label}
  </span>
);

export default HeaderTab;
