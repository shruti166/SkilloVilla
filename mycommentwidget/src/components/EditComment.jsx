import React, { useState } from 'react';
import '../styles/reply.css';

function EditComment({ isVisible, profilePic, currentCommentContent, setCurrentCommentContent, setIsEditing }) {
    const [commentContent, setCommentContent] = useState(currentCommentContent);

    if (isVisible)
        return (
            <div className='reply-comment-div'>
                <img src={profilePic} alt='Pic' />
                <textarea cols='75' placeholder='Join the discussion...' value={commentContent} onInput={e => setCommentContent(e.target.value)} />
                <div>
                    <div onClick={() => setIsEditing(curr => !curr)}>Cancel</div>
                    <button onClick={() => {
                        if (commentContent.length > 0) {
                            setCurrentCommentContent(commentContent);
                            setIsEditing(curr => !curr);
                        }
                    }}>Post</button>
                </div>
            </div>
        );
    else
        return null;
}

export default EditComment;