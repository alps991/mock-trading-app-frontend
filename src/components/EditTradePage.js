import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startEditTrade } from '../actions/trades';
import { history } from '../routers/AppRouter';
import TradeForm from './TradeForm';

const EditTradePage = props => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setError] = useState("");

    const handleSubmit = async (e, uid, tradeData) => {
        e.preventDefault();
        tradeData.tradeId = props.trade.tradeId;

        let err = await props.startEditTrade(uid, tradeData);

        if (!err) {
            setError("");
            setSuccess(true);
            setTimeout(() => {
                history.push('/openTrades');
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
                tradeToEdit={props.trade}
                success={success}
                errorMessage={errorMessage}
            />
        </div>
    );
}

const mapStateToProps = (state, props) => {
    const existingTrade = state.trades.openTrades.find(trade => trade.tradeId === props.match.params.tradeId);
    const trade = { ...existingTrade };
    trade.quantityToSell = trade.quantityToSell.toString();
    trade.priceToSell = trade.priceToSell.toString();
    return { trade };
};

const mapDispatchToProps = dispatch => ({
    startEditTrade: (uid, tradeData) => dispatch(startEditTrade(uid, tradeData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTradePage);