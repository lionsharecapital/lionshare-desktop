import React from 'react';

import styles from './FatButton.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class FatButton extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  }

  onClick = (event) => {
    event.preventDefault();
    if (this.props.active) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <button
        className={ cx(styles.container, { active: this.props.active }) }
        onClick={ this.onClick }
      >
        { this.props.label }
      </button>
    );
  }
}
