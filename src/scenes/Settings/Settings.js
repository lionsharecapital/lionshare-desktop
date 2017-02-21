import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Flex } from 'reflexbox';
import { shell } from 'electron';

import { CURRENCIES } from 'utils/currencies';
import { SORT_TYPES } from 'utils/sortBy';

import Layout from 'components/Layout';
import CurrencyColor from 'components/CurrencyColor';
import { SettingToggle, ToggleOption } from './components/SettingToggle';

import styles from './Settings.scss';

@inject('ui', 'prices')
@observer
class // eslint-disable-next-line react/prefer-stateless-function
Settings extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    prices: PropTypes.object.isRequired,
  };

  render() {
    const { ui } = this.props;
    const openGitHubFaq = () =>
      shell.openExternal(
        'https://github.com/lionsharecapital/lionshare-desktop#faq'
      );
    const { selectPeriod, period } = this.props.prices;
    const periodDay = () => selectPeriod('day');
    const periodWeek = () => selectPeriod('week');
    const periodMonth = () => selectPeriod('month');
    const {
      setLaunchOnStartup,
      launchOnStartup,
      setDockItemVisible,
      dockItemVisible,
      setSortBy,
      sortBy,
    } = ui;

    return (
      <Layout footer alwaysLoad>
        <Flex auto column className={styles.container}>
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
            <Heading>Sort currencies by</Heading>
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
                % Change Today
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
              <Link onClick={openGitHubFaq}>Why?</Link>
            </Setting>
          </Section>
          <Section>
            <Heading>MacOS Preferences</Heading>
            <div className={styles.macOSPreferences}>
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
          <Section>
            <Heading>
              <span>Asset List</span>
              <span className={styles.headingActions}>
                <HeadingAction onClick={ui.toggleCurrenciesAll}>
                  All
                </HeadingAction>
                &nbsp;|&nbsp;
                <HeadingAction onClick={ui.toggleCurrenciesNone}>
                  None
                </HeadingAction>
              </span>
            </Heading>
            <AssetList>
              {CURRENCIES.map(asset => (
                <Asset
                  key={asset.symbol}
                  {...asset}
                  toggleCurrency={ui.toggleCurrency}
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
  <div className={styles.section}>
    {children}
  </div>
);

const Heading = ({ children }) => (
  <Flex justify="space-between" className={styles.heading}>
    {children}
  </Flex>
);

const HeadingAction = ({ children, onClick }) => (
  <span role="button" className={styles.headingAction} onClick={onClick}>
    {children}
  </span>
);

const Setting = ({ children }) => (
  <div className={styles.setting}>
    {children}
  </div>
);

const CheckboxSetting = ({ label, onChange, checked }) => (
  <Flex
    align="center"
    justify="space-between"
    className={styles.checkboxSetting}
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
  <span className={styles.link} onClick={onClick} role="button">
    {children}
  </span>
);

const AssetList = ({ children }) => (
  <div className={styles.assetList}>
    {children}
  </div>
);

const Asset = observer((
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
      <CurrencyColor color={color} className={styles.colorDot} />
      {name}&nbsp;<span className={styles.symbol}>({symbol})</span>
    </Flex>
  );

  return (
    <CheckboxSetting label={label} onChange={onChange} checked={checked} />
  );
});

export default Settings;
