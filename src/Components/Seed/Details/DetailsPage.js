import React, { Component } from 'react';
import SeedModel from '../../../Models/SeedModel.js';
import CommentModel from '../../../Models/CommentModel.js';
import CommentView from './CommentView';
import './DetailsPage.css';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: '',
            price: '',
            imageUrl: '',
            dateCreated: '',
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
        let comments =
            this.state.comments
            .sort((a, b) => {
                return b.date - a.date;
            })
            .map(function (comment, index) {
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
            <div className="col-lg-8">
                <h1>{this.state.name}</h1>
                <p className="lead">
                    Price: <a href="#">{this.state.price} лв.</a>
                </p>
                <hr/>
                    <p><span className="glyphicon glyphicon-time"></span> {this.state.dateCreated}</p>
                    <hr/>
                    <img className="img-responsive" src={this.state.imageUrl} alt=""/>
                    <hr/>
                    <p className="lead">
                        Description: <br />
                        {this.state.description}
                    </p>
                    <hr/>

                    <div className="well">
                        <h4>Leave a Comment:</h4>
                        <form onSubmit={this.onCreateCommentHandler}>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    id="new-comment-content"
                                    name="newCommentContent"
                                    value={this.props.content}
                                    onChange={this.onCommentFieldChangeHandler}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    {comments}
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

    onCreateCommentSuccess () {
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
            dateCreated: response.dateCreated,
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
