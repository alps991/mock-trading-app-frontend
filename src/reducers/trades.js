const defaultState = {
    closedTrades: [],
    openTrades: [],
};

const tradesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TRADES':
            return {
                closedTrades: action.closedTrades,
                openTrades: action.openTrades
            };
        case 'ADD_TRADE':
            if (action.newTrade.type === "limit") {
                return {
                    closedTrades: [
                        ...state.closedTrades
                    ],
                    openTrades: [
                        ...state.openTrades,
                        action.newTrade
                    ]
                }
            }
            if (action.newTrade.type === "market") {
                return {
                    closedTrades: [
                        ...state.closedTrades,
                        action.newTrade
                    ],
                    openTrades: [
                        ...state.openTrades
                    ]
                }
            }
        case 'EDIT_TRADE':
            const updatedOpenTrades = state.openTrades.map(trade => {
                if (trade.tradeId === action.tradeId) {
                    return {
                        ...trade,
                        ...action.updates,
                    }
                } else {
                    return trade;
                }
            });
            return {
                ...state,
                openTrades: updatedOpenTrades
            }
        case 'CANCEL_TRADE':
            const newOpenTrades = state.openTrades.filter(trade => trade.tradeId != action.tradeId);
            return {
                ...state,
                openTrades: newOpenTrades,
            }
        default:
            return state;
    }
}

export default tradesReducer;