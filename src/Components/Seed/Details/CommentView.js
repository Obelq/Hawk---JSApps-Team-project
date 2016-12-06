import React, { Component } from 'react';
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
        if (this.state.showConfirmDelete) {
            return this.renderConfirmDelete();
        } else if (this.state.showEditForm) {
            return this.renderEditCommentForm();
        } else {
            return this.renderComment();
        }
    }

    renderEditCommentForm () {
        return (
            <div className="media comment-container">
                <a className="pull-left" href="#">
                    <img className="media-object" src="http://placehold.it/64x64" alt=""/>
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.authorName}
                        <small>{this.props.date}</small>
                    </h4>
                    <textarea
                        className="edit-comment-input-filed"
                        onChange={this.handleOnChangeEvent}
                        value={this.state.newCommentContent}
                        cols="60"
                        >
                    </textarea>
                    <div className="comment-actions">
                        <button onClick={this.editComment} data-comment-id={this.props.commentId} className="btn btn-primary">
                            Edit
                        </button>
                        <button onClick={this.cancelEdit} className="btn btn-default">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    renderConfirmDelete () {
        return (
            <div className="media comment-container">
                <a className="pull-left" href="#">
                    <img className="media-object" src="http://placehold.it/64x64" alt=""/>
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.authorName}
                        <small>{this.props.date}</small>
                    </h4>
                    <span className="confirm-delete-text">Confirm delete</span>
                    <div className="comment-actions">
                        <button onClick={this.deleteComment}
                               data-comment-id={this.props.commentId}
                               className="btn btn-danger"
                        >Delete</button>
                        <button onClick={this.cancelDelete} className="btn btn-default">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    renderComment () {
        let adminActions;
        if (sessionStorage.getItem('username') === 'admin') {
            adminActions = (
                <div className="comment-admin-actions">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.showEditForm}
                    >Edit</button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.showConfirmDelete}
                    >Delete</button>
                </div>
            );
        }

        return (
            <div className="media">
                <a className="pull-left" href="#">
                    <img className="media-object" src="http://placehold.it/64x64" alt=""/>
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.authorName}
                        <small>{this.props.date}</small>
                    </h4>
                    {this.props.content}
                    {adminActions}
                </div>
            </div>
        );
    }

    showConfirmDelete(){
        this.state.showConfirmDelete = true;
        this.props.refreshComments();
    }

    deleteComment (event) {
        let commentId = event.target.getAttribute('data-comment-id');
        this.state.showConfirmDelete = false;
        CommentModel.delete(commentId, this.props.refreshComments);
    }

    cancelDelete () {
        this.setState({
            showConfirmDelete: false
        });
        this.props.refreshComments();
    }

    showEditForm(){
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

