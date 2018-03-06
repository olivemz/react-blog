import React from 'react'

function post(item) {
    return (<li key={item.id}>
    <p>{item.title}</p>
    <p>{item.author}</p>
    <p>{item.commentCount}</p>
    <p>{item.voteScore}</p>
 </li>)
}

export default function PostList (mixPost) {

    console.log('mixPost is ',mixPost)


    return ( <div className="List">
            {('post' in mixPost) && Object.values(mixPost['post']).map(obj => {
                console.log('obj is', obj);
                if ('posts' in obj && 'path' in obj)
                return (<div key={obj.path}><ul className={obj.path}>
                    { Object.values(obj.posts).map((postItem)=>{
                        console.log('postItem', postItem);
                        return post(postItem)
                    })
                    }
                </ul></div>)
                }
            )}
            </div>)

}