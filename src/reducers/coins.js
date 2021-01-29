const defaultState = {
    curPrices: []
}

const coinsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CUR_PRICES':
            return {
                curPrices: action.curPrices
            };
        default:
            return state;
    }
}

export default coinsReducer;