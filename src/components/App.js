import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getPosts,getCategories} from '../actions'
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
            this.props.getAllPosts(posts);
            console.log(posts);
        });

        BlogAPI.getAllCategories().then((categories)=>{
            this.props.getAllCategory(categories);
            console.log(categories);
        })
        BlogAPI.getCategoryPosts('udacity').then((categories)=>{
            console.log(categories);
        })
    }

    render() {
        console.log(this)
        const {mixPost} = this.props
    return (
      <div className="App">
          <h1 className="App-title">Blog</h1>
          <PostList
              post= {mixPost}
          />
      </div>
    );
    }
}

function mapStateToProps({post,category}){
    let mixPost = {}
    console.log(post)
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
