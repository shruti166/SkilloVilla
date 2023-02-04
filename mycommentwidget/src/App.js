import Comment from "./components/Comment";
import "./App.css";
import { useState } from "react";
import currentUser from "./mockData/currentUser";
import CommentList from "./components/CommentList";

function App() {
  const [comments, setComments] = useState([]);

  const addComment = ({ id, commentData, date }) => {
    setComments((comments) => [
      ...comments,
      {
        id: id,
        profilePic: currentUser().profilePic,
        name: currentUser().name,
        commentData: commentData,
        date: String(new Date()),
        likes: 0,
        nestedComments: [],
      },
    ]);
    
  };
  return (
    <div className="App">
      <h1>MyCommentWidget</h1>
      <Comment addComment={addComment} />
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <CommentList
              id={comment.id}
              profilePic={comment.profilePic}
              name={comment.name}
              commentData={comment.commentData}
              date={comment.date}
              likes={comment.likes}
              nestedComment={comment.nestedComment}
            />
            
          </div>
        );
      })}
    </div>
  );
}

export default App;
