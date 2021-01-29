import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/content-container.css';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { firebase } from './firebase/firebase';
import { startLogin, logout } from './actions/user';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch(startLogin(user.uid));
    if (history.location.pathname === '/login') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    history.push('/login');
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
