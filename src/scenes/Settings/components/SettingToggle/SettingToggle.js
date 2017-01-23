import React from 'react';
import { Flex } from 'reflexbox';

import styles from './SettingToggle.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const SettingToggle = ({ children }) => (
  <Flex className={ styles.container }>
    { children }
  </Flex>
);

const ToggleOption = ({ onClick, selected, children }) => (
  <Flex
    align="center"
    justify="center"
    role="button"
    onClick={ onClick }
    className={ cx(styles.option, { selected }) }
  >
    { children }
  </Flex>
);

export {
  SettingToggle,
  ToggleOption,
};
