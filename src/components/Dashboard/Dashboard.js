import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
    });

    const getPosts = () => {
        axios.get('/api/posts').then(res => {
            setPosts(res.data)
        }).catch(err => console.log(err))
    };
    
    

    const mappedPosts = posts.map( (posts) => {
        return <div className="post-box" key={posts.post_id}>
            <span className="post-title">
                <h1>{posts.title}</h1>
                <h4 className="publisher">Published by: {posts.username}</h4>
            </span>
            <section className="post-content">
                <p>{posts.content}</p>
                <img className="post-img" src={posts.img_url} alt=""/>
            </section>
            </div>
        });

    return <div className="dashboard">
            <p className="welcome-tag">Welcome, {props.username}!</p>
            <h1 className="forum-header">THE GREATEST FORUM....IN THE WORLD</h1>
            {mappedPosts}
        </div>

};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);
