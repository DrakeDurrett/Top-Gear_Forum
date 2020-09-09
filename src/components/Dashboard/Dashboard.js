import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            posts: [],
            post_id: null, 
            title: '',
            content: ''
        };
    };

    componentDidMount(){
        this.getPosts()
    };

    getPosts = () => {
        axios.get('/api/posts').then(res => {
            this.setState({
                posts: res.data
            })
        }).catch(err => console.log(err))
    };

    render() {
        const mappedPosts = this.state.posts.map( (post) => {
            return <div className="post-box" key={post.post_id}>
                <span className="post-title">
                    <h1>{post.title}</h1>
                    <h4 id="title">Published by: {post.username}</h4>
                </span>
                <section className="post-content">
                    <p>{post.content}</p>
                </section>
            </div>
        })
        return <div className="posts">
            {mappedPosts}
        </div>
    }
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);
