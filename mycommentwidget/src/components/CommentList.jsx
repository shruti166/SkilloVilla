import React from "react";
import { useState } from "react";
import moment from "moment";

export default function CommentList({
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
  return (
    <div >
      <div className="mainDiv" >
        <img src={profilePic} alt="" style = {{width: "50px", height: "50px"}}/>
        <div className="comment-div" >
          <p style={{ color: "#4cbaff", fontWeight: "900" }}>{name}</p>
          <span> {time} </span>
        </div>
      </div>
      <div>{commentData}</div>
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
      </span>
    </div>
  );
}
