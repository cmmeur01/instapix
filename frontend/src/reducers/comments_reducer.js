import { RECEIVE_COMMENTS } from './../actions/comment_actions';
import { RECEIVE_POST, RECEIVE_POSTS } from './../actions/post_actions';
import merge from 'lodash/merge';

const CommentsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return merge([], state, action.comments);
    case RECEIVE_POST:
      let newState = merge([], state);
      let nextState = merge(newState, action.post.comments);
      return nextState;
    default:
      return state;
  }
}

export default CommentsReducer;