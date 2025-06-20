import React, { useState } from "react";
import "./CommentForm.css";

function CommentForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-form-row">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글 작성..."
          className="comment-input"
        />
        <button type="submit" className="comment-submit-btn">
          게시
        </button>
      </div>
    </form>
  );
}

export default CommentForm;