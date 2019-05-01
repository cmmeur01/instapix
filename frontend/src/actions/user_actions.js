import * as UserAPIUtil from './../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => {
  return ({
    type: RECEIVE_USERS,
    users
  });
};

export const fetchUsers = () => dispatch => {
  return UserAPIUtil.fetchUsers().then(res => {
    return dispatch(receiveUsers(res.data.users));
  });
};