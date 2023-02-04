import React from "react";
import { useState } from "react";
import moment from "moment";
import EditComment from "./EditComment";
import Reply from "./Reply";
import NestedComment from "./NestedComment";

export default function CommentList({
  id,
  profilePic,
  name,
  commentData,
  date,
  likes,
  nestedComment,
}) {
  const [editStatus, setEditStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [edited, setEdited] = useState(commentData);
  const [replyStatus, setReplyStatus] = useState(false);
  const [nestedComments, setNestedComments] = useState([]);

  const time = moment().startOf(date).fromNow();
  const deleteSubComment = (id) => {
    setNestedComments((comments) =>
      comments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <React.Fragment>
      <div style={{ marginLeft: "3%" }}>
        {!editStatus ? (
          <div className="comment-div">
            <img src={profilePic} alt="" height="50px" />
            <div className="comment-content-div">
              <div>
                <span style={{ color: "", fontWeight: 900 }}>{name}</span>

                <span style={{ color: "grey", fontSize: 12 }}> {time} </span>
                <span> {edited} </span>
              </div>

              <span className="comment-content-third-row">
                {likesCount}
                <span
                  className="material-symbols-outlined comment-action"
                  style={{ color: likeStatus ? "blue" : "grey" }}
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
                <span> | </span>
                <span
                  className="comment-action"
                  onClick={() => setReplyStatus(true)}
                >
                  Reply
                </span>
                <span> | </span>
                <span
                  className="comment-action"
                  style={{ color: editStatus ? "blue" : "grey" }}
                  onClick={() => {
                    setEditStatus(true);
                  }}
                >
                  Edit
                </span>
                <span> | </span>
                <span className="comment-action">Delete</span>
                <span> | </span>
              </span>
            </div>
          </div>
        ) : (
          <EditComment
            edited={edited}
            setEditStatus={setEditStatus}
            editStatus={editStatus}
            profilePic={profilePic}
            setEdited={setEdited}
          />
        )}
        {nestedComments.length > 0
          ? nestedComments.map((comment) => {
              return (
                <div key={comment.id}>
                  {!editStatus ? (
                    <div className="comment-div">
                      <img src={profilePic} alt="" height="50px" />
                      <div className="comment-content-div">
                        <div>
                          <span style={{ color: "", fontWeight: 900 }}>
                            {name}
                          </span>

                          <span style={{ color: "grey", fontSize: 12 }}>
                            {" "}
                            {time}{" "}
                          </span>
                          <span> {edited} </span>
                        </div>

                        <span className="comment-content-third-row">
                          {likesCount}
                          <span
                            className="material-symbols-outlined comment-action"
                            style={{ color: likeStatus ? "blue" : "grey" }}
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
                          <span> | </span>
                          <span
                            className="comment-action"
                            onClick={() => setReplyStatus(true)}
                          >
                            Reply
                          </span>
                          <span> | </span>
                          <span
                            className="comment-action"
                            style={{ color: editStatus ? "blue" : "grey" }}
                            onClick={() => {
                              setEditStatus(true);
                            }}
                          >
                            Edit
                          </span>
                          <span> | </span>
                          <span className="comment-action">Delete</span>
                          <span> | </span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <EditComment
                      edited={edited}
                      setEditStatus={setEditStatus}
                      editStatus={editStatus}
                      profilePic={profilePic}
                      setEdited={setEdited}
                    />
                  )}
                </div>
              );
            })
          : null}
      </div>
      {replyStatus ? (
        <Reply
          name={name}
          setNestedComments={setNestedComments}
          setReplyStatus={setReplyStatus}
          nestedComments={nestedComments}
        />
      ) : null}
    </React.Fragment>
  );
}
