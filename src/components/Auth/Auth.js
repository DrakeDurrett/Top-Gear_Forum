import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {userInfoToRedux} from '../../redux/reducer';

class Auth extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            username: '',
            password: '',
            newUser: false,
        }
        this.handleInput = this.handleInput.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
    };

    toggleRegister = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    };

    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }; 

    register = () => {
        const { email, username, password } = this.state;
        axios.post('/auth/register', {email, username, password}).then( res => {
            const { user_id, username, email } = res.data;
            this.props.userInfoToRedux( user_id, username, email );
            this.props.history.push('/dashboard');
            console.log(res.data);
        }).catch(err => {
            console.log(err)
        })
    };

    login = () => {
        const { username, password } = this.state;
        axios.post('/auth/login', { username, password }).then(res => {
            const { user_id, username, email } = res.data;
            this.props.userInfoToRedux( user_id, username, email );
            this.props.history.push('/dashboard');
            console.log(res.data);
        }).catch( err => {
            console.log(err)
        })
    };
   
    render(){
        const { newUser } = this.state;
        console.log(this.props)
        return (
        <div>
            {newUser === true ? (
                <div className="register">
                <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleInput} />
                <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleInput}/>
                <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInput}/>
                <button onClick={this.toggleRegister}>Cancel</button>
                <button onClick={() => this.register()}>Register</button>
            </div>)
        : (
            <div className="login">
                <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleInput}/>
                <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInput}/>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={this.toggleRegister}>Register</button>
            </div>
        )}
        </div>
        )
    }
}


export default connect(null, {userInfoToRedux})(Auth);
