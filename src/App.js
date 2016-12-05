import React, { Component } from 'react';
import Header from './Components/Shared/Header';
import { Link } from 'react-router';
import Observer from './Models/ObserverModel';
import UserModel from './Models/UserModel';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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
				<div id="wrapper"  className="active">
					<Header isLoggedIn={this.state.isLoggedIn} username={this.state.username}>
						<li>
							<Link to="/">
								Home
							</Link>
						</li>
						<li>
							<Link to="/catalog">
								Catalog
							</Link>
						</li>
						<li>
							{
							sessionStorage.getItem('username') == 'admin' ?
								<Link to="/create">
									Create
								</Link>
							:undefined
							}
						</li>
						<li>
							<Link to="/about">
								About
							</Link>
						</li>
						<li>
							<Link to="/logout" onClick={() => UserModel.logout(this.onLogout)}>
								Logout
							</Link>
						</li>
					</Header>
					<div className="page-content-wrapper container">
						<div className="page-content inset">
							<div className="row">
								<div className="col-md-12 well lead">
									{this.props.children}	
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div id="wrapper" className="active">
				<Header isLoggedIn={this.state.isLoggedIn} username={this.state.username}>
					<li>
						<Link to="/">
							Home
						</Link>
					</li>
					<li>
						<Link to="/catalog">
							Catalog
						</Link>
					</li>
					<li>
						<Link to="/about">
							About
						</Link>
					</li>
					<li>
						<Link to="/login">
							Login
						</Link>
					</li>
					<li>
						<Link to="/register">
							Register
						</Link>
					</li>
				</Header>
				<div className="page-content-wrapper container">
					<div className="page-content inset">
						<div className="row">
							<div className="col-md-12 well lead">
								{this.props.children}	
							</div>
						</div>
					</div>
				</div>
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
