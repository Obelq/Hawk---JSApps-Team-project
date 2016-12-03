import React, { Component } from 'react';

export default class EditForm extends Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.props.name}
                        onChange={this.props.onChange}
                        required 
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
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        className="form-control"
                        type="text"
                        name="location"
                        value={this.props.location}
                        onChange={this.props.onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        value={this.props.price}
                        onChange={this.props.onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        className="form-control"
                        type="text"
                        name="imageUrl"
                        value={this.props.imageUrl}
                        onChange={this.props.onChange}
                        required
                    />
                </div>

                <input
                    className="btn btn-default"
                    type="submit" value="Edit"
                    disabled={this.props.isDisabled} 
                />
            </form>
        );
    }
}

