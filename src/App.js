import React, { Component } from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import './reset.css';
import './App.css';

class App extends Component {
  render(){
    return <div className='body'>
      {this.props.location.pathname === '/' ? <div /> : <Header />}
      {this.props.location.pathname === '/' ? <div /> : <Nav />}
      {routes}
    </div>
  }
}

export default withRouter(App);
