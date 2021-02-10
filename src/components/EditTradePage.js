import React from 'react';
import { connect } from 'react-redux';
import { startEditTrade } from '../actions/trades';
import { history } from '../routers/AppRouter';
import TradeForm from './TradeForm';

const EditTradePage = props => {

    const handleSubmit = (e, uid, tradeData) => {
        e.preventDefault();
        tradeData.tradeId = props.trade.tradeId;
        props.startEditTrade(uid, tradeData);
        history.push('/openTrades');
    }

    return (
        <div>
            <TradeForm
                handleSubmit={handleSubmit}
                tradeToEdit={props.trade}
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