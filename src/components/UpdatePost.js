import React, {Component} from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route , withRouter} from 'react-router-dom'
import {
    deleteComment,
    getCategories,
    getComment,
    getPostDetail,
    getPosts,
    hideModal,
    showModal,
    upsertComment
} from "../actions";
import * as BlogAPI from "../BlogAPI";
import Modal from 'react-modal'

class UpdatePost extends Component{

    closePostModal = () =>{
        this.props.hideModal(null, {})
    }
    handlePostChange(name, e){
        let modalPropss = this.props.modal.modalProps;
        modalPropss[name] = e.target.value;
        this.props.showModal(
            'post',
            modalPropss
        )
    }
    submitPost = () =>{
        let modalPropss = this.props.modal.modalProps;
        let newPost = ('newPost' in this.props.modal.modalProps) ? true:false
        if (newPost){
            BlogAPI.createBlog(modalPropss).then((post) => {
                this.props.getPostDetail(post.id, post)
            })
        }else{
            BlogAPI.updateBlog(modalPropss.id, modalPropss).then((post) => {
                this.props.getPostDetail(post.id, post)
            })
        }

        this.closePostModal()
    }
    render(){
        let newPost = ('newPost' in this.props.modal.modalProps) ? true:false
        return (<Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={(this.props.modal.modalType==='post')?true:false}
            onRequestClose={this.closePostModal}
            contentLabel='Modal'>
                    <div>
                        <label>
                            Title:
                            <input
                                className='input'
                                type='text'
                                placeholder='Add Title'
                                value={('title' in this.props.modal.modalProps) ? this.props.modal.modalProps['title'] : ''}
                                onChange={this.handlePostChange.bind(this, "title")}
                            />
                        </label>
                        <label>
                            Body:
                            <input
                                className='input'
                                type='text'
                                placeholder='Add Body'
                                value={('body' in this.props.modal.modalProps) ? this.props.modal.modalProps['body'] : ''}
                                onChange={this.handlePostChange.bind(this, "body")}
                            />
                        </label>
                        {newPost && (
                            <label>
                                Author:
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Add Author'
                                    value={('author' in this.props.modal.modalProps) ? this.props.modal.modalProps['author'] : ''}
                                    onChange={this.handlePostChange.bind(this, "author")}
                                />
                            </label>)}
                        {newPost && (<label>
                            Category:
                            <input
                            className='input'
                            type='text'
                            placeholder='Add Category'
                            value={('category' in this.props.modal.modalProps) ? this.props.modal.modalProps['category'] : ''}
                            onChange={this.handlePostChange.bind(this, "category")}
                            />
                            </label>)}
                        <button
                            className='icon-btn'
                            onClick={this.submitPost}>
                            Submit Comment
                        </button>
                    </div>
            </Modal>
            )
    }
}

function mapStateToProps({post,modal}){
    return {'posts': post,
        'modal': modal}
}

function mapDispatchToProps (dispatch) {
    return {
        getPostDetail: (postId, postDetail) => dispatch(getPostDetail({postId,postDetail})),
        hideModal: (modalType, modalProps) => dispatch(hideModal({modalType, modalProps})),
        showModal: (modalType, modalProps) => dispatch(showModal({modalType, modalProps}))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePost);
