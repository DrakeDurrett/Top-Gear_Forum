import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


class AddPost extends Component {
    constructor(){
        super();

        this.state = {
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
        const { title, content } = this.state;
        axios.post(`/api/post/${user_id}`, {title, content}).then(res => {
            this.props.history.push('/dashboard')
        }).catch(err => console.log(err))
    };

    render() {
        return <div>
            <input type="text" name="title" value={this.state.title} onChange={this.handleInput} />
            <input type="text" name="content" value={this.state.content} onChange={this.handleInput} />
            <button onClick={() => this.submitPost()}> Post </button>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AddPost);