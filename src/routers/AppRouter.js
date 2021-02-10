import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AppHeader from '../components/AppHeader';
import Dashboard from '../components/Dashboard';
import LoginPage from '../components/LoginPage';
import NewTradePage from '../components/NewTradePage';
import EditTradePage from '../components/EditTradePage';
import TradeHistory from '../components/TradeHistory';
import OpenTradesPage from '../components/OpenTradesPage';
import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = props => (
    <Router history={history}>
        <div>
            <AppHeader />
            <Switch>
                <Route
                    path='/'
                    exact={true}
                    component={() => props.isAuthenticated ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
                />
                <PublicRoute path='/login' component={LoginPage} exact={true} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/newTrade' component={NewTradePage} />
                <PrivateRoute path='/tradeHistory' component={TradeHistory} />
                <PrivateRoute path='/openTrades' component={OpenTradesPage} />
                <PrivateRoute path='/editTrade/:tradeId' component={EditTradePage} />
                <PrivateRoute component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.user.uid
});

export default connect(mapStateToProps)(AppRouter);