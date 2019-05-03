import { OPEN_MODAL, CLOSE_MODAL } from './../actions/modal_actions';

const modalReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return {postId: action.postId};
    case CLOSE_MODAL:
      return { postId: null };
    default:
      return state;
  }
}

export default modalReducer;