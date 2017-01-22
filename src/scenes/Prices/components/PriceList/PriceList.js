import React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { Line } from 'react-chartjs';

import { formatNumber } from 'utils/formatting';

import CurrencyColor from 'components/CurrencyColor';
import PriceChange from 'components/PriceChange';

import styles from './PriceList.scss';

const PriceList = ({ assets, visibleCurrencies }) => {
  const includedAssets = assets.filter(asset => visibleCurrencies.includes(asset.symbol));

  return (
    <Flex auto column className={ styles.container }>
      { includedAssets.map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </Flex>
  );
};

const AssetRow = ({
  symbol,
  color,
  price,
  change,
  chartData,
  highestPrice,
  lowestPrice,
  marketCap,
}) => {
  const direction = change >= 0 ? 'up' : 'down';
  const chartOptions = {
    showTooltips: false,
    pointDot: false,
    scaleShowLabels: false,
    datasetFill: false,
    scaleFontSize: 0,
    animation: false,
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      className={ styles.row }
    >
      <Flex>
        <CurrencyColor color={ color } className={ styles.colorDot } />
        <div className={ styles.currencyCode }>{ symbol }</div>
        <Flex column className={ styles.data }>
          <div className={ styles.price }>
            { formatNumber(price, 'USD', { minPrecision: true }) }
          </div>
          <div>
            <PriceChange direction={ direction } trigger={ price }>
              { formatNumber(change, undefined, { directionSymbol: true,
                                                  minPrecision: true }) }%
            </PriceChange>
          </div>
        </Flex>
      </Flex>
      <Flex align="center">
        <Line
          width="125"
          height="42" data={ chartData }
          options={ chartOptions }
          className={ styles.chart }
          redraw
        />
        <Flex column justify="space-between" className={ styles.highlow }>
          <Flex justify="space-between" className={ styles.high }>
            <span className={ styles.label }>H</span>
            <span>{ formatNumber(highestPrice, 'USD', { minPrecision: true }) }</span>
          </Flex>
          <Flex justify="space-between" className={ styles.low }>
            <span className={ styles.label }>L</span>
            <span>{ formatNumber(lowestPrice, 'USD', { minPrecision: true }) }</span>
          </Flex>
          <Flex justify="space-between" className={ styles.cap }>
            <span className={ styles.label }>M</span>
            <span>${ marketCap }</span>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(PriceList);
