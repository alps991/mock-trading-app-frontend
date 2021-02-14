import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';
import store from './store/store';
import { startLogin, logout } from './actions/user';
import { startSetTrades } from './actions/trades';
import { getCurPrices } from './actions/coins';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-less/semantic.less'
import './styles/index.css';
import './styles/content-container.css';
import './styles/loader.css';

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch(startLogin(user));
    await store.dispatch(startSetTrades());
    await store.dispatch(getCurPrices());
    ReactDOM.render(jsx, document.getElementById('root'));
    if (history.location.pathname === '/login') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    ReactDOM.render(jsx, document.getElementById('root'));
    history.push('/login');
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
