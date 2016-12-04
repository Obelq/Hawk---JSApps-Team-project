import React, { Component } from 'react';
import SeedModel from '../../Models/SeedModel';
import HomeSeed from './HomeSeed';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestSeeds: []
        };

        this.onLoadLatestSuccess = this.onLoadLatestSuccess.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                    <div>
                        <h1>3 newest</h1>
                    {
                        this.state.latestSeeds.map(function (seed, index) {
                            return <HomeSeed key={index}
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
                <div>
                    <h1>3 most rated</h1>
                    {

                    }
                </div>
                <div>
                    <h1>3 promotional</h1>
                    {

                    }
                </div>
            </div>
        );
    }

    onLoadLatestSuccess(response) {
        let sorted = response.sort(function (a,b) {
            return b.dateCrated - a.dateCrated
        });

        let curr = [];
        for (let i = 0; i < 3; i++) {
            curr.push(sorted[i]);
        }
        console.dir(curr);
        this.setState({
            latestSeeds: curr
        });
    }

    componentWillMount() {
        SeedModel.loadNewestSeeds(this.onLoadLatestSuccess);
    }
}
