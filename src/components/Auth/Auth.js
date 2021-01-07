import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {userInfoToRedux} from '../../redux/userReducer';
import logo from './topgearlogo.jpg';
import './Auth.scss';

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
            const { username, user_id, email } = res.data;
            this.props.userInfoToRedux( user_id, username, email );
            this.props.history.push('/dashboard');
        }).catch(err => {
            console.log(err)
            alert('Could not register')
        })
    };

    login = () => {
        const { username, password } = this.state;
        axios.post('/auth/login', { username, password }).then(res => {
            const { username, user_id, email } = res.data;
            this.props.userInfoToRedux( user_id, username, email );
            this.props.history.push('/dashboard');
        }).catch( err => {
            console.log(err)
            alert('Username/Password Incorrect')
        })
    };
   
    render(){
        const { newUser } = this.state;
        return (
        <div className="auth-page">
            <div className="logo">
            <img  id="logo" src={logo} alt="Top-gear" />
            </div>
            {newUser === true ? (
                <div className="register">
                <div className="register-inputs">
                    <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={e => this.handleInput(e)} />
                    <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.handleInput(e)}/>
                    <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className="register-buttons">
                    <button onClick={this.toggleRegister}>Cancel</button>
                    <button onClick={() => this.register()}>Register</button>
                </div>
                    
            </div>)
        : (
            <div className="login">
                <div className="login-inputs">
                    <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={e => this.handleInput(e)}/>
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={e => this.handleInput(e)}/>
                </div>
                <div className='login-buttons'>
                    <button onClick={() => this.login()}>Login</button>
                    <button onClick={this.toggleRegister}>Register</button>
                </div>
            </div>
        )}
        </div>
        )
    }
}


export default connect(null, {userInfoToRedux})(Auth);
