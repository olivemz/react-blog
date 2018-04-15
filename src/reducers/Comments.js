import {GET_ALL_COMMENT, UPSERT_ONE_COMMENT} from "../actions/Comments";
import has from 'lodash'
const initialCommentState = {}

export function comment (state = initialCommentState, action) {
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