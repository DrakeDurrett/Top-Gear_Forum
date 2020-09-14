import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {userInfoToRedux} from '../../redux/userReducer';
import './auth.css'

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
            <img id="logo" src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABTrTb2xjegtH7RDzb2RyX1HHXRmj-5tzQAcAlca0iMod-NfciRXLPEr5xqGhLmNtOTIX8LHWO3Ln8gagUUUtcvQb42Qa5ygwu4VA.png?r=172" alt="Top-gear" />
            <h1 className='second-title'>FAN FORUM</h1>
            </div>
            {newUser === true ? (
                <div className="auth">
                <div className="register-inputs">
                    <input className="register-inputs" type="text" placeholder="Email" name="email" value={this.state.email} onChange={e => this.handleInput(e)} />
                    <input className="register-inputs" type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.handleInput(e)}/>
                    <input className="register-inputs" type="text" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className="register-buttons">
                    <button onClick={this.toggleRegister}>Cancel</button>
                    <button onClick={() => this.register()}>Register</button>
                </div>
                    
            </div>)
        : (
            <div className="auth">
                <div className="login-inputs">
                    <input className="login-inputs" type="text" placeholder="Username" name="username" value={this.state.username} onChange={e => this.handleInput(e)}/>
                    <input className="login-inputs" type="password" placeholder="Password" name="password" value={this.state.password} onChange={e => this.handleInput(e)}/>
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
