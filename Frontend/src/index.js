import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Import all the necessary modules
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// Import components
import App from './App';
import Login from './Components/Login/Login';
import NoMatch from './Components/NoMatch';
import Register from './Components/Register/Register';

const logger = createLogger();

// Import reducers
import mainReducer from './Reducers/MainReducer.js';

// Create a Redux store
let store = applyMiddleware(thunk, logger)(createStore)(mainReducer);

const checkAuth = (nextState, replace) => {
  if (localStorage.getItem('userToken') === null) {
    replace({
      pathname: '/login'
    })
  }
}

// If a token exists and a user goes to /login, redirect him back to root
const checkForLogin = (nextState, replace) => {
  if (localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ App } onEnter={ checkAuth }>
        </Route>
        <Route path="login" component={ Login } onEnter={ checkForLogin } />
        <Route path="register" component={ Register } onEnter={ checkForLogin } />
        <Route path="*" component={ NoMatch } />
      </Router>
  </Provider> 
  ,document.getElementById('root')
);
