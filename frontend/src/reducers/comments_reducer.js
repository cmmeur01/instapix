import { RECEIVE_COMMENTS } from './../actions/comment_actions';
import { RECEIVE_POST, RECEIVE_FEED_POSTS } from './../actions/post_actions';
import merge from 'lodash/merge';

const CommentsReducer = (state = [], action) => {
  // debugger;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return merge([], state, action.comments);
    case RECEIVE_POST:
      let newState = merge([], state);
      let nextState = merge(newState, action.post.comments);
      return nextState;
    case RECEIVE_FEED_POSTS:
      return action.data.comments;
    default:
      return state;
  }
}

export default CommentsReducer;