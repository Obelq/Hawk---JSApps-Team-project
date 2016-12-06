import React, { Component } from 'react';
import DetailsPage from './DetailsPage';
import CommentModel from '../../../Models/CommentModel.js';
import './DetailsPage.css';
export default class CommentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmDelete: false,
            showEditForm: false,
            newCommentContent: this.props.content
        };

        this.deleteComment = this.deleteComment.bind(this);
        this.showConfirmDelete = this.showConfirmDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.editComment = this.editComment.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);

    }

    render () {
        let _self = this;
        if (this.state.showConfirmDelete) {
            return <div> <h2>Confirm delete</h2>
                <span>Author: {this.props.authorName}</span>
                <br />
                <span>Description: {this.props.content || "No description"}</span>
                <br/>
                <span>Date: {this.props.date}</span>
                <button onClick={this.deleteComment} data-comment-id={this.props.commentId} className="btn btn-danger">Delete</button>
                <button onClick={this.cancelDelete} className="btn btn-default">Cancel</button>
            </div>
        } else if (this.state.showEditForm) {
            return <div> <h2>Edit</h2>
                <form >
                    <textarea onChange={this.handleOnChangeEvent} value={this.state.newCommentContent}></textarea>
                    <button onClick={this.editComment} data-comment-id={this.props.commentId} className="btn btn-primary">Edit</button>
                    <button onClick={this.cancelEdit} className="btn btn-default">Cancel</button>
                </form>

            </div>
        }

        return (
            <div id="comment">
                <span>{this.props.authorName}: </span>
                <div>{this.props.content}</div>
                <span>Date: {this.props.date}</span>
                <br/>
                <br />
                {
                    sessionStorage.getItem('username') === 'admin' || sessionStorage.getItem('username') === this.props.authorName ?
                        <input
                            type="button"
                            value="Edit"
                            className="btn btn-primary"
                            onClick={this.showEditForm}
                            data-comment-id={this.props.commentId}
                        />
                        : undefined
                }
                {
                    sessionStorage.getItem('username') === 'admin' || sessionStorage.getItem('username') === this.props.authorName ?
                        <input
                            type="button"
                            value="Delete"
                            className="btn btn-danger"
                            data-comment-id={this.props.commentId}
                            onClick={this.showConfirmDelete}
                        />
                        : undefined
                }
            </div>
        );
    }


    showConfirmDelete(event){
        this.state.showConfirmDelete = true;
        this.props.refreshComments();
    }

    deleteComment (event) {
        let commentId = event.target.getAttribute('data-comment-id');
        this.state.showConfirmDelete = false;
        CommentModel.delete(commentId, this.props.refreshComments);
    }

    cancelDelete (event) {
        this.setState({
            showConfirmDelete: false
        });
        this.props.refreshComments();
    }

    showEditForm(event){
        this.state.showEditForm = true;
        this.props.refreshComments();
    }

    editComment (event) {
        event.preventDefault();
        let commentId = event.target.getAttribute('data-comment-id');
        this.state.showConfirmDelete = false;
        let content = this.state.newCommentContent;
        let author = sessionStorage.getItem('username');

        CommentModel.edit(commentId, content, author, this.props.seedId, this.props.refreshComments);

        this.setState({
            showEditForm: false
        });
    }

    cancelEdit (event) {
        event.preventDefault();
        this.setState({
            showEditForm: false
        });
        this.props.refreshComments();
    }

    handleOnChangeEvent (event) {
        this.setState({
            newCommentContent: event.target.value
        });
    }

}

