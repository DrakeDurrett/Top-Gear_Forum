import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import axios from 'axios';


class Header extends Component {
    logout = () => {
        axios.delete('/auth/logout').then( res => {
            console.log('User has been logged out!')
        }).catch( err => console.log(err))
    };



    render(){
        return <div className='header'>
            <h1>Top Gear Fan Forum</h1>
            <p>Welcome, {this.props.username}</p>
            <div className='header-nav'>
                <Link to='/dashboard'>Home</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/' onClick={() => this.logout()}>Logout</Link>
            </div>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps)(Header);
