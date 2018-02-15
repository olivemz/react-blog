const api = "http://localhost:3001"

let token = 'some token'

const headers = {
    'Authorization': token
}

export const getAllPosts = () =>
    fetch(`${api}/posts`, {headers}).then(res => res.json())

export const getAllCategories = () =>
    fetch(`${api}/categories`, {headers}).then(res => res.json())

export const getCategoryPosts = (categoryId) =>
    fetch(`${api}/${categoryId}/posts`, {headers}).then(res => res.json())

export const getPost = (postId) =>
    fetch(`${api}/posts/${postId}`, {headers}).then(res => res.json())

export const getPostComment = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, {headers}).then(res => res.json())

export const getComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {headers}).then(res => res.json())

export const createBlog = (newBlog) =>
    fetch(`${api}/posts`, {
     method:'POST', headers: headers, body:JSON.stringify({newBlog})
    }).then(res => res.json())

export const voteBlog = (blogId, option ) =>
    fetch(`${api}/posts/${blogId}`,{
        method:'POST', headers : headers, body: JSON.stringify({option})
    }).then(res => res.json())

export const updateBlog = (blogId, content ) =>
    fetch(`${api}/posts/${blogId}`,{
        method:'PUT', headers : headers, body: JSON.stringify({content})
    }).then(res => res.json())

export const deleteBlog = (blogId ) =>
    fetch(`${api}/posts/${blogId}`,{
        method:'DELETE', headers : headers
    }).then(res => res.json())

export const createComent = (content) =>
    fetch(`${api}/comments`,{
        method:'POST', headers : headers, body: JSON.stringify({content})
    }).then(res => res.json())

export const voteComment = (commentId, option) =>
    fetch(`${api}/comments/${commentId}`,{
        method:'POST', headers : headers, body: JSON.stringify({option})
    }).then(res => res.json())

export const editComment = (commentId, content) =>
    fetch(`${api}/comments/${commentId}`,{
        method:'PUT', headers : headers, body: JSON.stringify({content})
    }).then(res => res.json())


export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`,{
        method:'DELETE', headers : headers
    }).then(res => res.json())

