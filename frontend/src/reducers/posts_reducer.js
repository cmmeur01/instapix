import { RECEIVE_POSTS, RECEIVE_POST } from './../actions/post_actions';
import { RECEIVE_CURRENT_USERS } from './../actions/user_actions';
import merge from 'lodash/merge';

const PostsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_POSTS:
      newState = merge({}, state);
      newState = action.posts;
      return newState;
    case RECEIVE_POST:
      newState = merge({}, state);
      newState = { [action.post.post._id]: action.post.post };
      return newState;
    // case RECEIVE_CURRENT_USERS:
    //   return merge({}, state, {[action.users});
    default:
      return state;
  }
}

export default PostsReducer;