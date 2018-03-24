import React, {Component} from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {getCategories, getComment, getPostDetail, getPosts} from "../actions";
import * as BlogAPI from "../BlogAPI";


class PostDetail extends Component{

    componentDidMount(){
        // Get detail page.
        BlogAPI.getPost(this.props.postId).then((posts)=>{
            console.log('123123',posts);
            this.props.getPostDetail(this.props.postId, posts)
        });

        BlogAPI.getPostComment(this.props.postId).then((comments)=>{
            console.log(comments);
            this.props.getComment(comments);
        });
    }

    render(){
        const {postId, posts, comments} = this.props
        const detailPost = posts[postId]
        return (
            <div className="detail">
                    return (<div key={postId}>
                    <h1>{detailPost.title}</h1>
                    <p>{detailPost.author}</p>
                    <p>{detailPost.body}</p>
                    <p>{detailPost.commentCount}</p>
                    <p>{detailPost.voteScore}</p>
                </div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail);

