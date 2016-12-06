import React, { Component } from 'react';
import DetailsPage from './DetailsPage';
import CommentModel from '../../../Models/CommentModel.js';

export default class CommentView extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     commentId: ''
        // };

        this.deleteComment = this.deleteComment.bind(this);
    }

    render () {
        let _self = this;
        return (
            <div>
                <span>Author: {this.props.authorName}</span>
                <br />
                <span>Description: {this.props.content || "No description"}</span>
                <br/>
                <span>Date: {this.props.date}</span>
                <br/>
                <br />
                {
                    sessionStorage.getItem('username') === 'admin' || sessionStorage.getItem('username') === this.props.authorName ?
                        <input
                            type="button"
                            value="Edit"
                            className="btn btn-primary"
                            onClick={this.editComment}
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
                             onClick={this.deleteComment}
                         />
                         : undefined
                }
            </div>
        );
    }

    deleteComment(event){
        console.log(event.target.getAttribute('data-comment-id'));
    }

    editComment (event) {
        //event.target.getAttribute('data-comment-id');
    }

}
