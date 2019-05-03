import { connect } from 'react-redux';
import { closeModal } from './../../actions/modal_actions';
import React from 'react';
import { findPost, findUsers } from './../../reducers/selectors';
import './../../assets/stylesheets/modal.css';

class Modal extends React.Component {

  render() {
    if (!this.props.postId) {
      return null;
    } else {
      return (
        <div className="modal-bg" onClick={this.props.closeModal}>
          <div className="modal-inner" onClick={e => e.stopPropagation()}>
            <h4>This is the modal</h4>
          </div>
        </div>
      )
    }
  }
}



const msp = state => {
  let postId;
  let post;
  let users;
  if (state.ui.modal.postId) {
    postId = state.ui.modal.postId;
    post = findPost(state);
    users = findUsers(state);
  }

  return ({
    postId,
    post,
    users
  })
}

const mdp = dispatch => {
  return ({
    closeModal: () => dispatch(closeModal())
  })
}

export default connect(msp, mdp)(Modal);