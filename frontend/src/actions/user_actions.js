import * as UserAPIUtil from './../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

const receiveUsers = users => {
  return ({
    type: RECEIVE_USERS,
    users
  });
};

const receiveSearchResults = users => {
  return ({
    type: RECEIVE_SEARCH_RESULTS,
    users
  });
};

export const fetchUsers = () => dispatch => {
  return UserAPIUtil.fetchUsers().then(res => {
    return dispatch(receiveUsers(res.data.users));
  });
};

export const searchUsers = searchTerm => dispatch => {
  return UserAPIUtil.searchUsers(searchTerm).then(res => {
    return dispatch(receiveSearchResults(res.data.users));
  });
};