import React, { PropTypes } from 'react';
import { Flex } from 'reflexbox';
import classNames from 'classnames/bind';

import styles from './Header.scss';

const cx = classNames.bind(styles);

const Header = props => (
  <Flex
    align="center"
    justify="center"
    className={cx(styles.header, { border: props.border })}
  >
    {props.children}
  </Flex>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
  border: PropTypes.bool,
};

Header.defaultProps = {
  border: true,
};

export default Header;
