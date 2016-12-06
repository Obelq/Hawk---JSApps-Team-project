import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel';
import HomeSeed from '../../Home/HomeSeed';
import ShoppingCart from './ShoppingCart';
let Form = React.createClass({
    render: function () {
        return <form onSubmit={this.props.onsubmit}>
            <input type="text" placeholder="Search..."/>
            <span> Search by: </span>
            <select>
                <option value="name">Name&Description</option>
                <option value="location">Location</option>
                <option value="producer">Producer</option>
                <option value="model">Model</option>
            </select>
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
            searchBy: '',
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
        let searchBy = event.target.children[2].value;
        this.setState({
            searchText: searchText,
            searchBy: searchBy
        });
    }
    searchParams (criteria, self, seed) {
         if (criteria === "location") {
            return (seed.location.indexOf(self.state.searchText) !== -1);
        } else if (criteria === "producer") {
            return (seed.producer.indexOf(self.state.searchText) !== -1);
        } else if (criteria === "model") {
            return (seed.model.indexOf(self.state.searchText) !== -1);
        } else {
            return (seed.name.indexOf(self.state.searchText) !== -1 || seed.description.indexOf(self.state.searchText) !== -1);
        }
    }

    render () {
        let _self = this;
        let newestSeeds = this.state.seeds.map(function (seed, index) {
            if (_self.searchParams(_self.state.searchBy, _self, seed)) {
                return <HomeSeed key={index}
                             name={seed.name}
                             price={seed.price}
                             location={seed.location}
                             discount={seed.discount}
                             producer={seed.producer}
                             model={seed.model}
                             imageUrl={seed.imageUrl}
                             seedId={seed._id}
                             seedCreator={seed._acl.creator}
                             onClick={_self.handleOnClickEvent}
                             addToCart={_self.handleAddToCartEvent}

                />
            }
        });

        return (


            <div className="yani-row">
                <ShoppingCart
                    items={this.state.shoppingCartItems}
                    removeItem={_self.removeCartItem}
                />
                <Form onsubmit={this.onSubmitHandler.bind(this)}/>

                <div className="catalog-items-container">
                    {newestSeeds}
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
            price: event.currentTarget.getAttribute('data-seed-price'),
            discount: event.currentTarget.getAttribute('data-seed-discount')
        };

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
