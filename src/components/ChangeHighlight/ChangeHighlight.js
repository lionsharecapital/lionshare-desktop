import React, { PropTypes } from 'react';

import styles from './ChangeHighlight.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class ChangeHighlight extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    trigger: PropTypes.any.isRequired,
  }

  state = {
    highlight: false,
    direction: null,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trigger !== nextProps.trigger) {
      this.setState({
        highlight: true,
        direction: parseFloat(nextProps.trigger) > parseFloat(this.props.trigger) ? 'up' : 'down',
      });
      setTimeout(() => this.setState({ highlight: false }), 2500);
    }
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      highlight,
      direction,
    } = this.state;

    return (
      <span
        className={ cx(styles.number, { [`${direction}Highlight`]: highlight })}
      >{ children }</span>
    );
  }
}

export default ChangeHighlight;
