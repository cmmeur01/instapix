import search from './search_reducer';
import modal from './modal_reducer';
import { combineReducers } from 'redux';
// import merge from 'lodash/merge';

const UIReducer = combineReducers({
  search,
  modal
});

export default UIReducer;