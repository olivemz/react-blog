export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const UPDATE_POST = 'UPDATE_POST'

export function getPosts (data) {
    return {
        type: GET_ALL_POSTS,
        data,
    }
}

export function getPostDetail ({ postId, postDetail}) {
    return {
        type: UPDATE_POST,
        postId,
        postDetail
    }
}
