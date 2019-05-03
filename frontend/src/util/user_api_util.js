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

export const searchUsers = searchTerm => {
  return axios.post('/api/users/search', {searchTerm});
};

export const fetchSuggestions = () => {
  return axios.get('/api/users/suggestions');
};