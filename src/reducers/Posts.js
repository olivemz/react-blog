import has from 'lodash'
import {GET_ALL_POSTS, UPDATE_POST} from "../actions/Posts";
const initialPostState = {}

export function post (state = initialPostState, action) {
    let arrReturn = {...state};
    switch (action.type) {
        case GET_ALL_POSTS :
            var {data} = action
            if (!data) return state
            arrReturn = has.mapKeys(data, (item)=>item.id)
            return arrReturn
        case UPDATE_POST:
            var {postId,postDetail} = action
            arrReturn[postId] = postDetail
            return arrReturn
        default :
            return state
    }
}
