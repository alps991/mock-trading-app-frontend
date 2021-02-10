import axios from 'axios';
import { updateUserBalances, updateUserLockedBalances } from './user.js';

export const startMarketTrade = (uid, tradeData) => {
    return async (dispatch, getStore) => {
        try {
            const newTradeRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/trades/market`, {
                ...tradeData,
                quantityToSell: parseFloat(tradeData.quantityToSell),
                priceToSell: parseFloat(tradeData.priceToSell),
                uid,
            });

            dispatch(updateUserBalances(newTradeRes.data.newUserBalances));
            dispatch(addTrade(newTradeRes.data.newTrade));
        } catch (err) {
            console.log(err);
        }
    }
}

export const startLimitTrade = (uid, tradeData) => {
    return async (dispatch, getStore) => {
        try {
            const newTradeRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/trades/limit`, {
                ...tradeData,
                quantityToSell: parseFloat(tradeData.quantityToSell),
                priceToSell: parseFloat(tradeData.priceToSell),
                uid,
            });

            const { newTrade, newLockedBalances } = newTradeRes.data;
            dispatch(addTrade(newTrade));
            dispatch(updateUserLockedBalances(newLockedBalances));
        } catch (err) {
            console.log(err);
        }
    }
}

export const addTrade = newTrade => ({
    type: 'ADD_TRADE',
    newTrade,
});

export const startCancelTrade = (tradeId) => {
    return async (dispatch, getStore) => {
        try {
            const deleteTradeRes = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/trades/${tradeId}`);
            if (deleteTradeRes.status === 200) {
                dispatch(cancelTrade(tradeId));
                dispatch(updateUserLockedBalances(newTradeRes.data.newLockedBalances));
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const cancelTrade = (tradeId) => ({
    type: 'CANCEL_TRADE',
    tradeId,
});

export const startEditTrade = (uid, tradeData) => {
    return async (dispatch, getStore) => {
        try {
            const { tradeId, quantityToSell, priceToSell } = tradeData;
            const newTradeRes = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/trades/${tradeId}`, {
                ...tradeData,
                quantityToSell: parseFloat(quantityToSell),
                priceToSell: parseFloat(priceToSell),
                uid,
            });
            if (newTradeRes.status === 200) {
                dispatch(editTrade(tradeId, { quantityToSell, priceToSell }));
                dispatch(updateUserLockedBalances(newTradeRes.data.newLockedBalances));
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const editTrade = (tradeId, updates) => ({
    type: 'EDIT_TRADE',
    tradeId,
    updates,
});

export const startSetTrades = () => {
    return async (dispatch, getStore) => {
        try {
            const uid = getStore().user.uid;
            const closedTradesRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/${uid}/trades/closedTrades`);
            const openTradesRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/${uid}/trades/openTrades`);
            dispatch(setTrades({
                closedTrades: closedTradesRes.data,
                openTrades: openTradesRes.data
            }));
        } catch (err) {
            console.log(err);
        }
    }
}

export const setTrades = ({ closedTrades, openTrades }) => ({
    type: 'SET_TRADES',
    closedTrades,
    openTrades
});