import React, { Component } from 'react'
import * as BlogAPI from "../BlogAPI";
import {
    hideModal, showModal,
} from '../actions/Modal'

import {withRouter, Link } from 'react-router-dom'
import {connect} from "react-redux";
import UpdatePost from './UpdatePost'
import has from 'lodash'
import {getPostDetail} from '../actions/Posts'


import Table, { TableBody, TableCell, TableHead, TableRow,TableSortLabel } from 'material-ui/Table'


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

    state= {
        sortStatus: 'desc'
    }


    sortPosts = () =>{
        let status = this.state.sortStatus;
        switch (status){
            case 'desc':
                this.setState(() => {return {sortStatus: 'asc'}})
                break
            case '':
                this.setState(() => {return {sortStatus: 'desc'}})
                break
            case 'asc':
                this.setState(() => {return {sortStatus: 'desc'}})
                break
        }
    }

    voteBlog(blogId,VoteOption){
        //VoteOption is either 'upVote' or 'downVote'
        let voteBody = {option:VoteOption}
        BlogAPI.voteBlog(blogId,voteBody).then((blog)=>this.props.getPostDetail(blog.id, blog))

    }

    deleteBlog(blogId){
        BlogAPI.deleteBlog(blogId).then((deleteBlog)=>{this.props.getPostDetail(deleteBlog.id, deleteBlog)})
    }

    post = (item) => {
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
                to={"/"+item.category+"/"+item.id}
            >View Detail</Link></TableCell>
            </TableRow>)
    }


    render () {
        let mixPost = this.props;
        let categories = mixPost.category;
        let {category} = this.props.match.params
        if (category===undefined) category = ''

        let thisPost = {
            id: Math.floor(Date.now())+111111111111,
            timestamp: Math.floor(Date.now())+111111111111,
            newPost: 'true'
        }

        let PostList = [];
        ('post' in mixPost) && Object.values(mixPost['post']).map(obj =>
            ('posts' in obj && 'path' in obj )
            && (category==='' || (category!=='' &&  category ===obj.path))
            &&( Object.values(obj.posts).filter(postItem => postItem.deleted === false).map((postItem)=>(
                    PostList.push(postItem)
                ))))

        switch (this.state.sortStatus){
            case 'asc':
                PostList = PostList.sort((a,b)=>a.voteScore - b.voteScore)
                break;
            case '':
            case 'desc':
                PostList = PostList.sort((a,b)=>b.voteScore - a.voteScore)
                break;
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
                        <TableCell><TableSortLabel onClick={this.sortPosts} direction ={this.state.sortStatus} active ={true} >vote score</TableSortLabel></TableCell>
                        <TableCell>Vote Up</TableCell>
                        <TableCell>Vote Down</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Detail</TableCell>
                    </TableRow>
                </TableHead><TableBody >
                    {PostList.map(post => this.post(post))}
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
