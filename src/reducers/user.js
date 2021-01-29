const defaultState = {
    uid: null,
    totalValue: 0,
    balances: [{
        symbol: "USD",
        balance: 0,
        percentage: 0,
        value: 0
    }, {
        symbol: "BTC",
        balance: 0,
        percentage: 0,
        value: 0
    }, {
        symbol: "ETH",
        balance: 0,
        percentage: 0,
        value: 0
    }, {
        symbol: "LTC",
        balance: 0,
        percentage: 0,
        value: 0
    }]
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                balances: action.balances,
                totalValue: action.totalValue,
            };
        case 'LOGOUT':
            return {};
        case 'UPDATE_USER_BALANCES':
            const newState = JSON.parse(JSON.stringify(state));
            for (let coin of action.balances) {
                const index = newState.balances.findIndex(x => x.symbol === coin.symbol);
                newState.balances[index] = coin;
            }
            return newState;
        default:
            return state;
    }
}

export default userReducer;