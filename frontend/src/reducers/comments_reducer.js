import { RECEIVE_COMMENTS } from './../actions/comment_actions';
import merge from 'lodash/merge';

const CommentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return merge({}, state, action.comments);
    default:
      return state;
  }
}

export default CommentsReducer;