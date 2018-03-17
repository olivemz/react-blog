export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_COMMENT = 'GET_COMMENT'
export const UPDATE_POST = 'UPDATE_POST'

export function getPosts (data) {
    return {
        type: GET_ALL_POSTS,
        data,
    }
}

export function getCategories (data) {
    return {
        type: GET_ALL_CATEGORIES,
        data,
    }
}

export function getComment (data) {
    return {
        type: GET_COMMENT,
        data,
    }
}

export function getPostDetail ({data, postId, postDetail}) {
    return {
        type: UPDATE_POST,
        data,
        postId,
        postDetail
    }
}

