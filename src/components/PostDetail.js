import React, {Component} from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route , withRouter} from 'react-router-dom'
import {getCategories, getComment, getPostDetail, getPosts} from "../actions";
import * as BlogAPI from "../BlogAPI";


class PostDetail extends Component{
    state = {
        thisPost: ''
    }
    componentDidMount(){
        const url = this.props.location.pathname
        let postId, category = ''
        let arrVariable = url.split("/")
        if (arrVariable.length == 3){
            category = arrVariable[1]
            postId = arrVariable[2]
        }
        console.log("this.pros",this.props)
        // Get detail page.
        BlogAPI.getPost(postId).then((posts)=>{
            console.log('123123',posts);
            this.props.getPostDetail(postId, posts);
            this.setState({
                thisPost:this.props.mixPost.post[postId]
            })
        });

        BlogAPI.getPostComment(postId).then((comments)=>{
            console.log(comments);
            this.props.getComment(comments);
        });
    }

    render(){
        return (
            <div className="detail">
                   <div key={this.state.thisPost.id}>
                    <h1>{this.state.thisPost.title}</h1>
                    <p>{this.state.thisPost.author}</p>
                    <p>{this.state.thisPost.body}</p>
                    <p>{this.state.thisPost.commentCount}</p>
                    <p>{this.state.thisPost.voteScore}</p>
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));

