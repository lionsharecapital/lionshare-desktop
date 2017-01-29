import React, { PropTypes } from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { formatNumber } from 'utils/formatting';
import { Pie } from 'react-chartjs-2';

import { CURRENCIES } from 'utils/currencies';

import CurrencyColor from 'components/CurrencyColor';

import styles from './EditAssets.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import inputStyles from 'components/Input/Input.scss';

class EditAssets extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    balances: PropTypes.object.isRequired,
    totalBalance: PropTypes.number.isRequired,
    visibleCurrencies: PropTypes.object.isRequired,
    editMode: PropTypes.string,
    toggleEditMode: PropTypes.func.isRequired,
    fiatCurrency: PropTypes.string.isRequired,
    toggleOnboarding: PropTypes.func.isRequired,
    showOnboarding: PropTypes.bool.isRequired,
  }

  state = {
    chartData: this.chartState,
  }

  componentDidMount() {
    this.chartUpdate = setInterval(() => {
      this.setState({ chartData: this.chartState });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.chartUpdate);
  }

  get chartState() {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    return {
      borderWidth: 0,
      datasets: [{
        borderWidth: 0,
        data: [
          getRandomInt(50, 200),
          getRandomInt(100, 150),
          getRandomInt(100, 250),
          getRandomInt(50, 200),
        ],
        backgroundColor: [
          CURRENCIES[0].color,
          CURRENCIES[1].color,
          CURRENCIES[3].color,
          CURRENCIES[5].color,
        ],
      }],
    };
  }

  get currencies() {
    const {
      visibleCurrencies,
    } = this.props;
    return CURRENCIES.filter(currency => visibleCurrencies.includes(currency.symbol));
  }

  render() {
    const {
      onChange,
      balances,
      totalBalance,
      editMode,
      toggleEditMode,
      fiatCurrency,
      toggleOnboarding,
      showOnboarding,
    } = this.props;

    const balanceLabel = editMode === 'fiat' ? 'Hide USD' : 'Show USD';

    const chartOptions = {
      cutoutPercentage: 0,
      tooltips: {
        enabled: false,
      },
      borderWidth: 0,
    };

    return (
      <Flex auto column className={ styles.container }>
        { showOnboarding && (
          <Flex align="center" justify="center" className={ styles.overlay }>
            <Flex column align="center" className={ styles.overlayWrapper }>
              <Flex align="center" justify="center" className={ styles.overlayImage }>
                <Pie
                  height={ 87 }
                  width={ 87 }
                  data={ this.state.chartData }
                  options={ chartOptions }
                />
                <svg className={ styles.overlayImageLogo } xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81">
                  <path fill="#000000" fill-rule="evenodd" d="M41.7535931,80.0604946 L80.0602595,41.7533781 C79.1922573,62.4885483 62.4880481,79.1929538 41.7535931,80.0604946 L41.7535931,80.0604946 Z M0.060728172,41.7533781 L38.3673945,80.0604946 C17.6329395,79.1929538 0.928730348,62.4885483 0.060728172,41.7533781 L0.060728172,41.7533781 Z M20.2581628,5.28365657 L20.2581628,15.6790595 C18.8437106,15.02086 17.6319965,14.6648854 16.1925557,14.6648854 C11.4366958,14.6648854 7.56534014,18.5344006 7.56534014,23.2907879 C7.56534014,25.3422392 8.2975549,27.2904342 9.59602203,28.8331482 L0.0659144968,38.3671397 C0.658569975,24.2026488 8.47106104,11.9241163 20.2581628,5.28365657 L20.2581628,5.28365657 Z M59.8628248,39.8014111 L68.3443518,31.319313 L77.0856665,40.0602589 L59.8628248,57.2837744 L59.8628248,39.8014111 Z M11.7766359,31.319313 L20.2581628,39.8014111 L20.2581628,57.2837744 L3.03532118,40.0602589 L11.7766359,31.319313 Z M68.1109672,26.4181785 L60.6770778,18.9842017 C61.5804413,18.3283597 62.6761703,17.9653127 63.8082035,17.9653127 C66.7450778,17.9653127 69.1336161,20.3543505 69.1336161,23.2907879 C69.1336161,24.4379221 68.7668015,25.5199907 68.1109672,26.4181785 L68.1109672,26.4181785 Z M56.5624363,58.4483538 L46.6612708,58.4483538 C43.8323664,58.4483538 41.7106881,56.2276377 41.7106881,53.4977129 C41.7106881,50.767788 43.8323664,48.5470719 46.6612708,48.5470719 L48.5472071,48.5470719 L48.5472071,30.9661673 C49.1832391,31.295267 49.9031953,31.4857488 50.6688854,31.4857488 C53.2252721,31.4857488 55.297916,29.2159978 55.297916,26.8585497 L46.1897868,26.8585497 C46.1897868,26.8585497 46.1897868,26.8576068 46.1897868,26.8585497 L45.2468186,26.8585497 L45.2468186,45.2466446 L34.874169,45.2466446 L34.874169,26.8585497 L33.9312009,26.8585497 C33.9312009,26.8576068 33.9312009,26.8585497 33.9312009,26.8585497 L24.8230716,26.8585497 C24.8230716,29.2159978 26.8957156,31.4857488 29.4521022,31.4857488 C30.2173209,31.4857488 30.9377485,31.295267 31.5737805,30.9661673 L31.5737805,48.5470719 L33.4597168,48.5470719 C35.8171372,48.5470719 38.4102996,50.767788 38.4102996,53.4977129 C38.4102996,56.2276377 35.8171372,58.4483538 33.4597168,58.4483538 L23.5585513,58.4483538 L23.5585513,38.4336197 L14.1100105,29.0868097 L22.5689063,20.7291848 L57.5520814,20.7291848 L66.0109771,29.0868097 L56.5624363,38.4336197 L56.5624363,58.4483538 Z M31.4120615,7.01590941 L26.9258906,2.2411341 C30.5351011,0.984142794 34.3753389,0.227401966 38.3673945,0.0604946431 L31.4120615,7.01590941 Z M48.7339148,7.04089836 L41.7535931,0.0604946431 C45.7597933,0.227873456 49.6132326,0.98885769 53.2337588,2.25433581 L48.7339148,7.04089836 Z M23.6321028,3.55894757 L29.0801013,9.35025448 L29.074915,9.35402639 L31.3413389,11.75438 L32.7232587,10.372444 L33.4441579,9.65153634 L40.0604938,3.03465112 L47.5669917,10.5412372 L48.8046374,11.7788975 L56.498786,3.57450673 C56.5294324,3.58865141 56.5624363,3.60232461 56.5624363,3.6164693 L56.5624363,17.4287575 L23.5585513,17.4287575 L23.5585513,3.59430929 C23.5585513,3.58252205 23.6061712,3.57073481 23.6321028,3.55894757 L23.6321028,3.55894757 Z M10.8633712,23.2907879 C10.8633712,20.3543505 13.252381,17.9653127 16.1883123,17.9653127 C17.3594788,17.9653127 18.4750101,18.3491052 19.3892177,19.0388945 L11.9359975,26.4922023 C11.2466878,25.5775125 10.8633712,24.4600821 10.8633712,23.2907879 L10.8633712,23.2907879 Z M24.7235885,61.7487811 L55.3973992,61.7487811 L40.0604938,77.0863382 L24.7235885,61.7487811 Z M80.031499,38.3671397 L70.454243,28.776098 C71.7192348,27.2484717 72.4269324,25.3290374 72.4269324,23.2907879 C72.4269324,18.5344006 68.5320025,14.6648854 63.7756711,14.6648854 C62.4107248,14.6648854 61.277277,15.0010575 59.8628248,15.6055072 L59.8628248,5.31147446 C71.6499266,11.9590065 79.439315,24.2229228 80.031499,38.3671397 L80.031499,38.3671397 Z M35.345606,68.8213139 L44.7752874,68.8213139 L44.7752874,65.5208866 L35.345606,65.5208866 L35.345606,68.8213139 Z" transform="matrix(-1 0 0 1 80.412 .79)"/>
                </svg>
              </Flex>
              <div className={ styles.overlayHeader }>Create your portfolio</div>
              <div className={ styles.overlayText }>
                Enter the amount of each digital currency you own (or want to),
                then <span className={ styles.emphasis }>save</span> to start tracking.
              </div>
              <div
                role="button"
                className={ styles.overlayButton }
                onClick={ toggleOnboarding }
              >
                Got it
              </div>
            </Flex>
          </Flex>
        )}
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
          { this.currencies.map(currency => (
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
  }
}

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
              value={ value }
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
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  editMode: PropTypes.string.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
};

export default observer(EditAssets);
