import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPosts, getCategories, getPostDetail, getComment} from '../actions'
import logo from '../logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BlogAPI from '../BlogAPI.js';
import './App.css';
import PostList from './PostList';

class App extends Component {
    state = {
        testPost: null
    }
    componentDidMount(){
        // In this api, body shall not be added, I will assume this.
        BlogAPI.getAllPosts().then((posts)=>{
            this.props.getAllPosts(posts);
            console.log(posts);
        });

        BlogAPI.getAllCategories().then((categories)=>{
            this.props.getAllCategory(categories);
            console.log(categories);
        });
    }

    render() {
        console.log("*******",this);
        const {mixPost} = this.props
    return (
      <div className="App">
          <h1 className="App-title">Blog</h1>
          <Route exact path='/' render={() => (
          <PostList
              post= {mixPost}
              getComment= {this.props.getComment}
              getPostDetail= {this.props.getPostDetail}
              />
              )}/>
      </div>
    );
    }
}

function mapStateToProps({post,category}){
    let mixPost = {}
    if (category.length> 0){
            category.map((item)=>{
                mixPost[item.name] = {
                    'posts': Object.values(post).filter( obj => obj.category === item.name).reduce((acc,cur)=> {acc[cur.id] = cur; return acc},{}),
                    'path': item.path
                }
            })
    }
    return {mixPost}
}

function mapDispatchToProps (dispatch) {
    return {
        getAllPosts: (data) => dispatch(getPosts(data)),
        getAllCategory: (data) => dispatch(getCategories(data)),
        getPostDetail: (postId,postDetail) => dispatch(getPostDetail({postId,postDetail})),
        getComment: (comments) => dispatch(getComment(comments)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
