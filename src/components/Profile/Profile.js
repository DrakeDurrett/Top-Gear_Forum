import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component {
    constructor(){
        super();

        this.state = {
            usersPosts: [],
            editing: false,
            title: '',
            content: '',
        };

        this.getUsersPosts = this.getUsersPosts.bind(this);
        this.editPost = this.editPost.bind(this);
        this.handleInput = this.handleInput.bind(this);
    };

    componentDidMount() {
        this.getUsersPosts();
    };

    toggleEdit() {
        this.setState({
            editing: !this.state.editing
        })
    };

    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }; 

    getUsersPosts = () => {
        const { user_id } = this.props;
        axios.get(`/api/profile/${user_id}`).then(res => {
            this.setState({
                usersPosts: res.data
            })
        }).catch(err => console.log(err))
    };

    editPost = (id) => {
        const post_id = id;
        const { title, content } = this.state;
        axios.put(`/api/editPost/${post_id}`, {title, content}).then(res => {
            this.setState = ({
                usersPosts: res.data,
                title,
                content
            })
        }).catch(err => console.log(err))
    };

    deletePost = (id) => {
        const post_id = id;
        axios.delete(`/api/deletePost/${post_id}`).then(res => {
            this.setState({
                usersPosts: this.state.usersPosts.splice(res.data, 1)
            })
        }).catch(err => console.log(err))
    };

    render() {
        console.log(this.state.usersPosts)
        const mappedUsersPosts = this.state.usersPosts.map((posts) => {
            return <div className="profile-post-box" key={posts.post_id} id={posts.post_id}>
                    <span className="profile-post-title">
                        <h1>{posts.title}</h1>
                        <h4>Published by: {posts.username}</h4>
                    </span>
                    <section className="profile-post-content">
                        <p>{posts.content}</p>
                    </section>
                    <div className="profile-buttons">
                        <button id="delete-btn" onClick={(post_id) => this.deletePost(posts.post_id)}> X </button>
                        <Link to="/editPost"><button id="edit-btn"> Edit Post </button></Link>
                    </div>
                </div>
            })
        return <div className="profile-post">
                {mappedUsersPosts}
            </div>
    }
};



const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);

