import React  from 'react';
import { Flex } from 'reflexbox';
// import classNames from 'classnames/bind';

import styles from './Header.scss';

// const cx = classNames.bind(styles);

const Header = props => (
  <Flex
    align="center"
    justify="center"
    className={styles.header}
  >
    {props.children}
  </Flex>
);

export default Header;
