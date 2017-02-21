import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Layout from 'components/Layout';
import PriceList from './components/PriceList';

@inject('prices', 'ui')
@observer
class Prices extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  render() {
    const {
      isLoaded,
      priceListData,
    } = this.props.prices;
    const {
      visibleCurrencies,
      sortBy,
      openCurrency,
    } = this.props.ui;

    return (
      <Layout
        title={ 'Prices' }
        activeTab="prices"
      >
        { isLoaded && (
          <PriceList
            assets={ priceListData }
            visibleCurrencies={ visibleCurrencies }
            sortBy={ sortBy }
            openCurrency={ openCurrency }
          />
        ) }
      </Layout>
    );
  }
}

export default Prices;
