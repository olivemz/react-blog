import { combineReducers } from 'redux'
import has from 'lodash'

import {
    GET_ALL_POSTS,GET_ALL_CATEGORIES,GET_ALL_COMMENT,UPDATE_POST
} from '../actions'

const initialPostState = {}
const initialCommentState = {}
const initialCategoryState = []

function post (state = initialPostState, action) {
    let arrReturn = {};
    switch (action.type) {
        case GET_ALL_POSTS :
            const {data} = action
            if (!data) return state
            arrReturn = has.mapKeys(data, (item)=>item.id)
            console.log('arrReturn+++++',arrReturn);
            return arrReturn
        case UPDATE_POST:
            console.log('current state:', state);
            const {postId,postDetail} = action
            arrReturn = state
            arrReturn[postId] = postDetail
            console.log('arrReturn+++++',arrReturn);
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
            arrReturn = []
            const {comments} = action
            arrReturn = has.mapKeys(comments, (comments)=>comments.id)
            return arrReturn
        default :
            return state
    }
}

export default combineReducers({
    post,
    category,
    comment
})