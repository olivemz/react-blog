import { combineReducers } from 'redux'
import has from 'lodash'

import {
    GET_ALL_POSTS,
    GET_ALL_CATEGORIES,
    GET_ALL_COMMENT,
    UPDATE_POST,
    UPSERT_ONE_COMMENT,
    DELETE_ONE_COMMENT,
    SHOW_MODAL,
    HIDE_MODAL
} from '../actions'

const initialPostState = {}
const initialCommentState = {}
const initialCategoryState = []
const intialModalState = {
    modalType: null,
    modalProps: {}
}

function post (state = initialPostState, action) {
    let arrReturn = {};
    switch (action.type) {
        case GET_ALL_POSTS :
            var {data} = action
            if (!data) return state
            arrReturn = has.mapKeys(data, (item)=>item.id)
            return arrReturn
        case UPDATE_POST:
            var {postId,postDetail} = action
            arrReturn = state
            arrReturn[postId] = postDetail
            return arrReturn
        default :
            return state
    }
}

function category (state = initialCategoryState, action) {

    switch (action.type) {
        case GET_ALL_CATEGORIES :
            const {data} = action
            if (!('categories' in data)) return state
            return data.categories
        default :
            return state
    }
}

function comment (state = initialCommentState, action) {
    let arrReturn = state;
    switch (action.type) {
        case GET_ALL_COMMENT :
            var {comments} = action
            arrReturn = has.mapKeys(comments, (comment)=>comment.id)
            return arrReturn
        case UPSERT_ONE_COMMENT:
            var {commentId, comment} = action
            arrReturn[commentId] = comment
            return arrReturn
        default :
            return state
    }
}

function modal (state = intialModalState, action){
    switch (action.type){
        case HIDE_MODAL:
            return {
                modalType: null,
                modalProps: {}
            }
        case SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        default:
            return state
    }
}

export default combineReducers({
    post,
    category,
    comment,
    modal
})