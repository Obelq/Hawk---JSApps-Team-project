import React, { Component } from 'react';
import './AboutPage.css';

export default class AboutPage extends Component {
    render () {
        return (
            <div>
                <h1 className="title">About Page</h1>
                <div className="content">

                    As a company, we strive to bring you the best selection of organic and/or natural gardening supplies available.
                    While many of our products are either Certified Organic, or approved for Certified Organic Production,
                    we also offer a variety of products that do not qualify for this classification.
                    But rest assured, everything we offer must live up to our strict, planet-friendly standards.
                    If you have any questions, please feel free to contact us and we'd be happy to answer them!
                </div>
            </div>
        );
    }
}
