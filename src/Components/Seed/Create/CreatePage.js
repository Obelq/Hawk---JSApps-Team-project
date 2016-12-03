import React, { Component } from 'react';
import CreateForm from './CreateForm';
import SeedModel from '../../../Models/SeedModel';
// import Observer from '../../models/Observer';

export default class CreatePage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            description: '',
            location: '',
            imageUrl: '',
            isDisabled: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Create</h1>
                <CreateForm
                    name={this.state.name}
                    price={this.state.price}
                    description={this.state.description}
                    location={this.state.location}
                    imageUrl={this.state.imageUrl}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                    isDisabled={this.state.isDisabled}
                />
            </div>
        );
    }

    onChangeHandler (event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;

        newState.isDisabled = this.state.name.length < 3 ||
            this.state.description.length < 3 ||
            this.state.location.length < 3 || !Number(this.state.price) ||
            this.state.imageUrl.length < 3;

        this.setState(newState);
    }

    onSubmitHandler (event) {
        event.preventDefault();
        SeedModel
            .create(
                this.state.name,
                this.state.description,
                this.state.price,
                this.state.location,
                this.state.imageUrl,
                this.onCreateSuccess);
    }

    onCreateSuccess (result) {
        // TODO: create details page
        this.context.router.push('/catalog');
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object
};
