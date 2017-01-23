import React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import _ from 'lodash';

import { formatNumber } from 'utils/formatting';
import { CURRENCIES } from 'utils/currencies';

import CurrencyColor from 'components/CurrencyColor';
import ChangeHighlight from 'components/ChangeHighlight';
import ColoredChange from 'components/ColoredChange';

import styles from './AssetList.scss';

const AssetList = ({ assets }) => {
  // Order assets based on the "official order"
  const sortedAssets = _.sortBy(assets, (asset) => {
    const assetList = CURRENCIES.map(currency => currency.symbol);
    return assetList.indexOf(asset.symbol);
  });

  return (
    <Flex auto column className={ styles.container }>
      { sortedAssets.map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </Flex>
  );
};

const AssetRow = ({
  name,
  symbol,
  color,
  balance,
  nativeBalance,
  change,
}) => {
  const direction = change >= 0 ? 'up' : 'down';

  return (
    <Flex
      align="center"
      justify="space-between"
      className={ styles.row }
    >
      <Flex align="flex-start">
        <CurrencyColor color={ color } className={ styles.colorDot } />
        <Flex column>
          <div>{ name }</div>
          <div className={ styles.balance }>
            { formatNumber(balance) } { symbol }
          </div>
        </Flex>
      </Flex>
      <div>
        <Flex justify="flex-end">
          <ChangeHighlight trigger={ nativeBalance }>
            { formatNumber(nativeBalance, 'USD', { minPrecision: true }) }
          </ChangeHighlight>
        </Flex>
        <Flex justify="flex-end">
          <ColoredChange direction={ direction }>
            { formatNumber(change, 'USD', { directionSymbol: true, minPrecision: true }) }
          </ColoredChange>
        </Flex>
      </div>
    </Flex>
  );
};

export default observer(AssetList);
