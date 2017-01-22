import React, { PropTypes } from 'react';

import styles from './Header.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const HeaderTab = (props) => (
  <span
    onClick={ props.onClick }
    className={ cx(styles.headerTab, { activeTab: props.active }) }
  >
    { props.label }
  </span>
);

HeaderTab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default HeaderTab;
