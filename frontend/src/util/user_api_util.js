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

// export const searchUsers = searchTerm => {
//   return axios({
//     url: '/api/users/search',
//     method: 'post',
//     data: {searchTerm}
//   })
// };

export const searchUsers = searchTerm => {
  // debugger;
  return axios.post('/api/users/search', {searchTerm});
};


