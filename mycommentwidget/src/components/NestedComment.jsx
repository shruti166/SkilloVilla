import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import CommentList from "./CommentList";
import Reply from "./Reply";
import EditComment from "./EditComment";
import "../styles/comment.css";

function SubComment({
  id,
  commentContent,
  username,
  profilePic,
  currentSubComments,
  commentDateTime,
  likes,
  liked,
  deleteSubComment,
}) {
  const [noOfLikes, setNoOfLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);
  const [currentCommentContent, setCurrentCommentContent] =
    useState(commentContent);
  const [subComments, setSubComments] = useState(currentSubComments);
  const [canReply, setCanReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dateTimeConstant = `${formatDistanceToNow(commentDateTime)} ago`;

  const deleteComment = (commentId) => {
    setSubComments((comments) =>
      comments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <React.Fragment>
      <div style={{ marginLeft: "3%" }}>
        {!isEditing ? (
          <div className="comment-div">
            <img src={profilePic} alt="Pic" height="50px" width="50px" />
            <div className="comment-content-div">
              <div>
                <span style={{ color: "#67c5fe", fontWeight: 800 }}>
                  {username}
                </span>

                <span style={{ color: "grey", fontSize: 10 }}>
                  {dateTimeConstant}
                </span>
              </div>
              <span>{currentCommentContent}</span>
              <span className="comment-content-third-row">
                {noOfLikes}
                <span
                  className="material-symbols-outlined comment-action"
                  style={{ color: isLiked ? "blue" : "grey" }}
                  onClick={() => {
                    if (!isLiked) {
                      setNoOfLikes((curr) => curr + 1);
                      setIsLiked((curr) => !curr);
                    }
                  }}
                >
                  expand_less
                </span>
                <span>|</span>
                <span
                  className="material-symbols-outlined comment-action"
                  onClick={() => {
                    if (isLiked) {
                      setNoOfLikes((curr) => curr - 1);
                      setIsLiked(false);
                    }
                  }}
                >
                  expand_more
                </span>

                <span
                  className="comment-action"
                  style={{ color: canReply ? "blue" : "grey" }}
                  onClick={() => {
                    setCanReply(false);
                  }}
                >
                  Reply
                </span>
                <span> | </span>
                <span
                  className="comment-action"
                  style={{ color: isEditing ? "blue" : "grey" }}
                  onClick={() => {
                    setIsEditing((curr) => !curr);
                  }}
                >
                  Edit
                </span>
                <span> | </span>
                <span
                  className="comment-action"
                  onClick={() => deleteSubComment(id)}
                >
                  Delete
                </span>
                <span> | </span>
              </span>
            </div>
          </div>
        ) : (
          <EditComment
            isVisible={isEditing}
            profilePic={profilePic}
            currentCommentContent={currentCommentContent}
            setCurrentCommentContent={(x) => setCurrentCommentContent(x)}
            setIsEditing={setIsEditing}
          />
        )}
        {subComments.length > 0
          ? subComments.map((comment) => (
              <CommentList
                key={comment.id}
                id={comment.id}
                currentCommentContent={comment.commentContent}
                username={comment.username}
                profilePic={comment.profilePic}
                currentSubComments={comment.subComments || []}
                commentDateTime={comment.commentDateTime}
                likes={comment.likes}
                liked={comment.liked}
                deleteComment={(id) => deleteComment(id)}
              />
            ))
          : null}
      </div>
      <Reply
        isVisible={canReply}
        username={username}
        setSubComments={setSubComments}
        setCanReply={setCanReply}
      />
    </React.Fragment>
  );
}

export default SubComment;
