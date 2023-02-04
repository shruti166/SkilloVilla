import React from "react";
import {useState} from "react";
import moment from "moment";
import EditComment from "./EditComment";

export default function CommentList({id, profilePic, name, commentData, date, likes, nestedComment}) {

  const [editStatus, setEditStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [edited, setEdited] = useState(commentData);
  const time = moment().startOf(date).fromNow(); 
  

  
        
      
  return <React.Fragment>
    
    <div className = "mainDiv">
      <img src = {profilePic} alt = "" height="50px"/>
      <span style={{color: ""}}>{name}</span>
      <span style={{color: "gray"}}>  {time} </span>
      
    </div>
    
    <span>{commentData}</span>
    
    <div className="actions-row">
      <span>{likesCount}</span>
      <span className="material-symbols-outlined comment-action" style = {{ color: likeStatus ? "blue" : "black"}} onClick={()=> {
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
        <span onClick = {() => setEditStatus(true)}>Edit</span>
        <span> | </span>
        <span>Delete</span>
        <span> | </span>
        <span>Reply</span>
    </div> 

    <EditComment edited = {edited} />
      

</React.Fragment>
    
}

