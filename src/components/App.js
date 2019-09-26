import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import { toASCII } from 'punycode';
import Post from './Post/Post'


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/${id}/${text}`)
      .then(response => {
        this.setState({
          posts: response.data
        })
      }
      )
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/${id}`)
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
  }

  createPost(text) {
    console.log('hit')
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, { text })
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
  }

  render() {
    console.log(this.state.posts)
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
