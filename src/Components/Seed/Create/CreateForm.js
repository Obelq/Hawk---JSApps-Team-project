import React, { Component } from 'react';

export default class CreateForm extends Component {
    render () {
        let categoriesOptions = this.props.categories.map((category, index) => {
            return <option value={category._id} key={category._id}>{category.name}</option>
        });

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
                        rows="6" cols="50"
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
                        step="0.01"
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
                
                <div className="form-group">
                    <label>Choose category</label>
                    <select value={this.props.categoryId} onChange={this.props.onChange} name="categoryId">
                        {categoriesOptions}
                    </select>
                </div>

                <div className="form-group">
                    <label>Discount (%)</label>
                    <input
                        className="form-control"
                        type="number"
                        name="discount"
                        value={this.props.discount}
                        onChange={this.props.onChange}
                        required
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label>Producer / Company</label>
                    <input
                        className="form-control"
                        type="text"
                        name="producer"
                        value={this.props.producer}
                        onChange={this.props.onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Model</label>
                    <input
                        className="form-control"
                        type="text"
                        name="model"
                        value={this.props.model}
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
