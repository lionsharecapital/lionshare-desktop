import React, { PropTypes } from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { formatNumber } from 'utils/formatting';
import _ from 'lodash';

import { CURRENCIES } from 'utils/currencies';

import CurrencyColor from 'components/CurrencyColor';

import styles from './EditAssets.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import inputStyles from 'components/Input/Input.scss';

const EditAssets = ({
  onChange,
  balances,
  totalBalance,
  visibleCurrencies,
  editMode,
  toggleEditMode,
  fiatCurrency,
}) => {
  const currencies = CURRENCIES.filter(currency => visibleCurrencies.includes(currency.symbol));
  const balanceLabel = editMode === 'fiat' ? 'Hide USD' : 'Show USD';

  return (
    <Flex auto column className={ styles.container }>
      <Flex align="center" justify="space-between" className={ styles.header }>
        <div>Total: { formatNumber(totalBalance, 'USD') }</div>
        <div
          className={ styles.toggle }
          onClick={ toggleEditMode }
          role="button"
        >
          { balanceLabel }
        </div>
      </Flex>
      <div className={ styles.currencies }>
        { currencies.map(currency => (
          <EditRow
            key={ currency.symbol }
            currency={ currency }
            onChange={ onChange }
            value={ balances.get(currency.symbol) }
            editMode={ editMode }
            fiatCurrency={ fiatCurrency }
          />
        )) }
      </div>
    </Flex>
  );
};

class EditRow extends React.Component {
  state = { active: false }

  onClick = () => this.textInput.focus();
  onFocus = () => this.setState({ active: true });
  onBlur = () => this.setState({ active: false });

  render() {
    const {
      currency,
      onChange,
      value,
      editMode,
      fiatCurrency,
     } = this.props;

    const refInput = (input) => { this.textInput = input; };
    const currencySymbol = editMode === 'crypto' ? currency.symbol : fiatCurrency;

    return (
      <Flex
        justify="space-between"
        className={ styles.row }
        onClick={ this.onClick }
      >
        <Flex align="center" className={ styles.dot }>
          <CurrencyColor color={ currency.color } className={ styles.colorDot } />
        </Flex>
        <Flex
          auto
          align="center"
          justify="space-between"
          className={ cx(styles.underline, { active: this.state.active }) }
        >
          <div className={ styles.currencyName }>{currency.name}</div>
          <Flex>
            <input
              type="number"
              min="0"
              onChange={ onChange }
              name={ currency.symbol }
              value={ value && _.round(value, 2) }
              placeholder={ 0 }
              ref={ refInput }
              className={ inputStyles.number }
              onFocus={ this.onFocus }
              onBlur={ this.onBlur }
            />
            <Flex align="center" className={ styles.symbol }>
              { currencySymbol }
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

EditRow.propTypes = {
  currency: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  editMode: PropTypes.string.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
};

export default observer(EditAssets);
