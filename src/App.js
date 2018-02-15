import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import * as BlogAPI from './BlogAPI.js';
import './App.css';


class App extends Component {
    componentDidMount(){
        BlogAPI.getAllPosts().then((posts)=>{
            console.log(posts);
        });
        BlogAPI.getAllCategories().then((category)=>{
            console.log(category);
        })
    }
    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    }
}

export default App;
