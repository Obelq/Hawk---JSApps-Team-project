import React, { Component } from 'react';

export default class RegisterForm extends Component {
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
                
                <div className="form-group">
                    <label>Confirm password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={this.props.confirmPassword}
                        onChange={this.props.onChange}
                        disabled={this.props.isDisabled}
                        required
                    />
                </div>

                <input
                    className="btn btn-default"
                    type="submit" value="Register"
                    disabled={this.props.isDisabled} 
                />
            </form>
        );
    }
}
