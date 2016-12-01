import React, { Component } from 'react';
import Greeting from './Greeting';

export default class Header extends Component {
    render () {
        return (
            <div className="jumbotron">
                <Greeting isLoggedIn={this.props.isLoggedIn} username={this.props.username} />
                <h1>Team Manager</h1>
                <div>{this.props.children}</div>
            </div>
        );
    }
}
