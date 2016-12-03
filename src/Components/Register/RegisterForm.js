import React, { Component } from 'react';

export default class RegisterForm extends Component {
    render () {
        return (
            <div className="container pagination-centered">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title text-black">Register</h3>
                            </div>
                            <div className="panel-body">
                                <form acceptCharset="UTF-8" role="form" onSubmit={this.props.onSubmit}>
                                    <fieldset>
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
                                            className="btn btn-lg btn-success btn-block"
                                            type="submit" value="Register"
                                            disabled={this.props.isDisabled} 
                                        />
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
