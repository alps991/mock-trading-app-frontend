import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        component={
            () => isAuthenticated ? <Redirect to='/dashboard' /> : <Component />
        }
    />
);

const mapStateToProps = state => {
    return { isAuthenticated: !!state.user.uid }
};

export default connect(mapStateToProps)(PublicRoute);