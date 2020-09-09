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
            <div className="header-logo">
                <img src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABTrTb2xjegtH7RDzb2RyX1HHXRmj-5tzQAcAlca0iMod-NfciRXLPEr5xqGhLmNtOTIX8LHWO3Ln8gagUUUtcvQb42Qa5ygwu4VA.png?r=172" alt="top-gear"/> 
                <h1>Fan Forum</h1>
            </div>
            <p className="welcome-tag">Welcome, {this.props.username}!</p>
            <div className='header-nav'>
                <Link to='/' onClick={() => this.logout()} className='header-nav'>Logout</Link>
            </div>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps)(Header);
