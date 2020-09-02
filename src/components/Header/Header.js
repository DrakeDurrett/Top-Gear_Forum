import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


class Header extends Component {
    render(){
        return <div className='header'>
            <h1>Top Gear Fan Forum</h1>
            <div className='header-nav'>
                <p><Link to='/dashboard'>Home</Link></p>
                <p><Link to='/profile'>Profile</Link></p>
                <p><Link to='/'>Logout</Link></p>
            </div>
        </div>
    }
}


export default Header;
