import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PriceList from '../components/PriceList';
import Layout from '../../../Core/Layout';

// @inject('prices', 'ui')
// @observer
class Prices extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  };

  render() {
    const {
      isLoaded,
      priceListData,
    } = this.props.prices;
    const {
      visibleCurrencies,
      sortBy,
    } = this.props.ui;
    const ui = {
      changeView: () => {
      },
      view: 'prices'
    }

    return (
      <Layout 
        title={'Prices'}
        activeTab="prices"
      >
        {isLoaded &&
          <PriceList
            assets={priceListData}
            visibleCurrencies={visibleCurrencies}
            sortBy={sortBy}
          />}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prices: state.prices,
    ui: state.ui
  }
}

export default connect(mapStateToProps)(Prices);

