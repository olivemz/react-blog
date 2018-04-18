import React, { Component } from 'react'
import * as BlogAPI from "../BlogAPI";
import {
    hideModal, showModal,
} from '../actions/Modal'

import {withRouter, Link } from 'react-router-dom'
import {connect} from "react-redux";
import UpdatePost from './UpdatePost'

import {getPostDetail} from '../actions/Posts'


import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class PostList extends Component{

    voteBlog(blogId,VoteOption){
        //VoteOption is either 'upVote' or 'downVote'
        let voteBody = {option:VoteOption}
        BlogAPI.voteBlog(blogId,voteBody).then((blog)=>this.props.getPostDetail(blog.id, blog))

    }

    deleteBlog(blogId){
        BlogAPI.deleteBlog(blogId).then((deleteBlog)=>{this.props.getPostDetail(deleteBlog.id, deleteBlog)})
    }

    post = (item,path) => {
        return (<TableRow key={item.id}>
                <TableCell><p>{item.title}</p></TableCell>
                <TableCell><p>{item.author}</p></TableCell>
                <TableCell><p>{item.commentCount}</p></TableCell>
                <TableCell><p>{item.voteScore}</p></TableCell>
                <TableCell><button onClick={()=>this.voteBlog(item.id,'upVote')}>
                    vote up
                </button></TableCell>
                <TableCell><button onClick={()=>this.voteBlog(item.id,'downVote')}>
                    vote Donw
                </button></TableCell>
                <TableCell><button onClick={()=>this.deleteBlog(item.id)}>
                    delete Blog
                </button></TableCell>
            <TableCell><Link
                to={"/"+path+"/"+item.id}
            >View Detail</Link></TableCell>
            </TableRow>)
    }



    render () {
        let mixPost = this.props;
        let categories = mixPost.category;
        let {category} = this.props.match.params
        if(category===undefined) category = ''

        console.log('----------------',mixPost)
        let thisPost = {
            id: Math.floor(Date.now())+111111111111,
            timestamp: Math.floor(Date.now())+111111111111,
            newPost: 'true'
        }
        return (
            <div key='master-list'>
                <Link
                    to={"/"}
                >Back to main page</Link>
                {categories.map((category) => (<div key= {"category" + category.path}><Link to={"/"+category.path}>view {category.path} type of Posts</Link></div>))}
            <div className="List">
                <pager className='post-table'><Table className='post-list'><TableHead>
                    <TableRow>
                        <TableCell>Post Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>comments</TableCell>
                        <TableCell>vote score</TableCell>
                        <TableCell>Vote Up</TableCell>
                        <TableCell>Vote Down</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Detail</TableCell>
                    </TableRow>
                </TableHead><TableBody >
            {('post' in mixPost) && Object.values(mixPost['post']).map(obj =>
                ('posts' in obj && 'path' in obj )
                && (category==='' || (category!=='' &&  category ===obj.path))
                &&( Object.values(obj.posts).filter(postItem => postItem.deleted === false).map((postItem)=>(
                        this.post(postItem,obj.path))
                    )
                )
            )}
                </TableBody>
            </Table></pager>
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
)(PostList))
