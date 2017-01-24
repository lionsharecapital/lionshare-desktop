import React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { Line } from 'react-chartjs-2';

import { formatNumber } from 'utils/formatting';

import CurrencyColor from 'components/CurrencyColor';
import ChangeHighlight from 'components/ChangeHighlight';
import ColoredChange from 'components/ColoredChange';

import classNames from 'classnames/bind';
import styles from './PriceList.scss';
const cx = classNames.bind(styles);

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
    animation: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }],
    },
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      className={ styles.row }
    >
      <Flex className={ styles.rowLeft }>
        <CurrencyColor color={ color } className={ styles.colorDot } />
        <div
          className={ cx(styles.currencyCode, { tight: symbol.length >= 5 }) }
        >
          { symbol }
        </div>
        <Flex column className={ styles.data }>
          <div className={ styles.price }>
            <ChangeHighlight trigger={ price }>
              { formatNumber(price, 'USD', { minPrecision: true }) }
            </ChangeHighlight>
          </div>
          <div>
            <ColoredChange direction={ direction }>
              { formatNumber(change, undefined, { directionSymbol: true,
                                                  minPrecision: true }) }%
            </ColoredChange>
          </div>
        </Flex>
      </Flex>
      <Flex className={ styles.rowRight } align="center">
        <div className={ styles.chart }>
          <Line
            width={ 125 }
            height={ 42 }
            data={ chartData }
            options={ chartOptions }
            redraw
          />
        </div>
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
