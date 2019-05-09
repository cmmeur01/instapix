import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { fetchCurrentUser } from './../../actions/user_actions';
import { fetchPostsByUserId } from './../../actions/post_actions';
import {openProfileModal} from './../../actions/modal_actions';
// import { stat } from 'fs';
import { openLogoutModal } from './../../actions/modal_actions';

const msp = (state, ownProps) => {
  return {
    currentUser: state.session.user.id,
    modalUser: state.entities.users[state.session.user.id],
    users: state.entities.users,
    posts: state.entities.posts,
    modal: state.ui.modal
  };
};

const mdp = dispatch => ({
  fetchPostsByUserId: id => dispatch(fetchPostsByUserId(id)),
  fetchCurrentUser: (id, username) => dispatch(fetchCurrentUser(id, username)),
  openProfileModal: id => dispatch(openProfileModal(id)),
  openLogoutModal: () => dispatch(openLogoutModal())

});

export default connect(msp, mdp)(UserProfile);