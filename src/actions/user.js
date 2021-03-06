import axios from 'axios';

export const startLogin = (userData) => {
    return async (dispatch, getStore) => {
        try {
            const { uid, displayName } = userData;
            const getRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/${uid}`);
            if (getRes.status === 200) {
                const { balancesArray, lockedBalancesArray, user } = getRes.data;
                dispatch(login(uid, balancesArray, lockedBalancesArray, user, displayName));
            } else {
                const postRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/${uid}`, { displayName });
                const { balancesArray, lockedBalancesArray, user } = postRes.data;
                dispatch(login(uid, balancesArray, lockedBalancesArray, user, displayName));
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const login = (uid, balancesArray, lockedBalancesArray, user, displayName) => ({
    type: 'LOGIN',
    uid,
    balancesArray,
    lockedBalancesArray,
    user,
    displayName
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const updateUserBalances = (balances) => ({
    type: 'UPDATE_USER_BALANCES',
    balances
});

export const updateUserLockedBalances = (lockedBalances) => ({
    type: 'UPDATE_USER_LOCKED_BALANCES',
    lockedBalances
});