import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import CommentList from "./components/CommentList";
import AddComment from "./components/AddComment";
import getFakeComment from "./mockData/getFakeComment";
import getFakeCommentOfCurrentUser from "./mockData/getFakeCommentOfCurrentUser";
import getCurrentUserDetails from "./mockData/getCurrentUserDetails";
import "./App.css";

function App() {
  const currentUser = getCurrentUserDetails();
  const [comments, setComments] = useState([]);
  const options = [
    "Most Recent",
    "Oldest",
    "Likes - Low to High",
    "Likes - High to Low",
  ];

  const onOptionChangeHandler = (event) => {
    sortComments(parseInt(event.target.value));
  };

  const sortComments = (optionSelected) => {
    let newComments = [...comments];
    if (optionSelected === 0)
      newComments.sort((a, b) => b.commentDateTime - a.commentDateTime);
    else if (optionSelected === 1)
      newComments.sort((a, b) => a.commentDateTime - b.commentDateTime);
    else if (optionSelected === 2)
      newComments.sort((a, b) => b.likes - a.likes);
    else if (optionSelected === 3)
      newComments.sort((a, b) => a.likes - b.likes);
    let x = optionSelected;
    if (x === 0 || x === 1 || x === 2 || x === 3)
      setComments(
        newComments.map((comment) => ({
          id: uuidv4(),
          ...comment,
        }))
      );
  };

  const generateFakeComment = useCallback(() => {
    const comment = getFakeComment();
    if (comment.likedBy.includes(currentUser.userId)) comment.liked = true;
    else comment.liked = false;
    return comment;
  }, [currentUser.userId]);

  const generateFakeCommentByCurrentUser = useCallback(() => {
    const comment = getFakeCommentOfCurrentUser();
    if (comment.likedBy.includes(currentUser.userId)) comment.liked = true;
    else comment.liked = false;
    return comment;
  }, [currentUser.userId]);

  const generateSampleApiData = useCallback(() => {
    const comment1 = generateFakeComment();
    const comment2 = generateFakeCommentByCurrentUser();
    const comment3 = generateFakeComment();
    const comment4 = generateFakeComment();
    comment1.subComments.push(comment2);
    comment2.subComments.push(comment3);
    comment3.subComments.push(comment4);
    const comment5 = generateFakeCommentByCurrentUser();

    return [comment1, comment5];
  }, [generateFakeComment, generateFakeCommentByCurrentUser]);

  const deleteComment = (id) => {
    setComments((comments) => comments.filter((comment) => comment.id !== id));
  };

  const addComment = ({ id, commentContent, commentDateTime }) => {
    setComments((comments) => [
      ...comments,
      {
        id: id,
        profilePic: getCurrentUserDetails().profilePic,
        username: getCurrentUserDetails().username,
        commentContent: commentContent,
        commentDateTime: commentDateTime,
        likes: 0,
        likedBy: [],
        subComments: [],
      },
    ]);
  };

  useEffect(() => {
    setComments(generateSampleApiData());
  }, [generateSampleApiData]);

  return (
    <div className="App">
      <h1 style = {{textAlign: "center"}}>MY COMMENT WIDGET APP</h1>
      <AddComment
        profilePic={getCurrentUserDetails().profilePic}
        addComment={addComment}
      />
      <select onChange={onOptionChangeHandler} className="sort-select">
        <option>SORT</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={index}>
              {option}
            </option>
          );
        })}
      </select>
      {comments.map((comment) => (
        <CommentList
          key={comment.id}
          id={comment.id}
          profilePic={comment.profilePic}
          username={comment.username}
          currentCommentContent={comment.commentContent}
          likes={comment.likes}
          commentDateTime={comment.commentDateTime}
          liked={comment.liked}
          currentSubComments={comment.subComments}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}

export default App;
