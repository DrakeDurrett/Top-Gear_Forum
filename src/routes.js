import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import AddPost from './components/AddPost/AddPost';
import Cars from './components/Cars/Cars';
import Stig from './components/Stig/Stig';
import Profile from './components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/addpost' component={AddPost} />
        <Route path='/cars' component={Cars} />
        <Route path='/stig' component={Stig} />
        <Route path='/profile' component={Profile}/>
    </Switch>
)