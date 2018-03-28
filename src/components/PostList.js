import React, { Component } from 'react'
import PostDetail from './PostDetail';
import * as BlogAPI from "../BlogAPI";
import {
    getCategories, getComment, getPostDetail, getPosts, hideModal, showModal,
    upsertComment
} from '../actions'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route,withRouter, Link } from 'react-router-dom'
import {connect} from "react-redux";
import UpdatePost from './UpdatePost'

class PostList extends Component{

    static propType = {
        detailPage: PropTypes.array.isRequired,
        category:null
    }

    componentWillMount(){
        let {category} = this.props.match.params
        if(category===undefined) category = ''
        this.setState(()=>({category: category}))
    }

    voteBlog(blogId,VoteOption){
        //VoteOption is either 'upVote' or 'downVote'
        let voteBody = {option:VoteOption}
        BlogAPI.voteBlog(blogId,voteBody).then((blog)=>this.props.getPostDetail(blog.id, blog))

    }

    deleteBlog(blogId){
        BlogAPI.deleteBlog(blogId).then((deleteBlog)=>{this.props.getPostDetail(deleteBlog.id, deleteBlog)})
    }

    post = (item,path) => {
        return (<li key={item.id}>
            <p>{item.title}</p>
            <p>{item.author}</p>
            <p>{item.commentCount}</p>
            <p>{item.voteScore}</p>
            <div>
            <Link
                to={"/"+path+"/"+item.id}
            >View Detail</Link>
            </div>
            <button onClick={()=>this.voteBlog(item.id,'upVote')}>
                vote up
            </button>
            <button onClick={()=>this.voteBlog(item.id,'downVote')}>
                vote Donw
            </button>
            <button onClick={()=>this.deleteBlog(item.id)}>
                delete Blog
            </button>
        </li>)
    }


    renderCategoryLink(categoryPath){
        return (<div key={categoryPath}><Link
                to={"/"+categoryPath}
            >    view {categoryPath} type of Posts   </Link> </div>)
    }

    render () {
        let mixPost = this.props;
        let categories = mixPost.category;
        console.log('----------------',mixPost)
        let thisPost = {
            id: Math.floor(Date.now())+111111111111,
            timestamp: Math.floor(Date.now())+111111111111,
            newPost: 'true'
        }
        return (
            <div >
                <Link
                    to={"/"}
                >Back to main page</Link>
                {categories.map((categor) => {return this.renderCategoryLink(categor.path)})}
            <div className="List">
            {('post' in mixPost) && Object.values(mixPost['post']).map(obj => {
                    if ('posts' in obj && 'path' in obj ){
                        if (this.state.category==='' || (this.state.category!=='' &&  this.state.category ===obj.path))
                        return (<div key={obj.path}><ul className={obj.path}>
                            { Object.values(obj.posts).map((postItem)=>{
                                return this.post(postItem,obj.path)
                            })
                            }
                        </ul></div>)
                    }
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
        </div>
                </div>)

    }
}

function mapStateToProps({modal,category, post}){
    return {'modal': modal,
        'category': category,
        'posts': post,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        showModal: (modalType, modalProps) => dispatch(showModal({modalType, modalProps})),
        hideModal: (modalType, modalProps) => dispatch(hideModal({modalType, modalProps})),
        getPostDetail: (postId, postDetail) => dispatch(getPostDetail({postId,postDetail})),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList));
