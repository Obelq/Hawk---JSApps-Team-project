import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel.js';


export default class DetailsPage extends Component {
    constructor(props) {
         super(props);
         this.state = {
             name: '',
             description: '',
             location: '',
             price: '',
             imageUrl: ''
         };

         this.onLoadSuccess = this.onLoadSuccess.bind(this);
     }

    render() {
          return (
              <div className="col-md-9">
                <div className="thumbnail">
                    <img className="img-responsive" src={this.state.imageUrl} alt="Seed" />
                    <div className="caption-full">
                        <h4 className="pull-right">${this.state.price}</h4>
                        <h4>{this.state.name}</h4>
                        <p>{this.state.description}</p>
                    </div>
                </div>
            </div>
        );
    }

    componentWillMount () {
        SeedModel.getSeedById(this.props.params.seedId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            name: response.name,
            location: response.location,
            description: response.description,
            price: response.price,
            imageUrl: response.imageUrl
        });
    }
}
