import * as UserAPIUtil from "./../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_CURRENT_USERS = "RECEIVE_CURRENT_USERS";
export const UPDATE_FOLLOWING = "UPDATE_FOLLOWING";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

const receiveCurrentUser = users => {
  return {
    type: RECEIVE_CURRENT_USERS,
    users
  };
};

const receiveFollowing = (id, tgt_id, data) => {
  return {
    type: UPDATE_FOLLOWING,
    id,
    tgt_id,
    data
  };
};

const receiveSearchResults = users => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    users
  };
};

export const fetchUsers = () => dispatch => {
  return UserAPIUtil.fetchUsers().then(res => {
    return dispatch(receiveUsers(res.data));
  });
};

export const fetchCurrentUser = (id, username) => dispatch => {
  return UserAPIUtil.fetchCurrentUser(id, username).then(res => {
    return dispatch(receiveCurrentUser(res.data));
  });
};

export const fetchUser = username => dispatch => {
  return UserAPIUtil.fetchUser(username).then(res => {
    return dispatch(receiveUser(res.data));
  });
};

export const followUser = (user, id) => dispatch => {
  return UserAPIUtil.followUser(user, id).then(res => {
    return dispatch(receiveFollowing(user._id, id, res.data));
  });
};

export const unfollowUser = (user, id) => dispatch => {
  return UserAPIUtil.unfollowUser(user, id).then(res => {
    return dispatch(receiveFollowing(user._id, id, res.data));
  });
};

export const searchUsers = searchTerm => dispatch => {
  return UserAPIUtil.searchUsers(searchTerm).then(res => {
    return dispatch(receiveSearchResults(res.data.users));
  });
};

export const editProfile = (url, id) => dispatch => {
  return UserAPIUtil.editProfile(url, id).then(res => {
    return dispatch(receiveCurrentUser(res.data));
  });
};
