import React, { Component } from 'react';
import SeedModel from '../../Models/SeedModel';
import HomeSeed from './HomeSeed';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestSeeds: [],
            promos: []
        };

        this.onLoadLatestSuccess = this.onLoadLatestSuccess.bind(this);
        this.onLoadPromotionsSuccess = this.onLoadPromotionsSuccess.bind(this);
        this.handleOnClickEvent = this.handleOnClickEvent.bind(this);
    }
    render() {
        let _self = this;
        let lastestSeeds = this.state.latestSeeds.map(function (seed, index) {
             return  _self.takeSeed(seed,index)
        });
        let proms = this.state.promos.map(function (seed, index) {
            return  _self.takeSeed(seed,index)
        });
        return (
            <div className="row">
                <h1>Home Page</h1>
                    <div>
                    <h1>Just added</h1>
                    {lastestSeeds}
                </div>
                <div>
                    <h1>Latest promotions</h1>
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
    }

    handleOnClickEvent (event) {
        let seedId = event.currentTarget.getAttribute('data-seed-id');
        this.context.router.push('/details/' + seedId);
    }

    takeSeed (seed, index) {
        let _self = this;
        return <HomeSeed key={index}
            name={seed.name}
            price={seed.price}
            location={seed.location}
            imageUrl={seed.imageUrl}
            description={Cut(seed.description)}
            seedId={seed._id}
            onClick={_self.handleOnClickEvent}
            seedCreator={seed._acl.creator}
        />
    }
}

function validateCount(arr) {
    let count = 3;
    if(arr.length < 3){
        count = arr.length;
    }
    return count;
}

function Cut(text,maxLength = 100) {
    if (text.Length < maxLength)
    {
        return text;
    }
    return text.substr(0, maxLength) + "...";
}

HomePage.contextTypes = {
    router: React.PropTypes.object
};
