import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { firebase } from '../firebase/firebase';
import '../styles/header.css';

const AppHeader = props => (
    <Header as="h1" dividing>
        <div className="App-Header">

            <div className="App-Header-text">
                <Link to="/">Mock Trading App</Link>
            </div>

            <div className="App-Header-logout">
                {props.uid ? <Button onClick={() => firebase.auth().signOut()}>Logout</Button> : null}
            </div>
        </div>

    </Header>
);

const mapStateToProps = state => ({
    uid: state.user.uid
});

export default connect(mapStateToProps)(AppHeader);