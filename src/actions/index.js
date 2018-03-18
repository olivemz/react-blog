export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_COMMENT = 'GET_COMMENT'
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

export function getComment (data, comments) {
    return {
        type: GET_ALL_COMMENT,
        data,
        comments
    }
}

export function getPostDetail ({ postId, postDetail}) {
    return {
        type: UPDATE_POST,
        postId,
        postDetail
    }
}

