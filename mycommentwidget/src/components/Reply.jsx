import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import currentUser from '../mockData/currentUser.js'



function ReplyComment({name, setNestedComments, nestedComments, setReplyStatus }) {
    const [commentContent, setCommentContent] = useState("");

   
        return (
            <div className='reply-comment-div'>
                <img src={currentUser().profilePic} alt='Pic' />
                <textarea cols='75' placeholder='Join the discussion...' onInput={e => setCommentContent(e.target.value)} />
                <div>
                    <div onClick={() => setReplyStatus(false)}>Cancel</div>
                    <button onClick={() => {
                        if (commentContent.length > 0) {
                            setNestedComments( nestedComments => 
                                [...nestedComments, 
                                {
                                    id: uuidv4(),
                                    profilePicUrl: currentUser().profilePic,
                                    name: name,
                                    commentContent: commentContent,
                                    likes: 0,
                                    date: new Date(),
                                    currentSubComments: []
                                }
                               
                            ]);
                            
                            setReplyStatus(false);
                        }
                        
                    }}>Post</button>
                    
                   
                </div>
            </div>
        );
    
}

export default ReplyComment;