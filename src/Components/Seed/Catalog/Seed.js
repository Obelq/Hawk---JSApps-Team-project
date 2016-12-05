import React, { Component } from 'react';
import './Seed.css';
// import { Link } from 'react-router';

export default class Seed extends Component {
    render () {
        return (
            <tr className="seed-row" onClick={this.props.onClick} data-seed-id={this.props.seedId}>
                <td>{this.props.name}</td>
                <td>{this.props.price}$</td>
                <td>{this.props.location}</td>
                <td><img src={this.props.imageUrl} alt="Snimka"/></td>
            </tr>
        );
    }
}