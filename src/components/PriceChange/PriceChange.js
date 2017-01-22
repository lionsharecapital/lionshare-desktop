import React, { PropTypes } from 'react';

import styles from './PriceChange.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class PriceChange extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.string.isRequired,
    trigger: PropTypes.any.isRequired,
  }

  state = {
    highlight: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trigger !== nextProps.trigger) {
      this.setState({ highlight: true });
      setTimeout(() => this.setState({ highlight: false }), 2500);
    }
  }

  render() {
    const {
      children,
      direction,
    } = this.props;

    return (
      <span
        className={ cx(styles[direction], { [`${direction}Highlight`]: this.state.highlight })}
      >{ children }</span>
    );
  }
}

export default PriceChange;
