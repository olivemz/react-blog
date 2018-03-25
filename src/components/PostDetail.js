import React, {Component} from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route , withRouter} from 'react-router-dom'
import {getCategories, getComment, getPostDetail, getPosts} from "../actions";
import * as BlogAPI from "../BlogAPI";


class PostDetail extends Component{
    state = {
        thisPostId: ''
    }

    componentDidMount(){
        const {postId, category} = this.props.match.params
        console.log("this.pros",this.props)
        // Get detail page.
        BlogAPI.getPost(postId).then((posts)=>{
            console.log('123123',posts);
            this.props.getPostDetail(postId, posts);
            this.setState(() => ({ thisPostId: postId}))
        });

        BlogAPI.getPostComment(postId).then((comments)=>{
            console.log('comments',comments);
            this.props.getComment(comments);
        });
    }

    comment = (comment) =>{
        return (<li key={comment.id}>
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.commentCount}</p>
            <p>{comment.timestamp}</p>
            <p>{comment.voteScore}</p>
        </li>)
    }

    render(){
        console.log("+++++++++",this);
        let thisPost = this.props.mixPost.posts[this.state.thisPostId]
        let thisComments = Object.values(this.props.mixPost.comments).filter(comment => (comment.parentId === this.state.thisPostId))
        console.log("+++++++++",thisComments);
        return (
            <div className="detail">
                {thisPost && (
                   <div key={thisPost.id}>
                    <h1>{thisPost.title}</h1>
                    <p>{thisPost.author}</p>
                    <p>{thisPost.body}</p>
                    <p>{thisPost.commentCount}</p>
                    <p>{thisPost.voteScore}</p>
                       <div className="comments"><ul>
                           <h2>Comments</h2>
                           {thisComments && thisComments.map((comment)=>{
                               return this.comment(comment)
                           })}
                       </ul>
                       </div>
                </div>)}
            </div>
        )
    }
}

function mapStateToProps({post,comment}){
    let mixPost = {}
    mixPost= {
        'posts': post,
        'comments': comment
    }
    return {mixPost}
}

function mapDispatchToProps (dispatch) {
    return {
        getPostDetail: (postId, postDetail) => dispatch(getPostDetail({postId,postDetail})),
        getComment: (comments) => dispatch(getComment(comments)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));

