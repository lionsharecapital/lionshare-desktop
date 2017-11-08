import React from 'react';
import { Flex } from 'reflexbox';
import {version} from '../../../package.json';
import {connect} from 'react-redux';
import {changeView} from '../../Modules/Application/actions/ApplicationActions';
import {bindActionCreators} from 'redux';

import Header, {HeaderTab, SettingsTab} from '../../Core/Header';
import ErrorMessage from '../../Core/ErrorMessage';

import styles from './Layout.scss';


const Layout = (
  {
    ui,
    prices,
    children,
    footer,
    alwaysLoad,
    border = true,
    changeView
  },
) => {
  const onClickPrices = () => changeView('prices');
  const onClickPortfolio = () => changeView('portfolio');
  const onClickSettings = () => changeView('settings');

  return (
    <Flex auto column>
      <Header border={border} onClickSettings={onClickSettings}>
        <HeaderTab
          onClick={onClickPrices}
          label="Prices"
          active={ui.view === 'prices'}
        />
        {/*<HeaderTab
          onClick={onClickPortfolio}
          label="Portfolio"
          active={ui.view === 'portfolio'}
        />*/}
        <SettingsTab
          onClick={onClickSettings}
          active={ui.view === 'settings'}
        />
      </Header>
      <Flex auto>
        {prices.error && !alwaysLoad
          ? <ErrorMessage message={prices.error} onRetry={prices.fetchData} />
          : children}
      </Flex>
      {(footer || prices.error) &&
        <Flex align="center" justify="space-between" className={styles.footer}>
          <span
            onClick={() => {}}
            className="footerLink"
            role="button"
          >
            v{version}
          </span>
          <span
            onClick={()=> {}} 
            className="footerLink"
            role="button"
            title="🙏"
          >
            Donate
          </span>
        </Flex>}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    prices: state.prices,
    ui: state.ui
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changeView}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
