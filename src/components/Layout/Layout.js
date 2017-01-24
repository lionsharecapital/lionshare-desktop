import React from 'react';
import { Flex } from 'reflexbox';
import { observer, inject } from 'mobx-react';
import { shell } from 'electron';
import { version } from '../../../package.json';

import Header, { HeaderTab, SettingsTab } from 'components/Header';
import ErrorMessage from 'components/ErrorMessage';

import styles from './Layout.scss';

const Layout = ({
  ui,
  prices,
  children,
  footer,
  alwaysLoad,
  border = true,
}) => {
  const onClickPrices = () => ui.changeView('prices');
  const onClickPortfolio = () => ui.changeView('portfolio');
  const onClickSettings = () => ui.changeView('settings');
  const openDonateLink = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop#donate');
  const openVersionLink = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop/releases');

  return (
    <Flex auto column>
      <Header
        border={ border }
        onClickSettings={ onClickSettings }
      >
        <HeaderTab
          onClick={ onClickPrices }
          label="Prices"
          active={ ui.view === 'prices' }
        />
        <HeaderTab
          onClick={ onClickPortfolio }
          label="Portfolio"
          active={ ui.view === 'portfolio' }
        />
        <SettingsTab
          onClick={ onClickSettings }
          active={ ui.view === 'settings' }
        />
      </Header>
      <Flex auto>
      { prices.error && !alwaysLoad ? (
        <ErrorMessage
          message={ prices.error }
          onRetry={ prices.fetchData }
        />
      ) : children }
      </Flex>
      { (footer || prices.error) && (
        <Flex
          align="center"
          justify="space-between"
          className={ styles.footer }
        >
          <span
            onClick={ openVersionLink }
            className={ styles.footerLink }
            role="button"
          >
            v{ version }
          </span>
          <span
            onClick={ openDonateLink }
            className={ styles.footerLink }
            role="button"
            title="🙏"
          >Donate</span>
        </Flex>
      ) }
    </Flex>
  );
};

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
  ui: React.PropTypes.object.isRequired,
  prices: React.PropTypes.object.isRequired,
  border: React.PropTypes.bool,
  footer: React.PropTypes.bool,
  alwaysLoad: React.PropTypes.bool,
  title: React.PropTypes.string,
};

export default inject('ui', 'prices')(observer(Layout));
