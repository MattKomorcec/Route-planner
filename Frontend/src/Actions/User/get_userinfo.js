import axios from 'axios';
import querystring from 'querystring';
import rootURL from '../config.js';

export function get_userinfo() {
    return function(dispatch) {
        // dispatch an action that will let everyone know that the process has started
        dispatch(get_userinfo_started());

        // Do an AJAX call to get data
        axios.post(rootURL + '/user',
            querystring.stringify({
                'username': localStorage.getItem('username')
            }), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': localStorage.getItem('userToken')
                }
            })
            .then(function(info) {
                // Everything went ok, now let everyone know about that
                dispatch(get_userinfo_success(info));
            })
            .catch(function(error) {
                // There was an error, let everyone know about that
                dispatch(get_userinfo_error(error));
            })
    }
}

function get_userinfo_started() {
    return {
        type: 'GET_USERINFO_STARTED',
        gettingUserInfo: true
    }
}

function get_userinfo_success(info) {
    return {
        type: 'GET_USERINFO_SUCCESS',
        gettingUserInfo: false,
        userInfo: info
    }
}

function get_userinfo_error(error) {
    return {
        type: 'GET_USERINFO_ERROR',
        gettingUserInfo: false,
        userInfoError: error
    }
}