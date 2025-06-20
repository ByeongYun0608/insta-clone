const BASE_URL = "https://rxlahlpuscpdneaxdrrk.functions.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bGFobHB1c2NwZG5lYXhkcnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MDczODYsImV4cCI6MjA2Mzk4MzM4Nn0.yyyRqGoCtrPjdCjSsxp4_vfNkAJ54PYxxfklB5ISpOQ";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

// 게시글 목록 불러오기
export async function fetchImages() {
  const res = await fetch(`${BASE_URL}/posts`, { headers });
  if (!res.ok) throw new Error("이미지 목록을 불러오지 못했습니다.");
  return res.json();
}

// 게시글 상세 정보 불러오기 (필요하다면)
export async function fetchImageDetail(id) {
  const res = await fetch(`${BASE_URL}/posts`, { headers });
  if (!res.ok) throw new Error("이미지 정보를 불러오지 못했습니다.");
  const data = await res.json();
  const post = data.find((item) => item.id === Number(id));
  if (!post) throw new Error("해당 이미지를 찾을 수 없습니다.");
  return post;
}

// 댓글 목록 불러오기
export async function fetchComments(postId) {
  const res = await fetch(`${BASE_URL}/comments/${postId}`, { headers });
  if (!res.ok) throw new Error("댓글 목록을 불러오지 못했습니다.");
  return res.json();
}

// 댓글 작성
export async function postComment(selectedPost, content) {
  const res = await fetch(`${BASE_URL}/comments/${selectedPost}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 작성에 실패했습니다.");
  return res.json();
}

// 댓글 삭제
export async function deleteComment(selectedPost, commentId) {
  const res = await fetch(`${BASE_URL}/comments/${selectedPost}?comment_id=${commentId}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("댓글 삭제에 실패했습니다.");
  return res.json();
}