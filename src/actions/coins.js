import axios from 'axios';

export const getCurPrices = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/coins/curPrices`);
            const curPrices = res.data;
            dispatch(setCurPrices(curPrices));
        } catch (err) {
            console.log(err);
        }
    }
}

export const setCurPrices = (curPrices) => ({
    type: 'SET_CUR_PRICES',
    curPrices
});