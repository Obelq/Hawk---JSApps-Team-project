import React, { Component } from 'react';
import './HomeSeed.css';

export default class HomeSeed extends Component {
    render () {
        return (
            <div onClick={this.props.onClick} className="team-box" data-seed-id={this.props.seedId}>
                <span>Name: <h1>{this.props.name}</h1></span>
                <br />
                <span>Price: {this.props.price}</span>
                <br />
                <span>Location: {this.props.location}</span>
                <br />
                <span>Description:</span>
                <p>{this.props.description || "No description"}</p>
                <img src={this.props.imageUrl} alt="Snimka"/>
            </div>
        );
    
    }
}
