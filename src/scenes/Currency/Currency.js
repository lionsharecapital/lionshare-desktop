import _ from 'lodash';
import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { formatNumber } from 'utils/formatting';
import { Flex } from 'reflexbox';

import ChangeHighlight from 'components/ChangeHighlight';
import ColoredChange from 'components/ColoredChange';
import Layout from 'components/Layout';
import Section from './components/Section';

import styles from './Currency.scss';

@inject('prices', 'ui')
@observer
class Currency extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  render() {
    const {
      priceListData,
    } = this.props.prices;
    const {
      viewCurrency,
    } = this.props.ui;
    const currency = viewCurrency;
    const currencyData = _.find(priceListData, (data) => data.symbol === currency);

    return (
      <Layout
        title="Bitcoin"
        activeTab="prices"
      >
        <Flex column auto>
          <Section>
            <div className={ styles.price }>
              <ChangeHighlight trigger={ currencyData.price }>
                { formatNumber(currencyData.price, 'USD', { minPrecision: true }) }
              </ChangeHighlight>
            </div>
            <div className={ styles.change }>
              <ColoredChange direction={ currencyData.direction }>
                { formatNumber(currencyData.change, undefined, { directionSymbol: true,
                                                    minPrecision: true }) }%
              </ColoredChange>
            </div>
          </Section>
          <Section>
            More data
          </Section>
        </Flex>
      </Layout>
    );
  }
}

export default Currency;
