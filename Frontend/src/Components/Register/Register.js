import React from 'react';
import { Link } from 'react-router';

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registerInfo: {
                username: '',
                password: '',
                isRegistering: false,
                showError: false,
                serverError: ''
            }
        }
    }

    handleChangeEvent = (e) => {
        var newState = this.state.registerInfo;
        newState[e.target.name] = e.target.value

        this.setState({
            registerInfo: newState
        })
    }

    handleClickEvent = (e) => {
        if(this.state.registerInfo.username === '' || this.state.registerInfo.password === '') {
            this.setState({
                loginInfo: Object.assign({}, this.state.registerInfo, { showError: true })
            });
        }
        else {
            this.setState({
                loginInfo: Object.assign({}, this.state.registerInfo, { showError: false })
            });
            // this.props.dispatch(get_token(this.state.registerInfo.username, this.state.registerInfo.password));
        }
    }

    render() {
        return (
            <div className="register-container">
                <div className="register-component clearfix">
                    <h3>{ this.state.isLogging ? 'Logging in...' : 'Route planner' }</h3>

                    <div>
                        <input type="text" id="register-username-field" name="username" value={ this.state.registerInfo.username } onChange={ this.handleChangeEvent } placeholder="Enter your username..." />
                        <br />
                        <input type="password" id="register-password-field" name="password" value={ this.state.registerInfo.password } onChange={ this.handleChangeEvent } placeholder="Enter your password..." />
                        <br />
                        <input type="password" id="register-password-field" name="password" value={ this.state.registerInfo.password } onChange={ this.handleChangeEvent } placeholder="Enter your password again..." />
                        <br />
                        <button onClick={ this.handleClickEvent }>Register</button>
                    </div>

                    { this.state.registerInfo.showError ? 
                        <div className="error-div alert-danger">
                            <p>All fields must be filled.</p>
                        </div> 
                        : null 
                    }

                    { this.state.registerInfo.serverError !== '' ? 
                        <div className="error-div alert-danger">
                            <p>{ this.state.registerInfo.serverError }</p>
                        </div> 
                        : null 
                    }

                    <div className="col-sm-12 text-center switch-login">
                        <hr />
                        <Link to="login">Already have an account? <span className="purple-text">Click here</span> to log in.</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;