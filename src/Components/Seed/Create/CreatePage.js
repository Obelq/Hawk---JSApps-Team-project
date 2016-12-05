import React, { Component } from 'react';
import CreateForm from './CreateForm';
import SeedModel from '../../../Models/SeedModel';
import CategoryModel from '../../../Models/CategoryModel';

export default class CreatePage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            price: 0,
            description: '',
            location: '',
            imageUrl: '',
            categories: [],
            categoryId: '',
            discount: 0,
            producer: '',
            model: '',
            isDisabled: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
        this.onCategoriesLoadSuccess = this.onCategoriesLoadSuccess.bind(this);
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
                    categoryId={this.state.categoryId}
                    categories={this.state.categories}
                    discount={this.state.discount}
                    producer={this.state.producer}
                    model={this.state.model}
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
                this.state.price,
                this.state.description,
                this.state.imageUrl,
                this.state.location,
                this.state.categoryId,
                this.state.discount,
                this.state.producer,
                this.state.model,
                this.onCreateSuccess);
    }

    componentDidMount () {
        CategoryModel.loadAll(this.onCategoriesLoadSuccess);
    }

    onCategoriesLoadSuccess (response) {
        this.setState({
            categories: response,
            categoryId: response[0]._id
        });
    }

    onCreateSuccess (response) {
        this.context.router.push('/details/' + response._id);
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object
};
