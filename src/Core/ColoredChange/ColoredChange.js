import React from 'react';
// import classNames from 'classnames/bind';

import styles from './ColoredChange.scss';

// const cx = classNames.bind(styles);

const ColoredChange = ({ children, direction }) => (
  <span className="test">{children}</span>
);

// ColoredChange.propTypes = {
//   children: PropTypes.node.isRequired,
//   direction: PropTypes.string.isRequired,
// };

export default ColoredChange;
