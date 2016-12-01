import React, { Component } from 'react';
import Header from './Components/Shared/Header';
import { Link } from 'react-router';
import Observer from './Models/ObserverModel';
import UserModel from './Models/UserModel';

export default class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			username: ''
		};

		this.onSessionUpdate = this.onSessionUpdate.bind(this);
		this.checkUserCredentials = this.checkUserCredentials.bind(this);
		this.onLogout = this.onLogout.bind(this);
	}

	render() {
		if (this.state.isLoggedIn) {
			return (
				<div className="container">
					<Header isLoggedIn={this.state.isLoggedIn} username={this.state.username}>
						<Link to="/" className="btn btn-default">Home</Link>
						<Link to="/catalog" className="btn btn-default">Catalog</Link>
						<Link to="/create" className="btn btn-default">Create</Link>
						<Link to="/about" className="btn btn-default">About</Link>
						<Link to="/logout" className="btn btn-default" onClick={() => UserModel.logout(this.onLogout)}>Logout</Link>
					</Header>
					{this.props.children}
				</div>
			);
		}

		return (
			<div className="container">
				<Header isLoggedIn={this.state.isLoggedIn} username={this.state.username}>
					<Link to="/" className="btn btn-default">Home</Link>
					<Link to="/about" className="btn btn-default">About</Link>
					<Link to="/login" className="btn btn-default">Login</Link>
					<Link to="/register" className="btn btn-default">Register</Link>
				</Header>
				{this.props.children}
			</div>
		);
	}

	componentDidMount () {
		Observer.onSessionUpdate = this.onSessionUpdate;
		this.checkUserCredentials();
	}

	onLogout () {
		this.checkUserCredentials();
	}

	onSessionUpdate () {
		this.checkUserCredentials();
	}

	checkUserCredentials () {
		let username = sessionStorage.getItem('username');
		if (!username) {
			this.setState({
				isLoggedIn: false,
				username: username
			});
		} else {
			this.setState({
				isLoggedIn: true,
				username: username
			});
		}
	}
}
