import React from 'react'
import PostDetail from './PostDetail';
import * as BlogAPI from "../BlogAPI";
import {connect} from "react-redux";
import { getComment,getPostDetail} from '../actions'


function post(item) {
    return (<li key={item.id}>
    <p>{item.title}</p>
    <p>{item.author}</p>
    <p>{item.commentCount}</p>
    <p>{item.voteScore}</p>
    <button
        className='page_detail'
        onClick={detailPage(item.id)}>
        view detail
    </button>
 </li>)
}

function detailPage(postId){
    BlogAPI.getPost(postId).then((posts)=>{
        this.props.getAllPosts(posts);
        console.log(posts);
    });
}

export function PostList (mixPost) {

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

function mapStateToProps({post,category}){
    let mixPost = {}
    console.log(post)
    if (category.length> 0){
        category.map((item)=>{
            mixPost[item.name] = {
                'posts': Object.values(post).filter( obj => obj.category === item.name).reduce((acc,cur)=> {acc[cur.id] = cur; return acc},{}),
                'path': item.path
            }
        })
    }
    return {mixPost}
}

function mapDispatchToProps (dispatch) {
    return {
        getPostDetail: (data,postId,postDetail) => dispatch(getPostDetail({data,postId,postDetail})),
        getComment: (data) => dispatch(getComment(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail);