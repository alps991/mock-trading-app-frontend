import axios from 'axios';

export const startLogin = (uid) => {
    return async (dispatch, getStore) => {
        try {
            const getRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/${uid}`);
            let balances, totalValue;
            if (getRes.status === 204) {
                const postRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/${uid}`);
                balances = postRes.data.balances;
                totalValue = postRes.data.totalValue;
            } else {
                balances = getRes.data.balances;
                totalValue = getRes.data.totalValue;
            }
            dispatch(login(uid, balances, totalValue));
        } catch (err) {
            console.log(err);
        }
    }
}

export const login = (uid, balances, totalValue) => ({
    type: 'LOGIN',
    uid,
    balances,
    totalValue
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const updateUserBalances = (balances) => ({
    type: 'UPDATE_USER_BALANCES',
    balances
});

export const startMarketTrade = (uid, { currencyToSell, currencyToBuy, quantityToSell }) => {
    return async (dispatch, getStore) => {
        try {
            const newTradeRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/trades/marketTrade`, {
                uid,
                currencyToSell,
                currencyToBuy,
                quantityToSell: parseFloat(quantityToSell)
            });

            dispatch(updateUserBalances(newTradeRes.data.newUserBalances));
        } catch (err) {
            console.log(err);
        }
    }
}