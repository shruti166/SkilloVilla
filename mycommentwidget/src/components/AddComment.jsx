import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getCurrentUserDetails from '../mockData/getCurrentUserDetails';
import '../styles/add.css';

function AddComment({ addComment })
{
    const [commentContent, setCommentContent] = useState('');
    return (
        <div className='addDiv'>
            <img src={getCurrentUserDetails().profilePic} alt='' />
            <textarea cols='75' placeholder='Join the discussion...' value={commentContent} onInput={e => setCommentContent(e.target.value)} />
            <button onClick={() => {
                if(commentContent.length > 0)
                {
                    addComment({ id: uuidv4(), commentContent: commentContent, commentDateTime: new Date()});
                    setCommentContent('');
                }
            }}>POST</button>
        </div>
    );
}

export default AddComment;