import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const fetchUsers = () => {
  return axios.get('/api/users/');
};

export const fetchUser = (username) => {
  return axios.get(`/api/users/username?username=${username}`);
};

export const fetchCurrentUser = (id, username) => {
  return axios.get(`/api/users/current?id=${id}&&username=${username}`);
};

export const unfollowUser = (user, id) => {
  return axios.patch('/api/users/username', { user: user, id: id });
};


export const followUser = (user, id) => {
  return axios.post('/api/users/username', {user: user, id: id});
};


