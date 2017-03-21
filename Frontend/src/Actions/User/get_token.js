import axios from 'axios';
// Querystring is used to encode username and password
import querystring from 'querystring';
import rootURL from '../config.js';

export function get_token(username, password) {
    return function(dispatch) {
        // dispatch an action that will let everyone know that the login process has started
        dispatch(get_token_started());

        // Do an AJAX call to get data
        axios.post(rootURL + '/token',
            querystring.stringify({
                'username': username,
                'password': password
            }),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function(status) {
                // Everything went ok, now let everyone know about that
                console.log(status)
                localStorage.setItem('userToken', status.data.token);
                localStorage.setItem('username', status.data.username);
                dispatch(get_token_finished(status.data.token));
            })
            .catch(function(error) {
                // There was an error, let everyone know about that
                dispatch(get_token_error(error));
            })
    }
}

function get_token_started() {
    return {
        type: 'GET_TOKEN_STARTED',
        isLogging: true
    }
}

function get_token_finished(token) {
    return {
        type: 'GET_TOKEN_SUCCESS',
        isLogging: false,
        token: token
    }
}

function get_token_error(error) {
    return {
        type: 'GET_TOKEN_ERROR',
        isLogging: false,
        error: error
    }
}