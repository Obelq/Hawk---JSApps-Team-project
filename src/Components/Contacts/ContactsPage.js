import React, { Component } from 'react';
import './ContactsPage.css';

export default class ContactsPage extends Component {
    render () {
        return (
            <div className="contacts-container">
                <h1 className="title">Contacts Page</h1>
                   <div className="content">
                     <h3>Phone:</h3> 0896 324 033
                    <br/>
                    <h3>Email:</h3>hawk@gmail.com
                </div>
                <div id="map" onload="loadMap()"></div>
            </div>

        );
    }
}
function loadMap() {
    let map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
            async defer></script>

}
