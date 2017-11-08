import React from 'react';
import { Flex } from 'reflexbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import _ from 'lodash';

import '../../../styles/base.scss';

import Prices from '../../Prices';
import Portfolio from '../../Portfolio';
import Settings from '../../Settings';
import { currencyColors } from '../../../Core/utils/currencies';

import {getPrices, getUI} from '../actions/ApplicationActions';

const API_URL = 'https://api.lionshare.capital';

class Application extends React.Component {

  componentDidMount() {
    this.props.getPrices('day');
  }

  renderView = () => {
    // mock datastructure
    const {view} = this.props.ui;

    switch (view) {
      case 'prices':
        return <Prices/>;
      case 'portfolio':
        return <Portfolio />;
      case 'settings':
        return <Settings/>;
      default:
      // no-op
    }
  };

  render() {
    return (
      <Flex auto>
        {this.renderView()}
      </Flex>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  };
}

const mapDispathchToProps = (dispatch) => {
  return bindActionCreators({ getPrices }, dispatch);
}

export default connect(mapStateToProps, mapDispathchToProps)(Application);
