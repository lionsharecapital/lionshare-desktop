import React, { PropTypes }from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';

import { CURRENCIES } from 'utils/currencies';

import Layout from 'components/Layout';
import CurrencyColor from 'components/CurrencyColor';
import { SettingToggle, ToggleOption } from './components/SettingToggle';

import styles from './Settings.scss';

@inject('ui', 'prices')
@observer
class Settings extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    prices: PropTypes.object.isRequired,
  }

  render() {
    const { ui } = this.props;

    const openGdaxLink = () => shell.openExternal('https://gdax.com');
    const openPoloniexLink = () => shell.openExternal('https://poloniex.com');

    const { selectPeriod, period } = this.props.prices;
    const periodDay = () => selectPeriod('day');
    const periodWeek = () => selectPeriod('week');
    const periodMonth = () => selectPeriod('month');

    return (
      <Layout footer alwaysLoad>
        <Flex auto column className={ styles.container }>
          <Section>
            <Heading>Time Period</Heading>
            <SettingToggle>
              <ToggleOption
                onClick={ periodDay }
                selected={ period === 'day' }
              >
                1 Day
              </ToggleOption>
              <ToggleOption
                onClick={ periodWeek }
                selected={ period === 'week' }
              >
                1 Week
              </ToggleOption>
              <ToggleOption
                onClick={ periodMonth }
                selected={ period === 'month' }
              >
                1 Month
              </ToggleOption>
            </SettingToggle>
          </Section>
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
                <HeadingAction onClick={ ui.toggleCurrenciesAll }>All</HeadingAction>
                &nbsp;/&nbsp;
                <HeadingAction onClick={ ui.toggleCurrenciesNone }>None</HeadingAction>
              </span>
            </Heading>
            <AssetList>
              { CURRENCIES.map(asset => (
                <Asset
                  key={ asset.symbol }
                  { ...asset }
                  toggleCurrency={ ui.toggleCurrency }
                  visibleCurrencies={ ui.visibleCurrencies }
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
