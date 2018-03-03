import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route } from 'react-router-dom';
import * as BlogAPI from '../BlogAPI.js';
import './App.css';
import PostList from './PostList';

class App extends Component {
    state = {
        testPost: null
    }
    componentDidMount(){
        BlogAPI.getAllPosts().then((posts)=>{
            this.setState({testPost:posts})
            console.log(this.state)
        });

        BlogAPI.getAllCategories().then((categories)=>{
            console.log(categories);
        })
    }

    render() {
    return (
      <div className="App">
          <h1 className="App-title">Blog</h1>
          <PostList
              posts = {this.state.testPost}
          />

      </div>
    );
    }
}

export default App;
