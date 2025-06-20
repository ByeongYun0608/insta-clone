import React, { useEffect, useState } from "react";
import { fetchImages } from "../api";
import { useNavigate } from "react-router-dom";
import "./FeedPage.css";

function FeedPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages()
      .then((data) => {
        console.log("받아온 이미지 목록 ▶️", data);
        console.log("첫 번째 이미지 ▶️", data[0]);
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="feedpage-outer">
      <div className="feedpage-inner">
        {/* 상단 프로필/소개 영역 */}
        <div className="feedpage-profile">
          <img
            src="/lion.png"
            alt="logo"
            className="feedpage-logo"
          />
          <div className="feedpage-profile-text">
            <h2 className="feedpage-title">likeLion_13th_frontend</h2>
            <div className="feedpage-desc">
              멋쟁이사자처럼 13기 여러분 화이팅! 어른사자로 폭풍성장중..
            </div>
            <div className="feedpage-count">게시물: {images.length}개</div>
          </div>
        </div>
        {/* 카드 그리드 */}
        <div className="feedpage-grid">
          {images.map((img) => (
            <div
              key={img.id}
              className="feedpage-card"
              onClick={() => navigate(`/image/${img.id}`)}
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="feedpage-card-img"
              />
              <h3 className="feedpage-card-title">{img.title}</h3>
              <p className="feedpage-card-content">{img.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedPage;