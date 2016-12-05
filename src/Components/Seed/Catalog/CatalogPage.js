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
            searchText: ''

        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.handleOnClickEvent = this.handleOnClickEvent.bind(this);
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
                    />
        });

        return (
            <div>
                <Form onsubmit={this.onSubmitHandler}/>
                <h1>Catalog Page</h1>
                <table className="table"><tbody>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Location</th>
                    <th>Image</th>
                </tr>
                {newestSeeds}
                </tbody></table>
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
}

 CatalogPage.contextTypes = {
     router: React.PropTypes.object
 };
