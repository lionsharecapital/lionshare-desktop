import React from 'react';
import { Flex } from 'reflexbox';
// import { observer } from 'mobx-react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

import { formatNumber } from '../../../../Core/utils/formatting';
import {sortByType} from '../../../../Core/utils/sortBy';

import CurrencyColor from '../../../../Core/CurrencyColor';
import ChangeHighlight from '../../../../Core/ChangeHighlight';
import ColoredChange from '../../../../Core/ColoredChange';

import classNames from 'classnames/bind';
import styles from './PriceList.scss';
const cx = classNames.bind(styles);

const PriceList = ({ assets, visibleCurrencies, sortBy }) => {
  const includedAssets = assets.filter(asset =>
    visibleCurrencies.includes(asset.symbol));
  const sorted = sortByType(includedAssets, sortBy);

  return (
    <Flex auto column className={styles.container}>
      {sorted.map(asset => <AssetRowClass key={asset.symbol} {...asset} />)}
    </Flex>
  );
};

class AssetRowClass extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {
      symbol,
      color,
      price,
      change,
      chartData,
      highestPrice,
      lowestPrice,
      marketCap,
    } = this.props;
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
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
    };
    return(
      <Flex align="center" justify="space-between" className="row">
        <Flex className="rowLeft">
          <CurrencyColor color={color} className="colorDot" />
          <div className="currencyCode">
            {symbol}
          </div>
          <Flex column className="data">
            <div className="price">
              <ChangeHighlight trigger={price}>
                {formatNumber(price, 'USD', { minPrecision: true })}
              </ChangeHighlight>
            </div>
            <div>
              <ColoredChange direction={direction}>
                {formatNumber(change, undefined, {
                  directionSymbol: true,
                  minPrecision: true,
                })}%
              </ColoredChange>
            </div>
          </Flex>
        </Flex>
        <Flex className="rowRight" align="center">
          <div className="chart">
            <Line
              width={125}
              height={42}
              data={chartData}
              options={chartOptions}
              redraw
            />
          </div>
          <Flex column justify="space-between" className="highlow">
            <Flex justify="space-between" className="high">
              <span className="label">H</span>
              <span>
                {formatNumber(highestPrice, 'USD', { minPrecision: true })}
              </span>
            </Flex>
            <Flex justify="space-between" className="low">
              <span className="label">L</span>
              <span>
                {formatNumber(lowestPrice, 'USD', { minPrecision: true })}
              </span>
            </Flex>
            <Flex justify="space-between" className="cap">
              <span className="label">M</span>
              <span>${numeral(marketCap).format('0.0a')}</span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

}

const AssetRow = (
  {
    symbol,
    color,
    price,
    change,
    chartData,
    highestPrice,
    lowestPrice,
    marketCap,
  },
) => {
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
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  };

  return (
    <Flex align="center" justify="space-between" className={styles.row}>
      <Flex className={styles.rowLeft}>
        <CurrencyColor color={color} className={styles.colorDot} />
        <div className={styles.currencyCode}>
          {symbol}
        </div>
        <Flex column className={styles.data}>
          <div className={styles.price}>
            <ChangeHighlight trigger={price}>
              {formatNumber(price, 'USD', { minPrecision: true })}
            </ChangeHighlight>
          </div>
          <div>
            <ColoredChange direction={direction}>
              {formatNumber(change, undefined, {
                directionSymbol: true,
                minPrecision: true,
              })}%
            </ColoredChange>
          </div>
        </Flex>
      </Flex>
      <Flex className={styles.rowRight} align="center">
        <div className={styles.chart}>
          <Line
            width={125}
            height={42}
            data={chartData}
            options={chartOptions}
            redraw
          />
        </div>
        <Flex column justify="space-between" className={styles.highlow}>
          <Flex justify="space-between" className={styles.high}>
            <span className={styles.label}>H</span>
            <span>
              {formatNumber(highestPrice, 'USD', { minPrecision: true })}
            </span>
          </Flex>
          <Flex justify="space-between" className={styles.low}>
            <span className={styles.label}>L</span>
            <span>
              {formatNumber(lowestPrice, 'USD', { minPrecision: true })}
            </span>
          </Flex>
          <Flex justify="space-between" className={styles.cap}>
            <span className={styles.label}>M</span>
            <span>${numeral(marketCap).format('0.0a')}</span>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PriceList;
