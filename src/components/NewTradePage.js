import React from 'react';
import { connect } from 'react-redux';
import { startMarketTrade, startLimitTrade } from '../actions/trades';
import { history } from '../routers/AppRouter';
import TradeForm from './TradeForm';

const NewTradeForm = props => {

    const handleSubmit = (e, uid, tradeData) => {
        e.preventDefault();
        if (tradeData.tradeType === "Market") {
            props.startMarketTrade(uid, tradeData);
        } else if (tradeData.tradeType === "Limit") {
            props.startLimitTrade(uid, tradeData);
        }
        history.push('/dashboard');
    }

    return (
        <div>
            <TradeForm
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    startMarketTrade: (uid, state) => dispatch(startMarketTrade(uid, state)),
    startLimitTrade: (uid, state) => dispatch(startLimitTrade(uid, state)),
});

export default connect(null, mapDispatchToProps)(NewTradeForm);