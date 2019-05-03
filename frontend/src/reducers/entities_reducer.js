import { combineReducers } from 'redux';
import users from './users_reducer';
import posts from './posts_reducer';
import comments from './comments_reducer';

const EntitiesReducer = combineReducers({
  users,
  posts,
  comments
});

export default EntitiesReducer;