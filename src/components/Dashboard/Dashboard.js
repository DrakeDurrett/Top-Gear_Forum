import React, {Component} from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            posts: []
        }
    }

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
        const mappedPosts = this.state.posts.map( (post, index) => {
            return <div>
                    <h3>{post.username}</h3>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
            </div>
        })
        return <div>
            {mappedPosts}
        </div>
    }
}

export default Dashboard;
