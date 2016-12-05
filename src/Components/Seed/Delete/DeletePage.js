import React, { Component } from 'react';
import DeleteForm from '../Delete/DeleteForm';
import SeedModel from '../../../Models/SeedModel';
import CategoryModel from '../../../Models/CategoryModel';
// import Observer from '../../models/Observer';

export default class EditPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            location: '',
            imageUrl: '',
            discount: 0,
            category: '',
            model: '',
            producer: ''
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onCategoryLoadSuccess = this.onCategoryLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Confrim Delete</h1>
                <DeleteForm
                    name={this.state.name}
                    description={this.state.description}
                    price={this.state.price}
                    location={this.state.location}
                    imageUrl={this.state.imageUrl}
                    discount={this.state.discount}
                    model={this.state.model}
                    producer={this.state.producer}
                    category={this.state.category}
                    onSubmit={this.onSubmitHandler}
                />
            </div>
        );
    }

    onSubmitHandler (event) {
        event.preventDefault();
        SeedModel.delete(this.props.params.seedId, this.onDeleteSuccess);
    }

    onDeleteSuccess (result) {
        this.context.router.push('/catalog');
    }

    componentDidMount () {
        SeedModel.loadDetails(this.props.params.seedId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            name: response.name,
            description: response.description,
            price: response.price,
            location: response.location,
            imageUrl: response.imageUrl,
            discount: response.discount,
            model: response.model,
            producer: response.producer
        });

        CategoryModel.getCategoryById(response.categoryId, this.onCategoryLoadSuccess);
    }

    onCategoryLoadSuccess (response) {
        this.setState({
            category: response.name
        });
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};
