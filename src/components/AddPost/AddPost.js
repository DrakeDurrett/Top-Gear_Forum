import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './AddPost.css';


class AddPost extends Component {
    constructor(){
        super();

        this.state = {
            post_id: null,
            title: '',
            content: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.submitPost = this.submitPost.bind(this);
    };

    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }; 

    submitPost = () => {
        const { user_id } = this.props;
        const {title, content } = this.state;
        axios.post(`/api/post/${user_id}`, {title, content}).then(res => {
            this.props.history.push('/dashboard');
        }).catch(err => console.log(err))
    };

    render() {
        return <div className="add-post">
            <input className="title-input" type="text" name="title" placeholder="Title..." value={this.state.title} onChange={this.handleInput} />
            <textarea className="content-input" type="text" name="content" placeholder="Add your post here...." value={this.state.content} onChange={this.handleInput} />
            <button id="submit-post" onClick={() => this.submitPost()}> Submit Post </button>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AddPost);