import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
// import { shell } from 'electron';

import { CURRENCIES } from '../../Core/utils/currencies';
import { SORT_TYPES } from '../../Core/utils/sortBy';
import {
  getPrices,
  selectPeriod,
  toggleCurrency,
  toggleCurrenciesAll,
  toggleCurrenciesNone,
  setSortBy
} from '../Application/actions/ApplicationActions';
import {bindActionCreators} from 'redux';

import Layout from '../../Core/Layout';
import CurrencyColor from '../../Core/CurrencyColor';
import { SettingToggle, ToggleOption } from './components/SettingToggle';

import styles from './Settings.scss';

class // eslint-disable-next-line react/prefer-stateless-function
Settings extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    prices: PropTypes.object.isRequired,
  };

  render() {
    const {
      ui,
      prices,
      getPrices,
      selectPeriod,
      toggleCurrenciesAll,
      toggleCurrenciesNone,
      toggleCurrency,
      setSortBy
    } = this.props;
    // const openGitHubFaq = () =>
    //   shell.openExternal(
    //     'https://github.com/lionsharecapital/lionshare-desktop#faq'
    //   );
    const { period } = prices;
    const periodDay = () => {
      selectPeriod('day');      
      getPrices('day');
    }
    const periodWeek = () => {
      selectPeriod('week'); 
      getPrices('week');
    } 
    const periodMonth = () => {
      selectPeriod('month');
      getPrices('month');
    };
    const {
      setLaunchOnStartup,
      launchOnStartup,
      setDockItemVisible,
      dockItemVisible,
      sortBy
    } = ui;

    return (
      <Layout
        prices={prices}
        ui={ui}
        footer
        alwaysLoad
      >
        <Flex auto column>
          <Section>
            <Heading>Time Period</Heading>
            <SettingToggle>
              <ToggleOption onClick={periodDay} selected={period === 'day'}>
                1 Day
              </ToggleOption>
              <ToggleOption onClick={periodWeek} selected={period === 'week'}>
                1 Week
              </ToggleOption>
              <ToggleOption onClick={periodMonth} selected={period === 'month'}>
                1 Month
              </ToggleOption>
            </SettingToggle>
          </Section>
          <Section>
            <Heading>Sort Prices By</Heading>
            <SettingToggle>
              <ToggleOption
                onClick={() => {
                  setSortBy(SORT_TYPES.marketCap);
                }}
                selected={sortBy === SORT_TYPES.marketCap}
              >
                Market Cap
              </ToggleOption>
              <ToggleOption
                onClick={() => {
                  setSortBy(SORT_TYPES.change);
                }}
                selected={sortBy === SORT_TYPES.change}
              >
                % Change
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
              <Link onClick={() => {} }>Why?</Link>
            </Setting>
          </Section>
          {/*<Section>
            <Heading>MacOS Preferences</Heading>
            <div className={"macOSPreferences"}>
              <CheckboxSetting
                label="Show dock icon"
                onChange={setDockItemVisible}
                checked={dockItemVisible}
              />
              <CheckboxSetting
                label="Launch Lionshare on startup"
                onChange={setLaunchOnStartup}
                checked={launchOnStartup}
              />
            </div>
          </Section>
          */}
          <Section>
            <Heading>
              <span>Asset List</span>
              <span className={"headingActions"}>
                <HeadingAction onClick={toggleCurrenciesAll}>
                  All
                </HeadingAction>
                &nbsp;|&nbsp;
                <HeadingAction onClick={toggleCurrenciesNone}>
                  None
                </HeadingAction>
              </span>
            </Heading>
            <AssetList>
              {CURRENCIES.map(asset => (
                <Asset
                  key={asset.symbol}
                  {...asset}
                  toggleCurrency={toggleCurrency}
                  visibleCurrencies={ui.visibleCurrencies}
                />
              ))}
            </AssetList>
          </Section>
        </Flex>
      </Layout>
    );
  }
}

const Section = ({ children }) => (
  <div className="section">
    {children}
  </div>
);

const Heading = ({ children }) => (
  <Flex justify="space-between" className="heading">
    {children}
  </Flex>
);

const HeadingAction = ({ children, onClick }) => (
  <span role="button" className="headingAction" onClick={onClick}>
    {children}
  </span>
);

const Setting = ({ children }) => (
  <div className="setting">
    {children}
  </div>
);

const CheckboxSetting = ({ label, onChange, checked }) => (
  <Flex
    align="center"
    justify="space-between"
    className="checkboxSetting"
    auto
  >
    <Flex>{label}</Flex>
    <input
      type="checkbox"
      onChange={e => onChange(e.target.checked)}
      checked={checked}
    />
  </Flex>
);

const Link = ({ children, onClick }) => (
  <span className="link" onClick={onClick} role="button">
    {children}
  </span>
);

const AssetList = ({ children }) => (
  <div className="assetList">
    {children}
  </div>
);

const Asset = (
  {
    name,
    symbol,
    color,
    toggleCurrency,
    visibleCurrencies,
  },
) => {
  const onChange = () => toggleCurrency(symbol);
  const checked = visibleCurrencies.includes(symbol);

  const label = (
    <Flex>
      <CurrencyColor color={color} className="colorDot" />
      {name}&nbsp;<span className="symbol">({symbol})</span>
    </Flex>
  );

  return (
    <CheckboxSetting label={label} onChange={onChange} checked={checked} />
  );
};

const mapStateToProps = (state) => {
  return {
    prices: state.prices,
    ui: state.ui
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getPrices,
    selectPeriod,
    toggleCurrenciesAll,
    toggleCurrency,
    toggleCurrenciesNone,
    setSortBy
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
