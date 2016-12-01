import React, { Component } from 'react';
import EditForm from '../Edit/EditForm';
import TeamModel from '../../../Models/TeamModel';
// import Observer from '../../models/Observer';

export default class EditPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            description: '',
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
        if (this.state.name.length < 3) {
            alert('Team name must be at least 3 characters long.');
        } else {
            TeamModel.edit(this.props.params.teamId, this.state.name, this.state.description, this.onEditSuccess);
        }
    }

    onEditSuccess (result) {
        this.context.router.push('/catalog');
    }

    componentDidMount () {
        TeamModel.loadDetails(this.props.params.teamId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            name: response.name,
            description: response.description,
            isDisabled: false
        });
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};
