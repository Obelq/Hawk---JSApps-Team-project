import React, { Component } from 'react';
import './ContactsPage.css';

export default class ContactsPage extends Component {
    render () {
        return (
            <div className="contacts-container">
                <h1 className="title">Contacts Page</h1>
                    <div className="content">
                    <h3>Email:</h3>
                    <p>hawk@gmail.com</p>
                    <h3>Phone:</h3>
                    <p>0896 324 033</p>
                    <h3>Post code</h3>
                    <p>1000</p>
                    <h3>Address</h3>
                    <p>Sofia, kv. Izgrev, "Tintqva" street № 15-17</p>
                    <h3>Working time</h3>
                    <p>10:00>10:00 - 20:00 (Monday - Friday)</p>
                </div>
            </div>

        );
    }
}