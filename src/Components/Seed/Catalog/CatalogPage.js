import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel';
import Seed from './Seed';
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
            searchText: ""

        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }
    onSubmitHandler (event) {

        event.preventDefault();
        let searchText = event.target.children[0].value;
        console.log(searchText)
        this.setState({
            searchText: searchText
        })
    }

    render () {
        return (
            <div>
                <Form onSubmit={this.onSubmitHandler}/>
                <h1>Catalog Page</h1>
                <table><tbody>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Image</th>
                </tr>
                {
                    this.state.seeds.map(function (seed, index) {
                        return <Seed key={index}
                                    name={seed.name}
                                    price={seed.price}
                                    location={seed.location}
                                    imageUrl={seed.imageUrl}
                                    description={seed.description}
                                    seedId={seed._id}
                                    seedCreator={seed._acl.creator}
                                />
                    })
                }
                </tbody></table>
            </div>
        );
    }

    onLoadSuccess (response) {
        this.setState({
            seeds: response
        });
    }

    componentWillMount () {
        if (this.state.categoryId) {
            SeedModel.loadSeedsByCategoryId('5843d0cde6d6cc63109c4f5d', this.onLoadSuccess);
        } else {
            SeedModel.loadSeeds(this.onLoadSuccess);
        }
    }
}
