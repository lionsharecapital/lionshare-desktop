import React, { PropTypes } from 'react';
import { Flex } from 'reflexbox';

import styles from './Header.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Header = (props) => (
  <Flex
    align="center"
    justify="center"
    className={ cx(styles.header, { border: props.border }) }
  >
    { props.children }
  </Flex>
);

Header.propTypes = {
  children: PropTypes.node,
  border: PropTypes.bool,
};

export default Header;
