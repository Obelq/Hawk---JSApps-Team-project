import React, { Component } from 'react';

export default class CreateCommentForm extends Component {
    render () {
        // let categoriesOptions = this.props.categories.map((category, index) => {
        //     return <option value={category._id} key={category._id}>{category.name}</option>
        // });

        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>Content</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="content"
                        value={this.props.content}
                        onChange={this.props.onChange}
                        required 
                    />
                </div>
                <input
                    className="btn btn-default"
                    type="submit" value="Create"
                    disabled={this.props.isDisabled} 
                />
            </form>
        );
    }
}
