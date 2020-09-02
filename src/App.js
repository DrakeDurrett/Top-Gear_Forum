import React from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import routes from './routes';
import './App.css';
import './reset.css'

function App() {
  return (
    <div>
    <Header />
    <Nav />
    {routes}
    </div>
  );
}

export default App;
