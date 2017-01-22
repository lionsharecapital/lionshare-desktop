import React, { PropTypes } from 'react';

import styles from './Input.scss';

const Input = (props) => (
  <input { ...props } className={ styles[props.type] } />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Input;
