import axios from 'axios';

export const fetchPosts = () => {
  return axios.get('/api/posts/');
};