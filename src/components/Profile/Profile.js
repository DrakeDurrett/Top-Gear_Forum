import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Profile.scss';

const Profile = (props) => {

    const [usersPosts, setUsersPosts] = useState([]);
    const [editing, setEditing] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        getUsersPosts()
        console.log(usersPosts)
    });

    const toggleEdit = (post_id) => {
        setEditing(post_id)
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
            toggleEdit()
            console.log(post_id)
        }).catch(err => console.log(err))
    };

    const deletePost = (post_id) => {
        axios.delete(`/api/deletePost/${post_id}`).then(res => {
            getUsersPosts()
        }).catch(err => console.log(err))
    };


    const mappedUsersPosts = usersPosts.map((post, index) => {
            return <div className="profile-post-box" key={post.post_id}>
                        {editing !== post.post_id ? (
                            <span>
                            <div className="profile-btns">
                            <button id="delete-btn" onClick={() => deletePost(post.post_id)}> Delete </button>
                            <button id="edit-btn" onClick={() => toggleEdit(post.post_id)}> Edit Post </button>
                            </div> 
                            <section className="profile-post-title">
                                <h1>{post.title}</h1>
                                <h4>Published by: {post.username}</h4>
                            </section>           
                            <section className="profile-post-content">
                                <img className="post-img" src={post.img_url} alt="" />
                                <p>{post.content}</p>
                            </section>
                            
                            </span>
                        ) : (
                            <span className="edit-post-box">
                                <div className="submit-edit-btns">
                                    <button id="cancel-edit" onClick={() => toggleEdit()}> Cancel </button>
                                    <button id="submit-edit" onClick={() => editPost(post.post_id)}> Submit Post </button>
                                </div>
                                <span className="edit-post-title">
                                    <h1>{post.title}</h1>
                                    <img className="post-img" src={post.img} alt="" />
                                    <p>{post.content}</p>
                                </span>
                                <div className="edit-inputs">
                                    <input className="edit-title" type="text" placeholder="Edit Title Here...." name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    <textarea className="edit-content" type="text"  name="content" placeholder="Edit Post Here...." value={content} onChange={(e) => setContent(e.target.value)}/>
                                </div>
                            </span>
                        )}
                        
                </div>
            })

        return <div className="profile">
                <h2>MY POSTS</h2>
                <div className="profile-post">
                    {mappedUsersPosts}
                </div>
            </div>

};



const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);



        