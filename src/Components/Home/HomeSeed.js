import React, { Component } from 'react';
import './HomeSeed.css';

export default class HomeSeed extends Component {
    constructor (props) {
        super(props);

        this.loadSeedDetails = this.loadSeedDetails.bind(this);
    }

    render () {
        let discountPercents;
        if (this.props.discount < 10) {
            discountPercents = Number(`0.0${this.props.discount}`);
        } else {
            discountPercents = Number(`0.${this.props.discount}`);
        }

        let discountedPrice = this.props.price - (this.props.price * discountPercents);

        let priceLi;
        if (this.props.discount > 0) {
            priceLi =
                <li className="list-group-item">
                    <strike>{this.props.price}$  </strike>
                    <span className="amount-span">{discountedPrice}$  Amount: 1kg</span>
                </li>
        } else {
            priceLi =
                <li className="list-group-item">
                    <span className="amount-span">{discountedPrice}$  Amount: 1kg</span>
                </li>
        }

        return (
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="ccm-core-commerce-add-to-cart">
                        <form method="post" id="ccm-core-commerce-add-to-cart-form-7-2017" action="/index.php/cart/update/">
                            <input type="hidden" name="rcID" value="979" />
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="image-homepage">
                                        <img src={this.props.imageUrl} className="img-responsive"/>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <h4><a data-seed-id={this.props.seedId} onClick={this.loadSeedDetails}>{this.props.name}</a></h4>
                                    </li>
                                    {priceLi}
                                    <li className="list-group-item">
                                        <input onClick={this.props.addToCart}
                                               id="submit"
                                               className="btn-block btn btn-default"
                                               type="button"
                                               value="Buy!"
                                               name="submit"
                                               data-seed-name={this.props.name}
                                               data-seed-price={this.props.price}
                                               data-seed-discount={this.props.discount}
                                        />
                                    </li>
                                </ul>
                            <input type="hidden" name="productID" id="productID" value="7" className="ccm-input-hidden" />
                            <input type="hidden" name="method" value="JSON" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    loadSeedDetails (event) {
        let seedId = event.target.getAttribute('data-seed-id');
        this.context.router.push('/details/' + seedId);
    }
}

HomeSeed.contextTypes = {
    router: React.PropTypes.object
};
