import React from 'react';
import { connect } from "react-redux";
import { followUser, unfollowUser } from './../../actions/user_actions';

class FollowButton extends React.Component {

  handleClick(e) {
    let { owner, currentUser } = this.props;
    e.preventDefault();
    if (owner.followers.includes(currentUser._id)) {
      this.props.unfollowUser(currentUser, owner._id);
    } else {
      this.props.followUser(currentUser, owner._id);
    }
  }

  render() {
    let {owner, currentUser} = this.props;
    // let text = owner.followers.includes(currentUser._id) ? "Unfollow" : "Follow";
    let button;
    if (owner.followers.includes(currentUser._id)) {
      button = <button onClick={this.handleClick.bind(this)} className="edit-profile-btn">Following</button>
    } else {
      button = (
        <button
          onClick={this.handleClick.bind(this)}
          className="edit-profile-btn inactive"
        >
          Follow
        </button>
      );
    }
      return (
      <div>
        {button}
      </div>
      );
  }

}

const mdp = dispatch => ({
  unfollowUser: (currentUser, id) => dispatch(unfollowUser(currentUser, id)),
  followUser: (currentUser, id) => dispatch(followUser(currentUser, id))
});

export default connect(null, mdp)(FollowButton);