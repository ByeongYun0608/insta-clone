import React from "react";
import "./CommentList.css";

function CommentList({ comments, onDelete }) {
  if (!comments || comments.length === 0) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li className="comment-list-item" key={comment.id}>
          <span className="comment-list-nickname">익명</span>
          <span className="comment-list-content">{comment.content}</span>
          <button
            className="comment-list-delete-btn"
            onClick={() => onDelete(comment.id)}
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;