const coins = ["USD", "BTC", "ETH", "LTC"];

const defaultState = {
    uid: null,
    totalValue: 0,
    balances: [],
    lockedBalances: []
}

for (let coin of coins) {
    defaultState.balances.push({
        symbol: coin,
        balance: 0,
        percentage: 0,
        value: 0
    });
    defaultState.lockedBalances.push({
        symbol: coin,
        balance: 0
    });
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                balances: action.balancesArray,
                lockedBalances: action.lockedBalancesArray,
                totalValue: action.user.totalValue,
            };
        case 'LOGOUT':
            return {};
        case 'UPDATE_USER_BALANCES': {
            const newState = JSON.parse(JSON.stringify(state));
            for (let coin of action.balances) {
                const index = newState.balances.findIndex(x => x.symbol === coin.symbol);
                newState.balances[index] = coin;
            }
            return newState;
        }
        case 'UPDATE_USER_LOCKED_BALANCES': {
            const newState = JSON.parse(JSON.stringify(state));
            for (let coin of action.lockedBalances) {
                const index = newState.lockedBalances.findIndex(x => x.symbol === coin.symbol);
                newState.lockedBalances[index] = coin;
            }
            return newState;
        }
        default:
            return state;
    }
}

export default userReducer;