import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Dashboard.scss';

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
        return <span className='post-box' key={posts.post_id}>
                <section className="title-box">
                    <h1>{posts.title}</h1>
                    <h4 className="publisher">Published by: {posts.username}</h4>
                </section>
                <img className="post-img" src={posts.img_url} alt=""/>
                <p>{posts.content}</p>
            </span> 
        });

    return <div className="dashboard">
            <h1 className="welcome-tag">Welcome, {props.username}!</h1>
            <h2 className="forum-header">THE GREATEST FORUM .... IN THE WORLD</h2>
            <div className="posts">
                {mappedPosts}
            </div>
        </div>

};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);
