import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './FatButton.scss';

const cx = classNames.bind(styles);

export default class FatButton extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = event => {
    event.preventDefault();
    if (this.props.active) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <button
        className={cx(styles.container, { active: this.props.active })}
        onClick={this.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}
