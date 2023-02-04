import React, { useState } from "react";

function EditComment({
  edited,
  setEditStatus,
  editStatus,
  profilePic,
    setEdited,
  commentData
}) {
  const [updatedComment, setUpdatedComment] = useState(commentData);

  return (
    <div className="reply-comment-div">
      <img src={profilePic} alt="" height="50px" />
      <textarea
        placeholder="Join the discussion..."
        value={updatedComment}
        onInput={(e) => setUpdatedComment(e.target.value)}
      />
      <div>
        <div onClick={() => setEditStatus(false)}>Cancel</div>
        <button
          onClick={() => {
            if (updatedComment.length > 0) {
               setEdited(updatedComment)
               
              setEditStatus(false);
            }
          }}
        >
          POST
        </button>
        
      </div>
    </div>
  );
}

export default EditComment;
