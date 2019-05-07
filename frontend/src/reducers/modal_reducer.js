import { OPEN_LIKES_MODAL, CLOSE_MODAL, OPEN_LOGOUT_MODAL } from './../actions/modal_actions';
import { RECEIVE_USER_LOGOUT } from './../actions/session_actions';

const modalReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_LIKES_MODAL:
      return {postId: action.postId};
    case OPEN_LOGOUT_MODAL:
      return {logoutModal: true};
    case CLOSE_MODAL:
      return {};
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default modalReducer;