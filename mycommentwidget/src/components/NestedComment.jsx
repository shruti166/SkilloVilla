import React from 'react';
import EditComment from './EditComment';
import { useState } from 'react';
import moment from 'moment';
import CommentList from './CommentList';

export default function NestedComment({
    id,
    profilePic,
    name,
    date,
    commentData,
    likes,
    nestedComments,
  }) {
    const [commentValue, setCommentValue] = useState();
    const [likesCount, setLikesCount] = useState(likes);
    const [subComments, setSubComments] = useState(nestedComments);
    const [editStatus, setEditStatus] = useState(false);
    const [likeStatus, setLikeStatus] = useState(false);
  
    const time = moment().startOf(date).fromNow();
  
    const deleteComment = (commentId) => {
        setSubComments(comments => comments.filter(comment => comment.id !== commentId));
    };

    return (
      <div>
        {!editStatus ? (
          <div className="mainDiv">
            <img
              src={profilePic}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
            <div className="comment-div">
              <div>
                <p style={{ color: "#4cbaff", fontWeight: "900" }}>{name}</p>
                <span> {time} </span>
              </div>
  
              <div>{commentValue}</div>
              <span className="actions-row">
                {likesCount}
                <span
                  className="material-symbols-outlined comment-action"
                  onClick={() => {
                    if (!likeStatus) {
                      setLikesCount((curr) => curr + 1);
                      setLikeStatus(true);
                    }
                  }}
                >
                  expand_less
                </span>
                <span>|</span>
                <span
                  className="material-symbols-outlined comment-action"
                  onClick={() => {
                    if (likeStatus) {
                      setLikesCount((curr) => curr - 1);
                      setLikeStatus(false);
                    }
                  }}
                >
                  expand_more
                </span>
                <span onClick={() => setSubComments(nestedComments)}>REPLY</span>
                <span onClick={() => setEditStatus(true)}>EDIT</span>
                <span onClick = {deleteComment(id)}>DELETE</span>
              </span>
            </div>
          </div>
        ) : (
          <EditComment profilePic={profilePic} commentValue = {(e) => setCommentValue(e)} setEditStatus={setEditStatus} />
        )}
        {subComments.length > 0
          ? subComments.map((comment) => (
              <CommentList
                key={comment.id}
                id={comment.id}
                commentContent={comment.commentContent}
                username={comment.username}
                profilePic={comment.profilePic}
                currentSubComments={comment.subComments || []}
                date = {comment.date}
                likes={comment.likes}
               
                deleteSubComment={(subCommentId) =>
                  deleteComment(subCommentId)
                }
              />
             
            ))
          : null}
      </div>
    );
  }
  
