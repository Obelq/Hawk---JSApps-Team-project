import React, { Component } from 'react';
import DeleteForm from '../Delete/DeleteForm';
import TeamModel from '../../../Models/TeamModel';
// import Observer from '../../models/Observer';

export default class EditPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Confrim Delete</h1>
                <DeleteForm
                    name={this.state.name}
                    description={this.state.description}
                    onSubmit={this.onSubmitHandler}
                />
            </div>
        );
    }

    onSubmitHandler (event) {
        event.preventDefault();
        TeamModel.delete(this.props.params.teamId, this.onDeleteSuccess);
    }

    onDeleteSuccess (result) {
        this.context.router.push('/catalog');
    }

    componentDidMount () {
        TeamModel.loadDetails(this.props.params.teamId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            name: response.name,
            description: response.description
        });
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};
