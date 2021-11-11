import React, {useState} from 'react';
import axios from 'axios';
import './App.scss'


export default function CreatePost() {
    const emptyString = '';
    const [title, setTitle] = useState(emptyString);
    const handleSubmit = async (e) => {
        e.preventDefault();
       await axios.post('http://localhost:8001/posts', {
            title
        });
        setTitle(emptyString)
    }
    return (
        <div>
            <h3>Title</h3>
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
            <button style={{display:'block'}} onClick={(e) => {handleSubmit(e)}} className="btn btn-primary">Submit</button>
        </div>
    )
}