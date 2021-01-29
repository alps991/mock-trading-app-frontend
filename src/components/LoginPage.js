import React from 'react';
import { firebase, authUiConfig } from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
}

export default LoginPage;


//<Button onClick={() => firebase.auth().signInWithPopup(googleAuthProvider)}>Login</Button>