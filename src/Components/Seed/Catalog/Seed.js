import React, { Component } from 'react';
import './Seed.css';
import { Link } from 'react-router';

export default class Seed extends Component {
    render () {
        if (this.props.seedCreator === sessionStorage.getItem('userId')) {
            return (
                <div className="team-box">
                    <span>Name: {this.props.name}</span>
                    <br />
                    <span>Price: {this.props.price}</span>
                    <br />
                    <span>Location: {this.props.location}</span>
                    <br />
                    <span>Description:</span>
                    <p>{this.props.description || "No description"}</p>
                    <img role="presentation" href={this.props.imageUrl} />
                    <br />
                    <span>Management</span>
                    <br />
                    <Link to={'/edit/' + this.props.seedId} className="btn btn-default">
                        Edit
                    </Link>
                    <Link to={'/delete/' + this.props.seedId} className="btn btn-danger">
                        Delete
                    </Link>
                </div>
            );
        }

        return (
            <div className="team-box">
                <span>Name: {this.props.name}</span>
                <br />
                <span>Price: {this.props.price}</span>
                <br />
                <span>Location: {this.props.location}</span>
                <br />
                <span>Description:</span>
                <p>{this.props.description || "No description"}</p>
                <img width="150" height="150" role="presentation"  href={this.props.imageUrl} />
            </div>
        );
    
    }
}