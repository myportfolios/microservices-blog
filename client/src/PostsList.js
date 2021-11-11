import React, { useEffect, useState } from 'react';
import CommonCreate from './CreateComment';
import CommentList from "./CommentList";
import axios from 'axios';

export default function PostsList() {
    const [posts, setPosts] = useState({});
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('http://localhost:8000/posts');
            console.log('res'. res)
            setPosts(res.data)
        }
        fetchPosts()
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className="card" key={post.id} style={{ width: "30%", marginBottom: "20px" }} >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments}/>
                    <CommonCreate postId={post.id} />
                </div>

            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}

function CommentInputSection() {
    return (
        <>
            <h6>Comment</h6>
            <input type='text' />
            <submit>Submit</submit>
        </>
    )
}

/**
 * 1. First, you would want to know which process is using port 3000 as example
   *** sudo lsof -i :3000 ******
   this will list all PID listening on this port, once you have the PID you can terminate it with the

   2. *** kill -9 {PID} **** where PID id the port Id gotten from step one above
 */