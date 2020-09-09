import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import './Nav.css'

class Nav extends Component {
    render() {
        // console.log(this.props)
        return <div>
            <nav className="sidebar">
                <Link className="nav-links" to='/dashboard'> Home </Link>
                <Link className="nav-links" to='/profile'> Profile </Link>
                <Link className="nav-links" to='/addpost'> Add Post </Link>
                <Link className="nav-links" to='/cars'> Cars </Link>
                <Link className="nav-links" to='/stig'> The Stig </Link>
            </nav>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);