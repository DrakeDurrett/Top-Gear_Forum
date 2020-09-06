import React, { Component } from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import './reset.css'

class App extends Component {
  render(){
    return <div>
      {this.props.location.pathname === '/' ? <div /> : <Header />}
      {this.props.location.pathname === '/' ? <div /> : <Nav />}
      {routes}
    </div>
  }
}

export default withRouter(App);
