import React, { Component } from 'react';

export default class ShoppingCart extends Component {
    render () {
        let totalPrice = 0;
        let shopingCartItems = this.props.items.map((item, index) => {
            totalPrice += Number(item.price);
            return <div key={index} id={'item-' + index} className="shopping-cart-item">
                        {item.name} - {item.price}$ 
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
                    Total cost: {totalPrice}$
                </div>
            </div>
        );
    }
}
