import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel.js';
import CommentModel from '../../../Models/CommentModel.js';
import CommentView from './CommentView';


export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: '',
            price: '',
            imageUrl: '',
            comments: [],
            newCommentContent: ''
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onLoadComments = this.onLoadComments.bind(this);
        this.onCreateCommentHandler = this.onCreateCommentHandler.bind(this);
        this.onCommentFieldChangeHandler = this.onCommentFieldChangeHandler.bind(this);
        this.onCreateCommentSuccess =   this.onCreateCommentSuccess.bind(this);
    }

    render() {
        let _self = this;
        let comments = this.state.comments.map(function (comment, index) {
            return <CommentView key={index}
                                commentId={comment._id}
                                authorName={comment.authorName}
                                content={comment.content}
                                date={comment.date}
                                seedId={_self.props.params.seedId}
                                refreshComments={_self.onCreateCommentSuccess}
            />
        });

        return (
            <div className="row">
                <div className="thumbnail">
                    <img className="img-responsive" src={this.state.imageUrl} alt="Seed" />
                    <div className="caption-full">
                        <h4 className="pull-right">${this.state.price}</h4>
                        <h1>{this.state.name}</h1>
                        <p>{this.state.description}</p>
                        {
                            sessionStorage.getItem('username') === 'admin' ?
                                <input
                                    type="button"
                                    value="Edit"
                                    className="btn btn-primary"
                                    onClick={() => this.context.router.push('/edit/' + this.state.seedId)}
                                />
                                :undefined}

                        {
                            sessionStorage.getItem('username') === 'admin'?
                                <input
                                    type="button"
                                    value="Delete"
                                    className="btn btn-danger"
                                    onClick={() => this.context.router.push('/delete/' + this.state.seedId)}
                                />
                                :undefined
                        }
                    </div>
                </div>
                <div className="createComment">
                    <h1>Comments</h1>
                    {comments.length > 0 ? comments: 'No comments'}
                </div>
                <form onSubmit={this.onCreateCommentHandler}>
                    <div className="form-group">
                        <h1>Create new comment</h1>
                        <label>Content</label>
                        <input
                            id="new-comment-content"
                            className="form-control"
                            type="text"
                            name="newCommentContent"
                            value={this.props.content}
                            onChange={this.onCommentFieldChangeHandler}
                            required
                        />
                    </div>
                    <input
                        className="btn btn-default"
                        type="submit" value="Create"
                        disabled={this.props.isDisabled}
                    />
                </form>
            </div>
        );
    }

    onCreateCommentHandler (event) {
        event.preventDefault();

        let content = this.state.newCommentContent;
        let authorName = sessionStorage.getItem('username') || 'anonymous';

        CommentModel
            .create(
                content,
                authorName,
                this.props.params.seedId,
                this.onCreateCommentSuccess
            );
    }

    onCommentFieldChangeHandler (event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onCreateCommentSuccess (response) {
        CommentModel.loadComments(this.onLoadComments);
        document.getElementById('new-comment-content').value = '';
    }

    componentWillMount () {
        SeedModel.getSeedById(this.props.params.seedId, this.onLoadSuccess);
    }

    onLoadSuccess (response) {
        this.setState({
            seedId: response._id,
            name: response.name,
            location: response.location,
            description: response.description,
            price: response.price,
            imageUrl: response.imageUrl
        });

        CommentModel.loadComments(this.onLoadComments);
    }

    onLoadComments(response) {
        let sorted = response.filter(c => c.seedId === this.state.seedId).sort(function (a,b) {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
        let curr = [];
        for (let i = 0; i < sorted.length; i++) {
            curr.push(sorted[i]);
        }

        this.setState({
            comments: curr
        });
    }
}

DetailsPage.contextTypes = {
    router: React.PropTypes.object
};
