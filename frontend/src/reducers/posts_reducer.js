import { RECEIVE_POSTS } from './../actions/post_actions';
import merge from 'lodash/merge';

const PostsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return merge({}, state, action.posts);
    default:
      return state;
  }
}

export default PostsReducer;