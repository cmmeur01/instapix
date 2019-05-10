import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_FEED_POSTS,
  RECEIVE_MORE_POSTS,
  RECEIVE_EXPLORE_POSTS
} from "./../actions/post_actions";
// import { RECEIVE_CURRENT_USERS } from './../actions/user_actions';
import { RECEIVE_USER_LOGOUT } from './../actions/session_actions';
import merge from 'lodash/merge';

const PostsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_FEED_POSTS:
      return action.data.posts;
    case RECEIVE_POST:
      newState = merge({}, state);
      newState = { [action.post.post._id]: action.post.post};
      return newState;
    case RECEIVE_USER_LOGOUT:
        return {};
    case RECEIVE_MORE_POSTS:
      return merge({}, state, action.posts.posts);
    case RECEIVE_EXPLORE_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default PostsReducer;