import React, { Component } from 'react';

export default class DeleteForm extends Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={this.props.name}
                        onChange={this.props.onChange}
                        disabled={true}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        className="form-control"
                        type="text"
                        name="description"
                        value={this.props.description}
                        onChange={this.props.onChange}
                        disabled={true}
                    />
                </div>

                <input
                    className="btn btn-danger"
                    type="submit" value="Delete"
                    disabled={this.props.isDisabled} 
                />
            </form>
        );
    }
}
