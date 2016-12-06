import React, { Component } from 'react';

export default class ShoppingCart extends Component {
    render () {
        let totalPrice = 0;
        let shopingCartItems = this.props.items.map((item, index) => {
            console.log(item);
            let discountPercents;
            if (item.discount < 10) {
                discountPercents = Number(`0.0${item.discount}`);
            } else {
                discountPercents = Number(`0.${item.discount}`);
            }

            let discountedPrice = item.price - (item.price * discountPercents);

            totalPrice += discountedPrice;

            return <div key={index} id={'item-' + index} className="shopping-cart-item">
                        {item.name} - {discountedPrice.toFixed(2)}$ 
                        <span data-item-index={index} className='btn btn-danger' onClick={this.props.removeItem}>
                            [X]
                        </span>
                    </div>
        })
        .filter(x => x);

        return (
            <div className="shopping-cart-container">
                <h3>Shopping cart</h3>
                {shopingCartItems}    
                <div className="totalPrice">
                    Total cost: {totalPrice.toFixed(2)}$
                </div>
            </div>
        );
    }
}
