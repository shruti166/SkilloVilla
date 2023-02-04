import React from "react";
import {useState} from "react";
import moment from "moment";

export default function CommentList({id, profilePic, name, commentData, date, likes, nestedComment}) {

  const [editStatus, setEditStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const time = moment().startOf(date).fromNow(); 
  return <div>
    <div className = "mainDiv">
      <img src = {profilePic} alt = "" height="50px"/>
      <span>{name}</span>
      <span>  {time} </span>
      
    </div>
    
    <span>{commentData}</span>
    
    <div className="actions-row">
      <span>{likesCount}</span>
      <span className="material-symbols-outlined comment-action" onClick={()=> {
        if(!likeStatus) {
          setLikesCount(curr => curr + 1)
          setLikeStatus(true);
        }
      }}>
        expand_less
      </span>
      <span>|</span>
      <span className="material-symbols-outlined comment-action" onClick={()=> {
        if(likeStatus) {
          setLikesCount(curr => curr - 1)
          setLikeStatus(false);
        }}}>
        expand_more</span>
    </div>
  </div>;
}

