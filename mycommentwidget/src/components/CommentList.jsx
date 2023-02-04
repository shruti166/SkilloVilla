import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Reply from './Reply';
import NestedComment from './NestedComment';
import EditComment from './EditComment';
import '../styles/comment.css';

function CommentList({ id, currentCommentContent, username, profilePic, currentSubComments, commentDateTime, likes, liked, deleteComment }) {
    const [likeCount, setlikeCount] = useState(likes);
    const [likeStatus, setlikeStatus] = useState(liked);
    const [commentContent, setCommentContent] = useState(currentCommentContent);
    const [subComments, setSubComments] = useState(currentSubComments);
    const [canReply, setCanReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dateTimeConstant = `${formatDistanceToNow(commentDateTime)} ago`;

    const deleteSubComment = (subCommentId) => {
        setSubComments(subComments => subComments.filter(subComment => subComment.id !== subCommentId));
    };

    return (
        <React.Fragment>
            <div style={{ marginLeft: '3%' }}>
                {!isEditing?
                <div className='mainCommentDiv'>
                    <img src={profilePic} alt='Pic' height="50px" width= "50px"/>
                    <div className='comment-content-div'>
                        <div>
                            <span style={{ color: '#67c5fe', fontWeight: 700 }}>{username}</span>
                            <span style={{ color: 'grey' }}>.</span>
                            <span style={{ color: 'grey', fontSize: 12 }}>{dateTimeConstant}</span>
                        </div>
                        <span>{commentContent}</span>
                        <span className='comment-content-third-row'>
                            {likeCount}
                            <span
                                className='material-symbols-outlined comment-action'
                                style={{ color: likeStatus ? 'green' : 'red' }}
                                onClick={() => {
                                    if (!likeStatus) {
                                        setlikeCount(curr => curr + 1);
                                        setlikeStatus(curr => !curr);
                                    }
                                }}
                            >
                                expand_less
                            </span>
                            <span>|</span>
                            <span
                                className='material-symbols-outlined comment-action'
                                onClick={() => {
                                    if (likeStatus) {
                                        setlikeCount(curr => curr - 1);
                                        setlikeStatus(curr => !curr);
                                    }
                                }}
                            >
                                expand_more
                            </span>
                            <span> | </span>
                            <span
                                className='comment-action'
                                style={{ color: canReply ? 'blue' : 'grey' }}
                                onClick={() => {
                                    setCanReply(curr => !curr);
                                }}
                            >Reply</span>
                           <span> | </span>
                            <span
                                className='comment-action'
                                style={{ color: isEditing ? 'blue' : 'grey' }}
                                onClick={() => {
                                    setIsEditing(curr => !curr);
                                }}
                            >Edit</span>
                           <span> | </span>
                            <span className='comment-action' onClick={() => deleteComment(id)}>Delete</span>
                            <span> | </span>
                        </span>
                    </div>
                </div>
                :
                <EditComment
                    isVisible={isEditing}
                    profilePic={profilePic}
                    currentCommentContent={commentContent}
                    setCurrentCommentContent={(x) => setCommentContent(x)}
                    setIsEditing={setIsEditing}
                />}
                {
                    subComments.length > 0 ?
                        subComments.map(comment =>
                        (

                            <NestedComment
                                key={comment.id}
                                id={comment.id}
                                commentContent={comment.commentContent}
                                username={comment.username}
                                profilePic={comment.profilePic}
                                currentSubComments={comment.subComments || []}
                                commentDateTime={comment.commentDateTime}
                                likes={comment.likes}
                                liked={comment.liked}
                                deleteSubComment={ subCommentId => deleteSubComment(subCommentId) }
                            />
                        )
                        )
                        :
                        null
                }
            </div>
            {
                canReply ?
                    <Reply isVisible={true} username={username} setSubComments={setSubComments} setCanReply={setCanReply} />
                    :
                    null
            }
        </React.Fragment>
    );
}

export default CommentList;