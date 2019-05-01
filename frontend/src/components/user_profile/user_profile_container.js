import { connect } from 'react-redux';
// import { login } from '../../actions/session_actions';
import UserProfile from './user_profile';

const msp = (state, ownProps) => ({
  currentUser: state.session.user,
});

const mdp = (dispatch) => ({

});

export default connect(msp, null)(UserProfile);