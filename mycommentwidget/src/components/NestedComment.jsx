import React, { useState } from 'react';
import moment from 'moment';
import CommentList from './CommentList';
import Reply from './Reply';
import EditComment from './EditComment';
import '../styles/comment.css';


function NestedComment({ id, commentContent, username, profilePicUrl, currentNestedComments, commentDateTime, likes, liked, deleteNestedComment }) {
    const [noOfLikes, setNoOfLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);
    const [currentCommentContent, setCurrentCommentContent] = useState(commentContent);
    const [NestedComments, setNestedComments] = useState(currentNestedComments);
    const [canReply, setCanReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const time = moment().startOf(commentDateTime).fromNow()
    const deleteComment = (commentId) => {
        setNestedComments(comments => comments.filter(comment => comment.id !== commentId));
    };

    return (
        <React.Fragment>
            <div style={{ marginLeft: '3%' }}>
                {!isEditing ?
                    <div className='comment-div'>
                        <img src={profilePicUrl} alt='Pic' />
                        <div className='comment-content-div'>
                            <div>
                                <span style={{ color: '#2AC0D1', fontWeight: 500 }}>{username}</span>
                                <span className='dot' style={{ color: 'grey' }}>.</span>
                                <span style={{ color: 'grey', fontSize: 12 }}>{time}</span>
                            </div>
                            <span>{currentCommentContent}</span>
                            <span className='comment-content-third-row'>
                                {noOfLikes}
                                <span
                                    className='material-symbols-outlined comment-action'
                                    style={{ color: isLiked ? 'blue' : 'grey' }}
                                    onClick={() => {
                                        if (!isLiked) {
                                            setNoOfLikes(curr => curr + 1);
                                            setIsLiked(curr => !curr);
                                        }
                                    }}
                                >
                                    expand_less
                                </span>
                                <span>|</span>
                                <span
                                    className='material-symbols-outlined comment-action'
                                    onClick={() => {
                                        if (isLiked) {
                                            setNoOfLikes(curr => curr - 1);
                                            setIsLiked(curr => !curr);
                                        }
                                    }}
                                >
                                    expand_more
                                </span>
                                <span className='dot'>.</span>
                                <span
                                    className='comment-action'
                                    style={{ color: canReply ? 'blue' : 'grey' }}
                                    onClick={() => {
                                        setCanReply(curr => !curr);
                                    }}
                                >Reply</span>
                                <span className='dot'>.</span>
                                <span
                                    className='comment-action'
                                    style={{ color: isEditing ? 'blue' : 'grey' }}
                                    onClick={() => {
                                        setIsEditing(curr => !curr);
                                    }}
                                >Edit</span>
                                <span className='dot'>.</span>
                                <span className='comment-action' onClick={() => deleteNestedComment(id)}>Delete</span>
                                <span className='dot'>.</span>
                            </span>
                        </div>
                    </div>
                    :
                    <EditComment
                        isVisible={isEditing}
                        profilePicUrl={profilePicUrl}
                        currentCommentContent={currentCommentContent}
                        setCurrentCommentContent={(x) => setCurrentCommentContent(x)}
                        setIsEditing={setIsEditing}
                    />}
                {
                    NestedComments.length > 0 ?
                        NestedComments.map(comment =>
                        (
                            <CommentList
                                key={comment.id}
                                id={comment.id}
                                currentCommentContent={comment.commentContent}
                                username={comment.username}
                                profilePicUrl={comment.profilePicUrl}
                                currentNestedComments={comment.NestedComments || []}
                                commentDateTime={comment.commentDateTime}
                                likes={comment.likes}
                                liked={comment.liked}
                                deleteComment={(id) => deleteComment(id)}
                            />
                        )
                        )

                        :
                        null
                }
            </div>
            <Reply isVisible={canReply} username={username} setNestedComments={setNestedComments} setCanReply={setCanReply} />
        </React.Fragment>
    );
}

export default NestedComment;