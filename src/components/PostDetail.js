import React, {Component} from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route , withRouter, Link} from 'react-router-dom'
import {
    showModal, hideModal
} from "../actions/Modal";
import * as BlogAPI from "../BlogAPI";
import Modal from 'react-modal'
import UpdatePost from './UpdatePost'

import {getPostDetail, getPosts} from '../actions/Posts'
import {getComment,upsertComment} from '../actions/Comments'
import {getAllCategories} from "../BlogAPI";
import {getAllPosts} from "../BlogAPI";


class PostDetail extends Component{
    state = {
        thisPostId: '',
        editComment: {},
        editPost: {},
        commentModalOpen: false,
        postModalOpen: false,
        blnNewComment: false,
    }

    componentDidMount(){
        const {postId, category} = this.props.match.params
        //console.log("this.pros",this.props)
        // Get detail page.
        BlogAPI.getPost(postId).then((posts)=>{
            //console.log('123123',posts);
            this.props.getPostDetail(postId, posts);
            this.setState(() => ({ thisPostId: postId}))
        });

        BlogAPI.getPostComment(postId).then((comments)=>{
            //console.log('comments',comments);
            this.props.getComment(comments);
        });
    }



    setCommentState(comment){
        this.setState(()=>({editComment: comment, commentModalOpen: true}))
    }


    addNewComment(){
        // generate new comment id and time stamp.
        let newComment = {
            id: Math.floor(Date.now()),
            parentId: this.state.thisPostId,
            timestamp: Math.floor(Date.now()),
            body: '',
            author: '',
        }
        this.setState(()=>({editComment:newComment, commentModalOpen: true, blnNewComment:true}))
    }

    comment = (comment) =>{
        return (<li key={comment.id}>
            <p>Author: {comment.author}</p>
            <p>Body: {comment.body}</p>
            <p>time: {comment.timestamp}</p>
            <p>VoteScore: {comment.voteScore}</p>
            <div>
                <div>
            <button
                className='icon-btn'
                onClick={() => this.setCommentState(comment)}>
                Edit Comment
            </button>
                </div>
                <div>
            <button onClick={()=>this.deleteComment(comment.id)}>
                Delete Comment
            </button>
            </div>
            <div>
            <button onClick={()=>this.voteComment(comment.id,'upVote')}>
                vote up Comment
            </button>

            <button onClick={()=>this.voteComment(comment.id,'downVote')}>
                vote Donw Comment
            </button>
            </div>
                </div>
        </li>)
    }

    handleCommentChange(name, e){
        let editComment = this.state.editComment;
        editComment[name] = e.target.value;
        this.setState({editComment: editComment})
    }

    submitComment = () => {
        const {editComment, blnNewComment} = this.state
        if(!blnNewComment){
            // timestamp: timestamp. Get this however you want.
            //     body: String
            let postComment = {
                body: editComment.body,
                timestamp: Math.floor(Date.now())+111111111111
            }

            BlogAPI.editComment(editComment.id, postComment).then((comment) => {
                this.props.upsertComment(comment.id, comment)
            })
        }
        else{
            let postComment = {
                parentId: editComment.parentId,
                author: editComment.author,
                id: editComment.id,
                body: editComment.body,
                timestamp: Math.floor(Date.now())+111111111111
            }
            BlogAPI.createComent(postComment).then((comment) => {
                this.props.upsertComment(comment.id, comment)
                BlogAPI.getPost(postComment.parentId).then((postDetail)=>{this.props.getPostDetail(postDetail.id, postDetail)})
            });

        }
        this.closeCommentModal()
    }

    closeCommentModal = () =>{
        this.setState(()=>({commentModalOpen: false, blnNewComment: false, editComment:{}}))
    }

    voteBlog(blogId,VoteOption){
        //VoteOption is either 'upVote' or 'downVote'
        let voteBody = {option:VoteOption}
        BlogAPI.voteBlog(blogId,voteBody).then((blog)=>{this.props.getPostDetail(blog.id, blog)})

    }

    voteComment(commentId,VoteOption){
        //VoteOption is either 'upVote' or 'downVote'
        let voteBody = {option:VoteOption}
        BlogAPI.voteComment(commentId,voteBody).then((comment)=>{this.props.upsertComment(comment.id, comment)})
    }

    deleteComment(commentId){
        BlogAPI.deleteComment(commentId).then((comment)=>{this.props.upsertComment(comment.id, comment)})
    }

    render(){
        const {thisPostId, editComment, editPost, commentModalOpen, postModalOpen} = this.state
        const thisPost = this.props.mixPost.posts[thisPostId]
        let thisComments = Object.values(this.props.mixPost.comments).filter(comment => (comment.parentId === this.state.thisPostId&& comment.deleted ===false))
        return (
            <div className="detail">
                <Link
                    to={"/"}
                >Back to main page</Link>

                {thisPost && (
                   <div key={thisPost.id}>
                    <h1>Title: {thisPost.title}</h1>
                    <p>Author: {thisPost.author}</p>
                    <p>Body: {thisPost.body}</p>
                    <p>Comment Count: {thisPost.commentCount}</p>
                    <p>Vote Score: {thisPost.voteScore}</p>
                      <div>
                       <button
                           className='icon-btn'
                           onClick={() => this.props.showModal(
                                   'post',
                                   thisPost
                               )}>
                           Edit Post
                       </button>
                      </div>
                       <div>
                       <button onClick={()=>this.voteBlog(thisPost.id,'upVote')}>
                           vote up Post
                       </button>
                       <button onClick={()=>this.voteBlog(thisPost.id,'downVote')}>
                           vote Down Post
                       </button>
                           </div>
                       <div className="comments"><ul>
                           <h2>Comments</h2>
                           <button
                               className='icon-btn'
                               onClick={() => this.addNewComment()}>
                               Add New Comment
                           </button>
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
                    onRequestClose={this.closeCommentModal}
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
                        <button
                            className='icon-btn'
                            onClick={this.submitComment}>
                            Submit Comment
                        </button>
                    </div>
                </Modal>
                <UpdatePost
                />
            </div>
        )
    }
}

function mapStateToProps({post,comment,modal}){
    let mixPost = {}
    mixPost= {
        'posts': post,
        'comments': comment,
        'modal': modal
    }
    return {mixPost}
}

function mapDispatchToProps (dispatch) {
    return {
        getPostDetail: (postId, postDetail) => dispatch(getPostDetail({postId,postDetail})),
        getComment: (comments) => dispatch(getComment({comments})),
        upsertComment: (commentId, comment) => dispatch(upsertComment({commentId, comment})),
        showModal: (modalType, modalProps) => dispatch(showModal({modalType, modalProps})),
        hideModal: (modalType, modalProps) => dispatch(hideModal({modalType, modalProps}))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));

