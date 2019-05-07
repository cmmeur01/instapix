export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL';
export const CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL';

export const openModal = (postId) => {
  return ({
    type: OPEN_MODAL,
    postId
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