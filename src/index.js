import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/Home/HomePage';
import CatalogPage from './Components/Teams/Catalog/CatalogPage';
import AboutPage from './Components/About/AboutPage';
import RegisterPage from './Components/Register/RegisterPage';
import LoginPage from './Components/Login/LoginPage';
import CreatePage from './Components/Teams/Create/CreatePage';
import EditPage from './Components/Teams/Edit/EditPage';
import DeletePage from './Components/Teams/Delete/DeletePage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="catalog" component={CatalogPage} />
            <Route path="create" component={CreatePage} />
            <Route path="edit/:teamId" component={EditPage} />
            <Route path="delete/:teamId" component={DeletePage} />
            <Route path="about" component={AboutPage} />
            <Route path="register" component={RegisterPage} />
            <Route path="login" component={LoginPage} />
            <Route path="logout" component={HomePage} />
        </Route> 
    </Router>,
    document.getElementById('root')
);
