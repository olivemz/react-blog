import React, { Component } from 'react'
import PostDetail from './PostDetail';
import * as BlogAPI from "../BlogAPI";
import {connect} from "react-redux";
import {getCategories, getComment, getPostDetail, getPosts} from '../actions'
import PropTypes from 'prop-types'


class PostList extends Component{

    state={1:1,2:2,3:3}

    static propType = {
        detailPage: PropTypes.array.isRequired,
    }

    detailPage = (postId) => {
        console.log("this postId is", postId);
        BlogAPI.getPost(postId).then((posts)=>{
           // this.props.getPostDetail(this.props.post,postId,posts);
            console.log('123123',posts);
        });
    }

    post = (item) => {
        return (<li key={item.id}>
            <p>{item.title}</p>
            <p>{item.author}</p>
            <p>{item.commentCount}</p>
            <p>{item.voteScore}</p>
            <button
                className='page_detail'
                onClick={() => this.detailPage(item.id)}>
                view detail
            </button>
        </li>)
    }


    render () {
        let mixPost = {};
        mixPost = this.props
        console.log('----------------',mixPost)
        return ( <div className="List">
            {('post' in mixPost) && Object.values(mixPost['post']).map(obj => {
                    if ('posts' in obj && 'path' in obj)
                        return (<div key={obj.path}><ul className={obj.path}>
                            { Object.values(obj.posts).map((postItem)=>{
                                return this.post(postItem)
                            })
                            }
                        </ul></div>)
                }
            )}
        </div>)

    }
}

export default PostList