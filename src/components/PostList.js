import React from 'react'

function post(item) {
    return (<li>
    <div>{item.title}</div>
    <div>{item.author}</div>
    <div>{item.commentCount}</div>
    <div>{item.voteScore}</div>
 </li>)
}

export default function PostList ({ posts }) {

    if (!posts || posts.length === 0) {
        return <p>Your search has 0 results.</p>
    }

    return (
        (<ul className='food-list'>
            {posts.map((item) => (
                post(item)
            ))}

        </ul>)
    )
}