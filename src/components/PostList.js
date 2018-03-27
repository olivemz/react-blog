import React, { Component } from 'react'
import PostDetail from './PostDetail';
import * as BlogAPI from "../BlogAPI";
import {
    deleteComment, getCategories, getComment, getPostDetail, getPosts, hideModal, showModal,
    upsertComment
} from '../actions'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route,withRouter, Link } from 'react-router-dom'
import {connect} from "react-redux";
import UpdatePost from './UpdatePost'

class PostList extends Component{

    static propType = {
        detailPage: PropTypes.array.isRequired,
    }

    detailPage = (post) => {
        console.log("this postId is", "/" + post.category+"/"+ post.id);

    }

    post = (item,path) => {
        return (<li key={item.id}>
            <p>{item.title}</p>
            <p>{item.author}</p>
            <p>{item.commentCount}</p>
            <p>{item.voteScore}</p>
            <Link
                to={"/"+path+"/"+item.id}
            >View Detail</Link>
        </li>)
    }


    render () {
        let mixPost = {};
        mixPost = this.props
        console.log('----------------',mixPost)
        let thisPost = {
            id: Math.floor(Date.now())+111111111111,
            timestamp: Math.floor(Date.now())+111111111111,
            newPost: 'true'
        }
        return ( <div className="List">
            {('post' in mixPost) && Object.values(mixPost['post']).map(obj => {
                    if ('posts' in obj && 'path' in obj)
                        return (<div key={obj.path}><ul className={obj.path}>
                            { Object.values(obj.posts).map((postItem)=>{
                                return this.post(postItem,obj.path)
                            })
                            }
                        </ul></div>)
                }
            )}
            <button
                className='icon-btn'
                onClick={() => this.props.showModal(
                    'post',
                    thisPost
                )}>
                New Post
            </button>
            <UpdatePost
            />
        </div>)

    }
}

function mapStateToProps({modal}){
    return {'modal': modal}
}

function mapDispatchToProps (dispatch) {
    return {
        showModal: (modalType, modalProps) => dispatch(showModal({modalType, modalProps})),
        hideModal: (modalType, modalProps) => dispatch(hideModal({modalType, modalProps}))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList));
