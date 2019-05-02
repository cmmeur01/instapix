import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_CURRENT_USERS, UPDATE_FOLLOWING } from './../actions/user_actions';
import merge from 'lodash/merge';

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
      debugger
      return newState;
    default:
      return state;
  }
}

export default UsersReducer;