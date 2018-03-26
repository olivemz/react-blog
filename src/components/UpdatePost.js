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
        this.props.hideModal({
            modalType: null,
            modalProps: {}
        })
    }
    handlePostChange(name, e){
        let modalPropss = this.props.modal.modalProps;
        modalPropss[name] = e.target.value;
        this.props.showModal({
            modalType: 'post',
            modalProps: modalPropss
        })
    }
    submitPost = () =>{
        let modalPropss = this.props.modal.modalProps;

        BlogAPI.updateBlog(modalPropss.id, modalPropss).then((post) => {
            console.log(post);
            this.props.getPostDetail(post.id, post)
        })

        this.closePostModal()
    }
    render(){
        return (<div key={this.state.thisPostId}>
            {this.props.modal.modalType==='Post' && (<Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.postModalOpen}
                    onRequestClose={this.closePostModal}
                    contentLabel='Modal'>
                    <div>
                        <label>
                            Title:
                            <input
                                className='input'
                                type='text'
                                placeholder='Add Title'
                                value={('title' in this.state.editPost) ? this.state.editPost['title'] : ''}
                                onChange={this.handlePostChange.bind(this, "title")}
                            />
                        </label>
                        <label>
                            Body:
                            <input
                                className='input'
                                type='text'
                                placeholder='Add Body'
                                value={('body' in this.state.editPost) ? this.state.editPost['body'] : ''}
                                onChange={this.handlePostChange.bind(this, "body")}
                            />
                        </label>
                        <button
                            className='icon-btn'
                            onClick={this.submitPost}>
                            Submit Comment
                        </button>
                    </div>
                </Modal>)}

            </div>
            )
    }
}

function mapStateToProps({post,modal}){
    let mixPost = {}
    mixPost= {
        'posts': post,
        'modal': modal
    }
    return {mixPost}
}

function mapDispatchToProps (dispatch) {
    return {
        getPostDetail: (postId, postDetail) => dispatch(getPostDetail({postId,postDetail})),
        hideModal: (content) => dispatch(hideModal(content)),
        showModal: (content) => dispatch(showModal(content))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePost);
