import React, { PropTypes }from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';

import { CURRENCIES } from 'utils/currencies';

import Layout from 'components/Layout';
import CurrencyColor from 'components/CurrencyColor';

import styles from './Settings.scss';

@inject('ui')
@observer
class Settings extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
  }

  render() {
    const openGdaxLink = () => shell.openExternal('https://gdax.com');
    const openPoloniexLink = () => shell.openExternal('https://poloniex.com');

    return (
      <Layout footer alwaysLoad>
        <Flex auto column className={ styles.container }>
          <Section>
            <Heading>Native Currency</Heading>
            <Setting>
              US Dollars (USD)
            </Setting>
          </Section>
          <Section>
            <Heading>Exchange</Heading>
            <Setting>
              GDAX/Poloniex
            </Setting>
            <Footnote>
              BTC/ETH/LTC prices provided by <Link onClick={ openGdaxLink }>GDAX</Link>,
              <Link onClick={ openPoloniexLink }>Poloniex</Link> for the rest.
            </Footnote>
          </Section>
          <Section>
            <Heading>
              <span>Asset List</span>
              <span className={ styles.headingActions }>
                <HeadingAction onClick={ this.props.ui.toggleCurrenciesAll }>All</HeadingAction>
                &nbsp;/&nbsp;
                <HeadingAction onClick={ this.props.ui.toggleCurrenciesNone }>None</HeadingAction>
              </span>
            </Heading>
            <AssetList>
              { CURRENCIES.map(asset => (
                <Asset
                  key={ asset.symbol }
                  { ...asset }
                  toggleCurrency={ this.props.ui.toggleCurrency }
                  visibleCurrencies={ this.props.ui.visibleCurrencies }
                />
              )) }
            </AssetList>
          </Section>
        </Flex>
      </Layout>
    );
  }
}

const Section = ({ children }) => (
  <div className={ styles.section }>
    { children }
  </div>
);

const Heading = ({ children }) => (
  <Flex justify="space-between" className={ styles.heading }>
    { children }
  </Flex>
);

const HeadingAction = ({ children, onClick }) => (
  <span role="button" className={ styles.headingAction } onClick={ onClick }>
    { children }
  </span>
);

const Setting = ({ children }) => (
  <div className={ styles.setting }>
    { children }
  </div>
);

const Footnote = ({ children }) => (
  <div className={ styles.footnote }>
    { children }
  </div>
);

const Link = ({ children }) => (
  <span className={ styles.link } role="button">
    { children }
  </span>
);

const AssetList = ({ children }) => (
  <div className={ styles.assetList }>
    { children }
  </div>
);

const Asset = observer(({
  name,
  symbol,
  color,
  toggleCurrency,
  visibleCurrencies,
}) => {
  const onChange = () => toggleCurrency(symbol);
  const checked = visibleCurrencies.includes(symbol);

  return (
    <Flex
      align="center"
      justify="space-between"
      className={ styles.asset }
      auto
    >
      <Flex>
        <CurrencyColor color={ color } className={ styles.colorDot } />
        { name }&nbsp;<span className={ styles.symbol }>({ symbol })</span>
      </Flex>
      <span>
        <input
          type="checkbox"
          onChange={ onChange }
          checked={ checked }
        />
      </span>
    </Flex>
  );
});

export default Settings;
