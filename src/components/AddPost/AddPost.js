import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { v4 as randomString } from 'uuid';
import { GridLoader } from 'react-spinners';
import './AddPost.css';


class AddPost extends Component {
    constructor(){
        super();

        this.state = {
            post_id: null,
            title: '',
            content: '',
            img_url: 'https://27w9w32qtvth2o5kp12jl5pl-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/placeholder-300x200.png',
            isUploading: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.submitPost = this.submitPost.bind(this);
    };

    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }; 

    getSignedRequest = ([file]) => {
        this.setState({isUploading: true})
     
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
     
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
          const { signedRequest, url } = response.data 
          this.uploadFile(file, signedRequest, url)
        }).catch( err => {
          console.log(err)
        })
     }

     uploadFile = (file, signedRequest, img_url) => {
         const options = {
             headers: {
                 "Content-Type": file.type
             }
            }
             axios.put(signedRequest, file, options).then((res) => {
                this.setState({
                    isUploading: false,
                    img_url,
                });
                console.log(this.state.img_url);
                }).catch((err) => {
                    this.setState({ isUploading: false });
                    console.log(err);
                    if (err.response.status === 403) {
                    alert(`Check AWS Config`);
                    } else {
                        alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
      });
     }


    submitPost = () => {
        const { user_id } = this.props;
        const {title, content, img_url } = this.state;
        axios.post(`/api/post/${user_id}`, {title, content, img_url}).then(res => {
            this.props.history.push('/dashboard');
        }).catch(err => console.log(err))
    };

    render() {
        const { isUploading, img_url } = this.state;
        return <div className="add-post">
            <input className="title-input" type="text" name="title" placeholder="Title..." value={this.state.title} onChange={(e) => this.handleInput(e)} />
            <div className="img-upload">
            <Dropzone
                onDropAccepted={this.getSignedRequest}
                accept="image/*"
                multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <div className='dropzone'
                        {...getRootProps()}>
                            <input {...getInputProps()} />
                        {isUploading ? <GridLoader /> : <p>Drop files here or click to select files</p>}
                    </div>
            )}
            </Dropzone>
            <img className="img-preview" src={img_url} alt="" />
            </div>
            <textarea className="content-input" type="text" name="content" placeholder="Add your post here...." value={this.state.content} onChange={(e) => this.handleInput(e)} />
            <button id="submit-post" onClick={() => this.submitPost()}> Submit Post </button>
        </div>
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(AddPost);