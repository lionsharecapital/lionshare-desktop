import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';

import 'styles/base.scss';

import Prices from 'scenes/Prices';
import Portfolio from 'scenes/Portfolio';
import Settings from 'scenes/Settings';

@inject('ui')
@observer
class Application extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
  }

  renderView = () => {
    switch (this.props.ui.view) {
      case 'prices':
        return <Prices />;
      case 'portfolio':
        return <Portfolio />;
      case 'settings':
        return <Settings />;
      default:
        // no-op
    }
  }

  render() {
    return (
      <Flex auto>
        { this.renderView() }
      </Flex>
    );
  }
}

export default Application;
