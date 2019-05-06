import { connect } from 'react-redux';
import { closeModal } from './../../actions/modal_actions';
import { Link } from 'react-router-dom';
import React from 'react';
import { findPost, findUsers } from './../../reducers/selectors';
import './../../assets/stylesheets/modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.getLikes = this.getLikes.bind(this);
  }

  getLikes() {
    if (!this.props.users) return null;
    let users = this.props.users;

    

    const results = users.map((user, i) => {
      let followButton = '';
      if (user._id !== this.props.currentUser.id) {
        followButton = <div>
          <button className="follow-btn">Follow</button>
        </div>
      }
      return (
        <li className="li-users" key={i}>
          <div className="user-div likes-li">
            <Link to={`/users/${user.name}`}>
              <img src={user.image_url} alt="avatar" />
              <div className="user-p">
                <p className="first-p">{user.username}</p>
                <p className="second-p">{user.name}</p>
              </div>
            </Link>
          </div>
          {followButton}
        </li>
      );
    });
    return results;
  }

  render() {
    if (!this.props.postId) {
      return null;
    } else {
      return (
        <div className="modal-bg" onClick={this.props.closeModal}>
          <div className="modal-inner" onClick={e => e.stopPropagation()}>
            <div className="likes-div">
              <div className="likes-header">
                <div><h4>Likes</h4></div>
                <div className="x"><img onClick={this.props.closeModal} className="close" src="http://cdn.onlinewebfonts.com/svg/img_228759.png" alt="close" /></div>
              </div>
            {this.getLikes()}
            </div> 
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
    users,
    currentUser: state.session.user
  })
}

const mdp = dispatch => {
  return ({
    closeModal: () => dispatch(closeModal())
  })
}

export default connect(msp, mdp)(Modal);