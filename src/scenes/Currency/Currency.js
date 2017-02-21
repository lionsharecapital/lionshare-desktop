import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Layout from 'components/Layout';

@inject('prices', 'ui')
@observer
class Currency extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  render() {
    // const {
    //   rateData,
    //   marketData,
    // } = this.props.prices;
    const {
      viewCurrency,
    } = this.props.ui;
    const currency = viewCurrency;

    return (
      <Layout
        title="Bitcoin"
        activeTab="prices"
      >
        { currency }
      </Layout>
    );
  }
}

export default Currency;
