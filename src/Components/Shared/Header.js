import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router';

export default class Header extends Component {
    render () {
        return (
            <div id="sidebar-wrapper">
                <ul id="sidebar_menu" className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link id="menu-toggle" to="/">Hawk's seeds</Link>
                    </li>
                </ul>
                <ul className="sidebar-nav" id="sidebar">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
