import { RECEIVE_SEARCH_RESULTS } from './../actions/user_actions';
import merge from 'lodash/merge';

const UIReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return { searchResults: action.users };
    default:
      return state;
  }
}

export default UIReducer;