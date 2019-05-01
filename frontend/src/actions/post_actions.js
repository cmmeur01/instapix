import * as PostAPI from './../util/posts_api_util';

export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
});

export const updatePost = (post) => ({
  type: UPDATE_POST,
  post
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id
});

export const sumbitPost = post => dispatch => (
  PostAPI.submitPost(post).then(() => (
    dispatch(receivePost(post))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

// export const updatePost = post => dispatch => (
//   PostAPI.updatePost(post).then(() => (
//     dispatch(updatePost(post))
//   ), err => (
//     dispatch(receiveErrors(err.response.data))
//   ))
// );

// export const deletePost = id => dispatch => (
//   PostAPI.deletePost(id).then((id) => (
//     dispatch(deletePost(id))
//   ), err => (
//     dispatch(receiveErrors(err.response.data))
//   ))
// );