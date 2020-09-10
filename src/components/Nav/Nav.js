import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import './Nav.css';

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    menuHoverIn = () => {
        console.log('Hovering in')
    };

    menuHoverOut = () => {
        console.log('hovering out')
    };
    render(){
        return <div>
            {!this.state.collapsed ? (
                <nav className="collapsed-sidebar" onMouseOver={() => this.toggleMenu()} onMouseLeave={() => this.toggleMenu()}>
                    <button className="open-menu">></button>
                    
            </nav>
            ) : (
                <nav className="sidebar"  onMouseLeave={() => this.toggleMenu()}>
                    <Link className="nav-links" to='/dashboard'> Home </Link>
                    <Link className="nav-links" to='/profile'> Profile </Link>
                    <Link className="nav-links" to='/addpost'> Add Post </Link>
                    <Link className="nav-links" to='/cars'> Cars </Link>
                    <Link className="nav-links" to='/stig'> The Stig </Link>
                </nav>
            )}
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);

