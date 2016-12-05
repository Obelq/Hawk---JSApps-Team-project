import React, { Component } from 'react';

export default class CommentView extends Component {
    render () {
        return (
            <div>
                <span>Author: {this.props.authorName}</span>
                <br />
                <span>Description: {this.props.content || "No description"}</span>
                <br/>
                <span>Date: {this.props.date}</span>
                <br/>
                <br />
            </div>
        );
    }
}
