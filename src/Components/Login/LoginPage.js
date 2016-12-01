import React, { Component } from 'react';
import LoginForm from './LoginForm';
import UserModel from '../../Models/UserModel';
import ObserverModel from '../../Models/ObserverModel';

export default class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isDisabled: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm
                    username={this.state.username}
                    password={this.state.password}
                    confirmPassword={this.state.confirmPassword}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                    isDisabled={this.state.isDisabled}
                />
            </div>
        );
    }

    componentWillMount () {
        if (sessionStorage.getItem('username')) {
            this.context.router.push('/');
        }
    }

    onChangeHandler (event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;

        this.setState(newState);
    }

    onSubmitHandler (event) {
        event.preventDefault();
        this.setState({
            isDisabled: true
        });

        UserModel.login(this.state.username, this.state.password, this.onLoginSuccess);
    }

    onLoginSuccess (result) {
        this.setState({
            isDisabled: false
        });

        if (result) {
            ObserverModel.onSessionUpdate();
            this.context.router.push('/');
        }
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object
};
