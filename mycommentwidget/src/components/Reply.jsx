import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getCurrentUserDetails from '../mockData/getCurrentUserDetails';
import '../styles/reply.css';

function Reply({ isVisible, username, setSubComments, setCanReply }) {
    const [commentContent, setCommentContent] = useState('');

    if (isVisible)
        return (
            <div className='replyDiv'>
                <img src={getCurrentUserDetails().profilePic} alt='Pic' height="50px" width = "50px"/>
                <textarea cols='75' placeholder='Join the discussion...' onInput={e => setCommentContent(e.target.value)} />
                <div>
                    <div onClick={() => setCanReply(curr => !curr)}>Cancel</div>
                    <button onClick={() => {
                        if (commentContent.length > 0) {
                            setSubComments(curr => [
                                ...curr,
                                {
                                    id: uuidv4(),
                                    profilePic: getCurrentUserDetails().profilePic,
                                    username: username,
                                    commentContent: commentContent,
                                    likes: 0,
                                    commentDateTime: new Date(),
                                    liked: false,
                                    currentSubComments: []
                                }
                            ]);
                            setCanReply(curr => !curr);
                        }
                    }}>Post</button>
                </div>
            </div>
        );
    else
        return null;
}

export default Reply;