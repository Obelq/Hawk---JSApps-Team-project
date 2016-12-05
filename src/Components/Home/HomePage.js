import React, { Component } from 'react';
import SeedModel from '../../Models/SeedModel';
import HomeSeed from './HomeSeed';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestSeeds: [],
            mostLiked:[],
            promos: []
        };

        this.onLoadLatestSuccess = this.onLoadLatestSuccess.bind(this);
        this.onLoadLikedSuccess = this.onLoadLikedSuccess.bind(this);
        this.onLoadPromotionsSuccess = this.onLoadPromotionsSuccess.bind(this);
    }
    render() {
        let lastestSeeds = this.state.latestSeeds.map(function (seed, index) {
            return takeSeed(seed,index)
        });
        let liked = this.state.mostLiked.map(function (seed, index) {
            return takeSeed(seed,index)
        });
        let proms = this.state.promos.map(function (seed, index) {
            return takeSeed(seed,index)
        });
        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    <h1>3 newest</h1>
                    {lastestSeeds}
                </div>
                <div>
                    <h1>3 most rated</h1>
                    {liked}
                </div>
                <div>
                    <h1>3 promotional</h1>
                    {proms}
                </div>
            </div>
        );
    }

    onLoadLatestSuccess(response) {
        let sorted = response.sort(function (a,b) {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
        let count = validateCount(sorted);

        let curr = [];
        for (let i = 0; i < count; i++) {
            curr.push(sorted[i]);
        }
        this.setState({
            latestSeeds: curr
        });
    }

    onLoadLikedSuccess(response) {
        let sorted = response.sort(function (a,b) {
            return a.likes - b.likes;
        });

        let count = validateCount(sorted);
        let curr = [];
        for (let i = 0; i < count; i++) {
            curr.push(sorted[i]);
        }
        this.setState({
            mostLiked: curr
        });
    }

    onLoadPromotionsSuccess(response) {
        let sorted = response.filter(x => x.discount > 0).sort(function (a,b) {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
        });

        let count = validateCount(sorted);
        let curr = [];
        for (let i = 0; i < count; i++) {
            curr.push(sorted[i]);
        }
        this.setState({
            promos: curr
        });
    }

    componentWillMount() {
        SeedModel.loadPromoSeeds(this.onLoadPromotionsSuccess);
        SeedModel.loadNewestSeeds(this.onLoadLatestSuccess);
        SeedModel.loadMostLikedSeeds(this.onLoadLikedSuccess);
    }
}

function takeSeed(seed,index) {
    return <HomeSeed key={index}
                     name={seed.name}
                     price={seed.price}
                     location={seed.location}
                     imageUrl={seed.imageUrl}
                     description={seed.description}
                     seedId={seed._id}
                     seedCreator={seed._acl.creator}
    />
}

function validateCount(arr) {
    let count = 3;
    if(arr.length < 3){
        count = arr.length;
    }
    return count;
}

