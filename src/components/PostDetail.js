import React, {Component} from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route , withRouter} from 'react-router-dom'
import {getCategories,
    getComment,
    getPostDetail,
    getPosts,
    upsertComment,
    deleteComment} from "../actions";
import * as BlogAPI from "../BlogAPI";
import Modal from 'react-modal'

class PostDetail extends Component{
    state = {
        thisPostId: '',
        editComment: {},
        editPost: {},
        commentModalOpen: false,
        postModalOpen: false
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

    setCommentState(comment){
        this.setState(()=>({editComment: comment, commentModalOpen: true}))
    }

    comment = (comment) =>{
        return (<li key={comment.id}>
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.commentCount}</p>
            <p>{comment.timestamp}</p>
            <p>{comment.voteScore}</p>
            <button
                className='icon-btn'
                onClick={() => this.setCommentState(comment)}>
                Edit
            </button>
        </li>)
    }

    handleCommentChange(name, e){
        let editComment = this.state.editComment;
        editComment[name] = e.target.value;
        this.setState({editComment: editComment})
    }

    submitComment = () => {
        this.setState(()=>({commentModalOpen: false}))
    }

    render(){
        console.log("+++++++++",this);
        const {thisPostId, editComment, editPost, commentModalOpen, postModalOpen} = this.state
        let thisPost = this.props.mixPost.posts[thisPostId]
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


                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={commentModalOpen}
                    //onRequestClose={this.closeIngredientsModal}
                    contentLabel='Modal'
                >
                    <div>
                        <label>
                            Author:
                        <input
                            className='input'
                            type='text'
                            placeholder='Add Author'
                            value={('author' in this.state.editComment) ? this.state.editComment['author'] : ''}
                            onChange={this.handleCommentChange.bind(this, "author")}
                        />
                        </label>
                        <label>
                            comment:
                            <input
                                className='input'
                                type='text'
                                placeholder='Add Comment'
                                value={('body' in this.state.editComment) ? this.state.editComment['body'] : ''}
                                onChange={this.handleCommentChange.bind(this, "body")}
                            />
                        </label>
                        <label>
                            score:
                            <input
                                className='input'
                                type='text'
                                placeholder='Add score'
                                value={('voteScore' in this.state.editComment) ? this.state.editComment['voteScore'] : ''}
                                onChange={this.handleCommentChange.bind(this, "voteScore")}
                            />
                        </label>
                        <button
                            className='icon-btn'
                            onClick={this.submitComment}>
                            Submit Comment
                        </button>
                    </div>
                </Modal>

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
        getComment: (comments) => dispatch(getComment({comments})),
        upsertComment: (commentId, comment) => dispatch(upsertComment({commentId, comment})),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));

