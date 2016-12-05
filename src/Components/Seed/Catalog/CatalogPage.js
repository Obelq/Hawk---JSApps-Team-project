import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel';
import Seed from './Seed';
import ShoppingCart from './ShoppingCart';
let Form = React.createClass({
    render: function () {
        return <form onSubmit={this.props.onsubmit}>
            <input type="text" placeholder="Search..."/>
            <input type="submit" defaultValue="Submit" />
        </form>
    }
});

export default class CatalogPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            seeds: [],
            categoryId: '',
            searchText: '',
            shoppingCartItems: []
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handleOnClickEvent = this.handleOnClickEvent.bind(this);
        this.handleAddToCartEvent = this.handleAddToCartEvent.bind(this);
        this.removeCartItem = this.removeCartItem.bind(this);
    }


    onSubmitHandler (event) {

        event.preventDefault();

        let searchText = event.target.children[0].value;
        this.setState({
            searchText: searchText
        })
    }

    render () {
        let _self = this;
        let newestSeeds = this.state.seeds.map(function (seed, index) {
            return <Seed key={index}
                        name={seed.name}
                        price={seed.price}
                        location={seed.location}
                        imageUrl={seed.imageUrl}
                        seedId={seed._id}
                        seedCreator={seed._acl.creator}
                        onClick={_self.handleOnClickEvent}
                        addToCart={_self.handleAddToCartEvent}
                    />
        });

        return (
            <div className="row">
                <div className="catalog-container col-sm-8">
                    <Form onsubmit={this.onSubmitHandler}/>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newestSeeds}
                        </tbody>
                    </table>
                    <ShoppingCart 
                        items={this.state.shoppingCartItems}
                        removeItem={_self.removeCartItem}
                    />
                </div>
            </div>
        );
    }

    onLoadSuccess (response) {
        this.setState({
            seeds: response
        });
    }

    handleOnClickEvent (event) {
        let seedId = event.currentTarget.getAttribute('data-seed-id');
        this.context.router.push('/details/' + seedId);
    }

    componentDidMount () {
        if (this.state.categoryId) {
            SeedModel.loadSeedsByCategoryId(this.state.categoryId, this.onLoadSuccess);
        } else {
            SeedModel.loadSeeds(this.onLoadSuccess);
        }
    }

    handleAddToCartEvent (event) {
        let newItem = {
            name: event.currentTarget.getAttribute('data-seed-name'),
            price: event.currentTarget.getAttribute('data-seed-price')
        }
        
        let shoppingCartItems = this.state.shoppingCartItems;
        shoppingCartItems.push(newItem);

        this.setState({
            shoppingCartItems: shoppingCartItems
        });
    }

    removeCartItem (event) {
        let itemToDeleteIndex = event.currentTarget.getAttribute('data-item-index');
        let shoppingCartItems = this.state.shoppingCartItems;
        shoppingCartItems.splice(itemToDeleteIndex, 1);

        this.setState({
            shoppingCartItems: shoppingCartItems
        });
    }
}

 CatalogPage.contextTypes = {
     router: React.PropTypes.object
 };
