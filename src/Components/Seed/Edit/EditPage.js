import React, { Component } from 'react';
import EditForm from '../Edit/EditForm';
import SeedModel from '../../../Models/SeedModel';
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
            isDisabled: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onEditSuccess = this.onEditSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Edit</h1>
                <EditForm
                    name={this.state.name}
                    description={this.state.description}
                    price={this.state.price}
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
                this.onEditSuccess
            );

    }

    onEditSuccess (result) {
        this.context.router.push('/catalog');
    }

    componentDidMount () {
        SeedModel.loadDetails(this.props.params.seedId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            name: response.name,
            description: response.description,
            location: response.location,
            price: response.price,
            imageUrl: response.imageUrl,
            isDisabled: false
        });
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};
