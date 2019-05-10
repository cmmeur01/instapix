import axios from 'axios';

export const fetchPosts = () => {
  return axios.get('/api/posts/');
};

export const fetchPost = (id) => {
  return axios.get(`/api/posts/id?id=${id}`);
};

export const fetchPostsByUserId = (id) => {
  return axios.get(`/api/posts/username?id=${id}`);
};

export const postComment = (post_id, user_id, text) => {
  return axios.post(`/api/posts/id/comment`, {post_id: post_id, user_id: user_id, text: text});
};
  
export const likePost = likeData => {
  return axios.post('/api/posts/like', likeData);
};

export const unlikePost = likeData => {
  return axios.patch('/api/posts/unlike', likeData);
};

export const sendPost = (post) => {
  return axios.post(`/api/posts/new`, post);
};

export const fetchMorePosts = numPosts => {
  return axios.get(`/api/posts/more?skipPosts=${numPosts}`);
};

export const fetchExplorePosts = () => {
  return axios.get('/api/posts/explore');
};