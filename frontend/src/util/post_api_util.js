import axios from 'axios';

export const fetchPosts = () => {
  return axios.get('/api/posts/');
};

export const likePost = likeData => {
  return axios.post('/api/posts/like', likeData);
};

export const unlikePost = likeData => {
  return axios.patch('/api/posts/unlike', likeData);
};