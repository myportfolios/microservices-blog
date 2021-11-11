import React, { useState } from 'react';
import axios from 'axios';


const CommonCreate = ({ postId }) => {
    const [comment, setComment] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        //make api call to post service
        const commentURl = `http://localhost:8002/posts/${postId}/comments`
        await axios.post(commentURl, {
            comment
        })
        //clear input field
        setComment(' ')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="form-control" />
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}
export default CommonCreate;