import React, { Component } from 'react';
import './Team.css';
import { Link } from 'react-router';

export default class Team extends Component {
    render () {
        if (this.props.teamCreator === sessionStorage.getItem('userId')) {
            return (
                <div className="team-box">
                    <span>Name: {this.props.name}</span>
                    <br />
                    <span>Description:</span>
                    <p>{this.props.description || "No description"}</p>
                    <span>Management</span>
                    <br />
                    <Link to={'/edit/' + this.props.teamId} className="btn btn-default">
                        Edit
                    </Link>
                    <Link to={'/delete/' + this.props.teamId} className="btn btn-danger">
                        Delete
                    </Link>
                </div>
            );
        }

        return (
            <div className="team-box">
                <span>Name: {this.props.name}</span>
                <br />
                <span>Description:</span>
                <p>{this.props.description || "No description"}</p>
                <span>Management</span>
            </div>
        );
    
    }
}