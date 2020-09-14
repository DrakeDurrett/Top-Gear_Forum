import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Profile.css';

const Profile = (props) => {

    const [usersPosts, setUsersPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        getUsersPosts()
    });

    const toggleEdit = () => {
        setEditing(!editing)
    };

    const getUsersPosts = () => {
        const {user_id} = props;
        axios.get(`/api/profile/${user_id}`).then(res => {
            setUsersPosts(res.data)
        }).catch(err => console.log(err))
    };

    const editPost = (post_id) => {
        axios.put(`/api/editPost/${post_id}`, {title, content}).then(res => {
            getUsersPosts()
            toggleEdit();
        }).catch(err => console.log(err))
    };

    const deletePost = (post_id) => {
        axios.delete(`/api/deletePost/${post_id}`).then(res => {
            getUsersPosts()
        }).catch(err => console.log(err))
    };


    const mappedUsersPosts = usersPosts.map((posts) => {
            return <div className="profile-post-box" key={posts.post_id}>
                        {!editing ? (
                            <span className="profile-post-title">            
                                <h1>{posts.title}</h1>
                                <h4>Published by: {posts.username}</h4>
                            <section className="profile-post-content">
                                <p>{posts.content}</p>
                                <img className="post-img" src={posts.img_url} alt="" />
                            </section>
                            <div className="profile-buttons">
                                <button id="delete-btn" onClick={() => deletePost(posts.post_id)}> X </button>
                                <button id="edit-btn" onClick={() => toggleEdit()}> Edit Post </button>
                            </div>
                            </span>
                        ) : (
                            <span className="profile-post-title">
                                <h1>{posts.title}</h1>
                                <h4>Published by: {posts.username}</h4>
                            <section className="profile-post-content">
                                <p>{posts.content}</p>
                                <img className="post-img" src={posts.img} alt="" />
                            </section>
                            <div className="profile-buttons">
                                <button id="delete-btn" onClick={() => this.deletePost(posts.post_id)}> X </button>
                            </div>
                            <div className="edit-inputs">
                                <input className="edit-title" type="text" placeholder="Edit Title Here...." name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <textarea className="edit-content" type="text"  name="content" placeholder="Edit Post Here...." value={content} onChange={(e) => setContent(e.target.value)}/>
                            </div>
                            <div className="submit-edit-btns">
                                <button className="cancel-edit" onClick={() => toggleEdit()}> Cancel </button>
                                <button className="submit-edit" onClick={() => editPost(posts.post_id)}> Submit Post </button>
                            </div>
                            </span>
                        )}
                        
                </div>
            })

        return <div className="profile-post">
                <h2>MY POSTS</h2>
                {mappedUsersPosts}
            </div>

};



const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);



        