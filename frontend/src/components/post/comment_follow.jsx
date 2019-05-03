import React from 'react';
import { connect } from "react-redux";
import { followUser, unfollowUser } from './../../actions/user_actions';

class CommentFollow extends React.Component {

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
    let { owner, currentUser } = this.props;
    let button;
    if (owner.followers !== undefined ) {
      if (owner.followers.includes(currentUser._id)) {
        button = <div onClick={this.handleClick.bind(this)} className="is-following">Unfollow</div>
      } else {
        button = (
          <div
            onClick={this.handleClick.bind(this)}
            className="not-follow"
          >
            Follow
          </div>
        );
      }
    }
    return (
      <div className="flw-user">
        {button}
      </div>
    );
  }

}

const mdp = dispatch => ({
  unfollowUser: (currentUser, id) => dispatch(unfollowUser(currentUser, id)),
  followUser: (currentUser, id) => dispatch(followUser(currentUser, id))
});

export default connect(null, mdp)(CommentFollow);