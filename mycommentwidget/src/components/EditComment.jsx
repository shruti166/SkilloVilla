import React, { useState } from 'react';


function EditComment({ edited, editStatus, profilePic, name, date}) {
    console.log(edited);

    
        return (
            <div className='reply-comment-div'>
            {/* //     <img src={profilePicUrl} alt='Pic' />
            //     <textarea cols='75' placeholder='Join the discussion...' value={commentContent} onInput={e => setCommentContent(e.target.value)} />
            //     <div>
            //         <div onClick={() => setIsEditing(curr => !curr)}>Cancel</div>
            //         <button onClick={() => { */}
            {/* //             if (commentContent.length > 0) { */}
            {/* //                 setCurrentCommentContent(commentContent);
            //                 setIsEditing(curr => !curr);
            //             }
            //         }}>Post</button> */}
            {/* //     </div> */}
            </div>
        )
    
}

export default EditComment;
