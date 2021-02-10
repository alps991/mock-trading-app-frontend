import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user';
import coinsReducer from '../reducers/coins';
import tradesReducer from '../reducers/trades';

const store = configureStore({
  reducer: {
    user: userReducer,
    coins: coinsReducer,
    trades: tradesReducer,
  },
});

store.subscribe(() => console.log(store.getState()))

export default store;