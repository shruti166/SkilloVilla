import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import currentUserComment from "../mockData/currentUserComment.js";

export default function Comment({ addComment }) {
  const [commentData, setCommentData] = useState("");
  return (
    <div className="add-comment-div">
      <img src={currentUserComment().profilePic} alt="" style = {{width: "50px", height: "50px"}}/>
      <input
        type="text"
        placeholder="Join the discussion..."
        value={commentData}
        onInput={(e) => setCommentData(e.target.value)}
      />
      <button
        onClick={() => {
          if (commentData.length > 0) {
            addComment({
              id: uuidv4(),
              commentData: commentData,
              commentDate: new Date(),
            });
          }
        }}
      >
        SEND
      </button>
    </div>
  );
}
