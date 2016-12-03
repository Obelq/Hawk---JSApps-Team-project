import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel';
import Seed from './Seed';

export default class CatalogPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            seeds: []
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Catalog Page</h1>
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
            </div>
        );
    }

    onLoadSuccess (response) {
        this.setState({
            seeds: response
        });
    }

    componentWillMount () {
        SeedModel.loadSeeds(this.onLoadSuccess);
    }
}
