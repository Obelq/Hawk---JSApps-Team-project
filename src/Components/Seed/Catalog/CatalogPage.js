import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel';
import Seed from './Seed';
import ShoppingChart from './ShoppingChart';
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
            shoppingChartItems: []
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handleOnClickEvent = this.handleOnClickEvent.bind(this);
        this.handleAddToChartEvent = this.handleAddToChartEvent.bind(this);
        this.removeChartItem = this.removeChartItem.bind(this);
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

            if(seed.name.indexOf(_self.state.searchText)!=-1||seed.description.indexOf(_self.state.searchText)!=-1) {
                return <Seed key={index}
                             name={seed.name}
                             price={seed.price}
                             location={seed.location}
                             imageUrl={seed.imageUrl}
                             seedId={seed._id}
                             seedCreator={seed._acl.creator}
                             onClick={_self.handleOnClickEvent}
                             addToChart={_self.handleAddToChartEvent}

                />
            }
        });

        return (

            <div className="row">
                <div className="catalog-container col-sm-8">
                    <Form onsubmit={this.onSubmitHandler.bind(this)}/>
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
                    <ShoppingChart
                        items={this.state.shoppingChartItems}
                        removeItem={_self.removeChartItem}
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

    handleAddToChartEvent (event) {
        let newItem = {
            name: event.currentTarget.getAttribute('data-seed-name'),
            price: event.currentTarget.getAttribute('data-seed-price')
        }

        let shoppingChartItems = this.state.shoppingChartItems;
        shoppingChartItems.push(newItem);

        this.setState({
            shoppingChartItems: shoppingChartItems
        });
    }

    removeChartItem (event) {
        let itemToDeleteIndex = event.currentTarget.getAttribute('data-item-index');
        let shoppingChartItems = this.state.shoppingChartItems;
        shoppingChartItems.splice(itemToDeleteIndex, 1);

        this.setState({
            shoppingChartItems: shoppingChartItems
        });
    }
}

 CatalogPage.contextTypes = {
     router: React.PropTypes.object
 };
