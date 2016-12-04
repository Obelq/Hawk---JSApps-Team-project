import React, { Component } from 'react';
import EditForm from '../Edit/EditForm';
import SeedModel from '../../../Models/SeedModel';
import CategoryModel from '../../../Models/CategoryModel';
// import Observer from '../../models/Observer';

export default class EditPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: 0,
            location: '',
            imageUrl: '',
            discount: 0,
            category: '',
            isDisabled: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onEditSuccess = this.onEditSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onCategoryLoadSuccess = this.onCategoryLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Edit</h1>
                <EditForm
                    name={this.state.name}
                    price={this.state.price}
                    description={this.state.description}
                    location={this.state.location}
                    imageUrl={this.state.imageUrl}
                    category={this.state.category}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                    discount={this.state.discount}
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
        this.setState({
            isDisabled: true
        });

        SeedModel
            .edit(
                this.props.params.seedId,
                this.state.name,
                this.state.description,
                this.state.price,
                this.state.location,
                this.state.imageUrl,
                this.discount,
                this.categoryId,
                this.onEditSuccess
            );

    }

    onEditSuccess (result) {
        this.context.router.push('/catalog');
    }

    componentWillMount () {
        SeedModel.loadDetails(this.props.params.seedId, this.onLoadSuccess);
    }

    onCategoryLoadSuccess (response) {
        this.setState({
            category: response.name
        });
    }

    onLoadSuccess (response) {
        this.setState({
            name: response.name,
            description: response.description,
            location: response.location,
            price: response.price,
            imageUrl: response.imageUrl,
            discount: response.discount,
            isDisabled: false
        });

        CategoryModel.getCategoryById(response.categoryId, this.onCategoryLoadSuccess);
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};
