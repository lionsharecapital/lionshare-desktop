import React from 'react';
import { Flex } from 'reflexbox';

import styles from './Section.scss';

const Section = ({
  children,
}) => (
  <Flex column className={ styles.container }>
    { children }
  </Flex>
);

export default Section;
