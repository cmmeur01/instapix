import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const sumbitPost = postData => {
  return axios.post("/api/users/images/upload", postData);
};

// need postid from form when updating
// export const updatePost = postData => {
//   return axios.patch("/api/images/upload", postData);
// };

