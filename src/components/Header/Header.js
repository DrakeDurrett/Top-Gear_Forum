import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './topgearlogo.jpg';
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
            <div className="header-logo">
                <Link to='/dashboard'><img src={logo} alt="top-gear"/> </Link>
            </div>
            <div className='header-nav'>
                <Link to='/' onClick={() => this.logout()} className='header-nav'>Logout</Link>
            </div>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps)(Header);
