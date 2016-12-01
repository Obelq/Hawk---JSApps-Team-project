import React, { Component } from 'react';

export default class LoginForm extends Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.props.username}
                        onChange={this.props.onChange}
                        disabled={this.props.isDisabled}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.props.password}
                        onChange={this.props.onChange}
                        disabled={this.props.isDisabled} 
                        required    
                    />
                </div>

                <input
                    className="btn btn-default"
                    type="submit"
                    value="Login"
                    disabled={this.props.isDisabled}
                />
            </form>
        );
    }
}
