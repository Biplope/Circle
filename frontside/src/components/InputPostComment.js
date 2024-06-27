import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../redux/actions/commentActions";
import "../styles/CommentStyle.css";

const InputPostComment = ({ children, pos, comment, onReply, setOnReply }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (onReply) return setOnReply(false);
      return;
    }
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ pos, newComment, auth, socket }));
    if (onReply) return setOnReply(false);
    SetContent("");
  };
  const [content, SetContent] = useState("");
  return (
<div className="inputpostcomments p-1 bg-light rounded shadow-sm">
      <div className="d-flex align-items-center mb-3 mr-3">
        <img src={auth.user.avatar} alt="User avatar" className="rounded-circle me-3" style={{ width: "40px", height: "40px" }} />
        {children}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Input your opinion"
          value={content}
          onChange={(e) => SetContent(e.target.value)}
        />
        <button className="btn btn-primary mb-3 ml-3" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default InputPostComment;
