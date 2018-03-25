export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_COMMENT = 'GET_ALL_COMMENT'
export const UPDATE_POST = 'UPDATE_POST'
export const UPSERT_ONE_COMMENT = "UPSERT_ONE_COMMENT"
export const DELETE_ONE_COMMENT = "DELETE_ONE_COMMENT"
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


export function getPostDetail ({ postId, postDetail}) {
    return {
        type: UPDATE_POST,
        postId,
        postDetail
    }
}

// Comment actions.

export function getComment ({comments}) {
    return {
        type: GET_ALL_COMMENT,
        comments
    }
}

export function upsertComment ({ comment}) {
    return {
        type: UPSERT_ONE_COMMENT,
        comment,
    }
}

export function deleteComment ({commentId}) {
    return {
        type: DELETE_ONE_COMMENT,
        commentId
    }
}

