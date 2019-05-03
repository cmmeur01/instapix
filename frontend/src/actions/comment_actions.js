import * as CommentAPIUtil from './../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

const receiveComments = comments => {
  return ({
    type: RECEIVE_COMMENTS,
    comments
  });
};

export const fetchComments = (id) => dispatch => {
  return CommentAPIUtil.fetchComments(id).then(res => {
    return dispatch(receiveComments(res.data));
  });
};