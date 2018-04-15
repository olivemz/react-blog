import { combineReducers } from 'redux'

import {category} from "./Categories"
import {post} from "./Posts"
import {comment} from "./Comments"
import {modal} from "./Modal"

export default combineReducers({
    post,
    category,
    comment,
    modal
})