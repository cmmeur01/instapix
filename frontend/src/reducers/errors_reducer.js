import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
// import errors from './errors_reducer';


const RootReducer = combineReducers({
  // errors,
  session: SessionErrorsReducer
});

export default RootReducer;