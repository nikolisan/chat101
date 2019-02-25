import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { history } from '../redux/store';

function onLogout(event, props, history) {
    props.logoutUser(history)
}

const Navbar = (props) => {
    const {isAuthenticated, user} = props.auth;
    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/chat">Chat</Link></li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.username}
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" onClick={event => onLogout(event, props, history)}>Logout</a>
                </div>
            </li>
        </ul>
    )
    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">Chat 101</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                { isAuthenticated ? authLinks : guestLinks }
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool,
        username: PropTypes.object
    }).isRequired
}

export default Navbar