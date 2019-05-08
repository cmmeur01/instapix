import { connect } from 'react-redux';
import { closeProfileModal } from './../../actions/modal_actions';
import React from 'react';
import axios from "axios";
import {editProfile} from './../../actions/user_actions';
import './../../assets/stylesheets/modal.css';

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
    this.removeCurrPhoto = this.removeCurrPhoto.bind(this);
  }

  removeCurrPhoto() {
    this.props
      .editProfile(
        "https://66.media.tumblr.com/d136cd5a19ac53bc5bd06c2deb91e52b/tumblr_pqs5kovMCM1vud73ko1_400.jpg",
        this.props.currentUser.id
      )
      .then(() => this.props.closeProfileModal());
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    let that = this;
    reader.onloadend = res => {
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post("/api/users/images/upload", formData)
        .then(url => {
          that.props.editProfile(url.data.imageUrl, that.props.currentUser.id);
        })
        .then(() => {
          that.props.closeProfileModal();
        });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div className="modal-bg" onClick={this.props.closeModal}>
        <div
          className="modal-inner-profile-edit"
          onClick={e => e.stopPropagation()}
        >
          <h3>Change Profile Photo</h3>
          <div className="edit-profile-buttons">
            <div className="edit-profile-button">
              <label for="file-upload" class="custom-file-upload">
                Upload Photo
              </label>
              <input id="file-upload" type="file" onChange={this.handleFile} />
            </div>
            <div className="edit-profile-button">
              <button
                className="edit-profile-button remove-cur-btn"
                onClick={this.removeCurrPhoto}
              >
                Remove Current Photo
              </button>
            </div>
            <div className="edit-profile-button cancel-btn">
              <button onClick={this.props.closeProfileModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  let userId;
  if (state.ui.modal.userId) {
    userId = state.ui.modal.userId;
  }
  return ({
    userId,
    currentUser: state.session.user
  })
}

const mdp = dispatch => {
  return {
    closeProfileModal: () => dispatch(closeProfileModal()),
    editProfile: (url, id) => dispatch(editProfile(url, id))
  };
}

export default connect(msp, mdp)(ProfileModal);