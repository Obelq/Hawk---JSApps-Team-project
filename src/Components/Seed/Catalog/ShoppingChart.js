import React, { Component } from 'react';

export default class ShoppingChart extends Component {
    constructor (props) {
        super(props);

        this.state = {
        };
    }

    render () {
        let totalPrice = 0;
        let shopingChartItems = this.props.items.map((item, index) => {
            totalPrice += Number(item.price);
            return <div key={index} id={'item-' + index} className="shopping-chart-item">
                        {item.name} - {item.price}$ 
                        <span data-item-index={index} className='btn btn-danger' onClick={this.props.removeItem}>
                            [X]
                        </span>
                    </div>
        })
        .filter(x => x);

        return (
            <div className="shopping-chart-container">
                <h3>Shopping chart</h3>
                {shopingChartItems}    
                <div className="totalPrice">
                    Total cost: {totalPrice}$
                </div>
            </div>
        );
    }
}
