import React, { Component } from 'react';
import CreateForm from './CreateForm';
import TeamModel from '../../../Models/TeamModel';
// import Observer from '../../models/Observer';

export default class CreatePage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            description: '',
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
                    description={this.state.description}
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

        if (event.target.name === 'name') {
            newState.isDisabled = event.target.value.length < 3;
        }

        this.setState(newState);
    }

    onSubmitHandler (event) {
        event.preventDefault();
        TeamModel.create(this.state.name, this.state.description, this.onCreateSuccess);
    }

    onCreateSuccess (result) {
        this.context.router.push('/catalog');
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object
};
