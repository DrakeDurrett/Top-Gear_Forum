import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

class Nav extends Component {
    render() {
        return <div>
            <h1>{this.props.username}</h1>
            <Link to='/addpost'> Add Post </Link>
            <Link to='/cars'> Cars </Link>
            <Link to='/stig'> The Stig </Link>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);