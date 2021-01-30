import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AppHeader from '../components/AppHeader';
import Dashboard from '../components/Dashboard';
import LoginPage from '../components/LoginPage';
import NewTradeForm from '../components/NewTradeForm';
import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <AppHeader />
            <Switch>
                <PublicRoute path='/login' component={LoginPage} exact={true} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/newTrade' component={NewTradeForm} />
                <PrivateRoute component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;