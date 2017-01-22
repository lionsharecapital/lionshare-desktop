import React from 'react';
import { Flex } from 'reflexbox';

import styles from './Divider.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Divider = ({ children, onClick, active }) => (
  <Flex
    align="center"
    justify="center"
    className={ cx(styles.container, { active }) }
  >
    <div className={ cx(styles.content, { action: onClick }) } onClick={ onClick }>
      { children }
    </div>
  </Flex>
);

export default Divider;
