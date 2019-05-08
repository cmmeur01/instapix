import {
  OPEN_LIKES_MODAL,
  CLOSE_MODAL,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
  OPEN_LOGOUT_MODAL,
  PIC_LOADED,
  PIC_LOADING
} from "./../actions/modal_actions";
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
    case OPEN_PROFILE_MODAL:
      return { userId: action.userId };
    case CLOSE_PROFILE_MODAL:
      return {};
    case RECEIVE_USER_LOGOUT:
      return {};
    case PIC_LOADED:
      return {};
    case PIC_LOADING:
      return { picLoading: true };
    default:
      return state;
  }
};

export default modalReducer;