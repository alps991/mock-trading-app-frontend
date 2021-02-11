import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startMarketTrade, startLimitTrade } from '../actions/trades';
import { history } from '../routers/AppRouter';
import TradeForm from './TradeForm';

const NewTradeForm = props => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setError] = useState("");

    const handleSubmit = async (e, uid, tradeData) => {
        e.preventDefault();
        let err;
        if (tradeData.tradeType === "Market") {
            err = await props.startMarketTrade(uid, tradeData);
        } else if (tradeData.tradeType === "Limit") {
            err = await props.startLimitTrade(uid, tradeData);
        }
        console.log(err);
        if (!err) {
            setError("");
            setSuccess(true);
            setTimeout(() => {
                history.push('/dashboard');
            }, 3000)
        } else {
            setSuccess(false);
            setError(err.response.data);
        }
    }

    return (
        <div>
            <TradeForm
                handleSubmit={handleSubmit}
                success={success}
                errorMessage={errorMessage}
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    startMarketTrade: (uid, state) => dispatch(startMarketTrade(uid, state)),
    startLimitTrade: (uid, state) => dispatch(startLimitTrade(uid, state)),
});

export default connect(null, mapDispatchToProps)(NewTradeForm);