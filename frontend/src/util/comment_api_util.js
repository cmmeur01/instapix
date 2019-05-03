import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const fetchComments = (id) => {
  return axios.get(`/api/posts/comments/?id=${id}`);
};