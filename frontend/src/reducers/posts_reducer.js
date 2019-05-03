import { RECEIVE_POSTS } from './../actions/post_actions';
import { RECEIVE_USER_LOGOUT } from './../actions/session_actions';
import merge from 'lodash/merge';

const PostsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return merge({}, state, action.posts);
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default PostsReducer;