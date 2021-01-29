import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user';
import coinsReducer from '../reducers/coins';

const store = configureStore({
  reducer: {
    user: userReducer,
    coins: coinsReducer,
  },
});

store.subscribe(() => console.log(store.getState()))

export default store;