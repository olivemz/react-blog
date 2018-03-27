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
        console.log('123123',this.props)
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

        BlogAPI.updateBlog(modalPropss.id, modalPropss).then((post) => {
            this.props.getPostDetail(post.id, post)
        })
        this.closePostModal()
    }
    render(){
        console.log(this.props);
        console.log(this.state);
        return (
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
                        <button
                            className='icon-btn'
                            onClick={this.submitPost}>
                            Submit Comment
                        </button>
                    </div>
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
