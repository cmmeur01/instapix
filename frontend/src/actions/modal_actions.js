export const OPEN_LIKES_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL';
export const CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL';
export const OPEN_LOGOUT_MODAL = 'OPEN_LOGOUT_MODAL';


export const openLikesModal = (postId) => {
  return ({
    type: OPEN_LIKES_MODAL,
    postId
  });
};

export const openLogoutModal = () => {
  return ({
    type: OPEN_LOGOUT_MODAL
  });
};

export const closeModal = () => {
  return ({
    type: CLOSE_MODAL
  });
};


export const openProfileModal = (userId) => {
  return ({
    type: OPEN_PROFILE_MODAL,
    userId
  });
};

export const closeProfileModal = () => {
  return ({
    type: CLOSE_PROFILE_MODAL
  });
};