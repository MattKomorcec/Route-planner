import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { get_token } from '../../Actions/User/get_token.js';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginInfo: {
                username: '',
                password: '',
                isLogging: false,
                showError: false,
                serverError: ''
            }
        }
    }

    handleChangeEvent = (e) => {
        var newState = this.state.loginInfo;
        newState[e.target.name] = e.target.value

        this.setState({
            loginInfo: newState
        })
    }

    handleClickEvent = (e) => {
        if(this.state.loginInfo.username === '' || this.state.loginInfo.password === '') {
            this.setState({
                loginInfo: Object.assign({}, this.state.loginInfo, { showError: true })
            });
        }
        else {
            this.setState({
                loginInfo: Object.assign({}, this.state.loginInfo, { showError: false })
            });
            this.props.dispatch(get_token(this.state.loginInfo.username, this.state.loginInfo.password));
        }
    }

    componentDidMount() {
        if(this.props.token !== null) {
            browserHistory.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.token !== this.props.token) {
            browserHistory.push('/');
        }
        if(nextProps.error !== this.props.error) {
            this.setState({
                loginInfo: Object.assign({}, this.state.loginInfo, { serverError: nextProps.error.response.data.message })
            });
        }
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-component clearfix">
                    <h3>{ this.state.isLogging ? 'Logging in...' : 'Route planner' }</h3>

                    <div>
                        <input type="text" id="login-username-field" name="username" value={ this.state.loginInfo.username } onChange={ this.handleChangeEvent } placeholder="Enter your username..." />
                        <br />
                        <input type="password" id="login-password-field" name="password" value={ this.state.loginInfo.password } onChange={ this.handleChangeEvent } placeholder="Enter your password..." />
                        <br />
                        <button onClick={ this.handleClickEvent }>Login</button>
                    </div>

                    { this.state.loginInfo.showError ? 
                        <div className="error-div alert-danger">
                            <p>All fields must be filled.</p>
                        </div> 
                        : null 
                    }

                    { this.state.loginInfo.serverError !== '' ? 
                        <div className="error-div alert-danger">
                            <p>{ this.state.loginInfo.serverError }</p>
                        </div> 
                        : null 
                    }

                    <div className="col-sm-12 text-center switch-login">
                        <hr />
                        <Link to="register">Don't have an account? <span className="purple-text">Click here</span> to register.</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Token.token,
        isLogging: state.Token.isLogging,
        error: state.Token.error
    }
}

export default connect(mapStateToProps)(Login);