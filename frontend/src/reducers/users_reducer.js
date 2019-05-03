
import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_CURRENT_USERS, UPDATE_FOLLOWING } from './../actions/user_actions';
import { RECEIVE_USER_LOGOUT } from './../actions/session_actions';

import merge from 'lodash/merge';
import { RECEIVE_POST } from '../actions/post_actions';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_USER:
      return merge({}, state, action.user);
    case RECEIVE_CURRENT_USERS:
      return merge({}, state, action.users);
    case UPDATE_FOLLOWING:
      let newState = merge({}, state);
      newState[action.id].following = action.data.following;
      newState[action.tgt_id].followers = action.data.followers;
      return newState;
    case RECEIVE_POST:
      let nextState = merge({}, state, action.post.user);
      let finalState = merge(nextState, state, action.post.users);
      return finalState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default UsersReducer;