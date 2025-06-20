import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchImageDetail,
  fetchComments,
  postComment,
  deleteComment,
} from "../api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import "./DetailPage.css";

function DetailPage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const img = await fetchImageDetail(id);
        const comm = await fetchComments(id);
        setImage(img);
        setComments(comm);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSubmit = async (content) => {
    try {
      await postComment(id, content);
      const comm = await fetchComments(id);
      setComments(comm);
    } catch (err) {
      alert("댓글 작성 실패: " + err.message);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      const comm = await fetchComments(id);
      setComments(comm);
    } catch (err) {
      alert("댓글 삭제 실패: " + err.message);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!image) return <div>이미지 정보가 없습니다.</div>;

  return (
    <div className="detailpage-outer">
      <div className="detailpage-inner">
        <h2 className="detailpage-title">{image.title}</h2>
        <p className="detailpage-content">{image.content}</p>
        <img
          src={image.image_url}
          alt={image.title}
          className="detailpage-image"
        />

        {/* 댓글 개수 + 입력창 박스 */}
        <div className="detailpage-commentbox">
          <div className="detailpage-commentcount">
            댓글: {comments.length}개
          </div>
          <CommentForm onSubmit={handleSubmit} />
        </div>

        {/* 댓글 리스트 */}
        <CommentList comments={comments} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default DetailPage;