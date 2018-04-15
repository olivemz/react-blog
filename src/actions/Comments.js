export const GET_ALL_COMMENT = 'GET_ALL_COMMENT'
export const UPSERT_ONE_COMMENT = "UPSERT_ONE_COMMENT"


// Comment actions.

export function getComment ({comments}) {
    return {
        type: GET_ALL_COMMENT,
        comments
    }
}

export function upsertComment ({commentId, comment}) {
    return {
        type: UPSERT_ONE_COMMENT,
        commentId,
        comment
    }
}