import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        component={
            () => isAuthenticated ? <Component /> : <Redirect to='/login' />
        }
    />
);

const mapStateToProps = state => {
    return { isAuthenticated: !!state.user.uid }
};

export default connect(mapStateToProps)(PrivateRoute);