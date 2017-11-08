import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPrices} from '../Application/actions/ApplicationActions';

class TestComponent extends React.Component {
    constructor(props) {
        console.log("constructor fired");
        
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount fired");
        this.props.getPrices();
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps fired");
    }

    render() {
        console.log("render fired")
        const marketDataObj = this.props.prices.marketData;
        return(
            marketDataObj ? Object.keys(marketDataObj).map((key) => {
               <div>{marketDataObj[key]}</div>
            })
            : null
        );
    }
}

const mapStateToProps = (state) => {
    return {
        prices: state.prices
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getPrices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent) 