import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL
} from "./../actions/modal_actions";

const modalReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return {postId: action.postId};
    case CLOSE_MODAL:
      return { postId: null };
    case OPEN_PROFILE_MODAL:
      return { userId: action.userId };
    case CLOSE_PROFILE_MODAL:
      return { userId: null };
    default:
      return state;
  }
}

export default modalReducer;