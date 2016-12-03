import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import UserModel from '../../Models/UserModel';
import ObserverModel from '../../Models/ObserverModel';

export default class RegisterPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            isDisabled: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onRegisterSuccess = this.onRegisterSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <RegisterForm
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

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                isDisabled: false
            });
            alert('Password don\'t match!');
        } else {
            UserModel.register(this.state.username, this.state.password, this.onRegisterSuccess);
        }
    }

    onRegisterSuccess (result) {
        this.setState({
            isDisabled: false
        });

        if (result) {
            ObserverModel.onSessionUpdate();
            this.context.router.push('/');
        }
    }
}

RegisterPage.contextTypes = {
    router: React.PropTypes.object
};
