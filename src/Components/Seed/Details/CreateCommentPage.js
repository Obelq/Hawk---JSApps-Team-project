import React, { Component } from 'react';
import CreateCommentForm from './CreateCommentForm';
import CommentModel from '../../../Models/CommentModel';

export default class CreateCommentPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            content: '',
            authorName: sessionStorage.getItem('username'),
            date: new Date()
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
       // this.onCategoriesLoadSuccess = this.onCategoriesLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Create</h1>
                <CreateCommentForm
                    content={this.state.content}
                />
            </div>
        );
    }

    onChangeHandler (event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;

        // newState.isDisabled = this.state.name.length < 3 ||
        //     this.state.description.length < 3 ||
        //     this.state.location.length < 3 || !Number(this.state.price) ||
        //     this.state.imageUrl.length < 3;

        this.setState(newState);
    }

    onSubmitHandler (event) {
        event.preventDefault();
        CommentModel
            .create(
                this.state.content,
                this.state.authorName,
                this.seedId,
                this.state.date);
    }

    componentDidMount () {
     //   CategoryModel.loadAll(this.onCategoriesLoadSuccess);
    }

    // onCategoriesLoadSuccess (response) {
    //     this.setState({
    //         categories: response,
    //         categoryId: response[0]._id
    //     });
    // }

    onCreateSuccess (response) {
        this.context.router.push('/details/' + response._id);
    }
}

CreateCommentPage.contextTypes = {
    router: React.PropTypes.object
};
