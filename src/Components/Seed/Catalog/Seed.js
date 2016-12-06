import React, { Component } from 'react';
import './Seed.css';
// import { Link } from 'react-router';

export default class Seed extends Component {
    render () {
        let discountPercents;
        if (this.props.discount < 10) {
            discountPercents = Number(`0.0${this.props.discount}`);
        } else {
            discountPercents = Number(`0.${this.props.discount}`);
        }

        let discountedPrice = this.props.price - (this.props.price * discountPercents);
        let priceTd;

        if (this.props.discount > 0) {
            priceTd = 
                <td>
                    <strike>{this.props.price.toFixed(2)}$ </strike> <strong> {discountedPrice.toFixed(2)}$</strong>
                </td>
        } else {
            priceTd =
                <td>
                    {this.props.price.toFixed(2)}$
                </td>
        }

        return (
            <tr className="seed-row" >
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.name}</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}><img src={this.props.imageUrl} alt="Snimka"/></td>
                {priceTd}
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.location}</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.discount}%</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.producer}</td>
                <td data-seed-id={this.props.seedId} onClick={this.props.onClick}>{this.props.model}</td>
                <td>
                    <input
                        className="btn btn-primary"
                        type="button"
                        name="addToChart"
                        value="Add to cart"
                        data-seed-name={this.props.name}
                        data-seed-price={this.props.price}
                        data-seed-discount={this.props.discount}
                        onClick={this.props.addToCart}
                    />
                </td>
            </tr>
        );
    }
}