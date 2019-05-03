import { RECEIVE_USERS } from './../actions/user_actions';
import { RECEIVE_USER_LOGOUT } from './../actions/session_actions';
import merge from 'lodash/merge';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default UsersReducer;