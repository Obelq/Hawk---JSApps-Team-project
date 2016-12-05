import React, { Component } from 'react';
import './Seed.css';
// import { Link } from 'react-router';

export default class Seed extends Component {
    render () {
        return (
            <tr className="seed-row" >
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.name}</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.price}$</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.location}</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}><img src={this.props.imageUrl} alt="Snimka"/></td>
                <td>
                    <input
                        className="btn btn-primary"
                        type="button"
                        name="addToChart"
                        value="Add to chart"
                        data-seed-name={this.props.name}
                        data-seed-price={this.props.price}
                        onClick={this.props.addToCart}
                    />
                </td>
            </tr>
        );
    }
}