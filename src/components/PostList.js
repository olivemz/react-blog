import React from 'react'

function post(item) {
    return (<li key={item.id}>
    <div>{item.title}</div>
    <div>{item.author}</div>
    <div>{item.commentCount}</div>
    <div>{item.voteScore}</div>
 </li>)
}

export default function PostList ({mixPost}) {

    console.log('mixPost is ',mixPost)

    // return ( <div className="List">
    //         {category.map((categoryName)=>{
    //             <div className={categoryName.name}><ul className='react'>
    //                 { post[categoryName.name].map((item)=>{
    //                     post(item)
    //                 })
    //                 }
    //             </ul></div>
    //         })}
    //         </div>)
    return (
        <div/>
    )

}