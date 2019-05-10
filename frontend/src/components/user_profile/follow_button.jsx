import React from 'react';
import { connect } from "react-redux";
import { followUser, unfollowUser } from './../../actions/user_actions';

class FollowButton extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: false
    };
  }

  handleClick(e) {
    this.setState({"clicked": true});
    let { owner, currentUser } = this.props;
    e.preventDefault();
    if (owner.followers.includes(currentUser._id)) {
      this.props.unfollowUser(currentUser, owner._id)
        .then(() => {
          this.setState({ "clicked": false});
        });
    } else {
      this.props.followUser(currentUser, owner._id)
        .then(() => {
          this.setState({ "clicked": false });
        });
    }
  }

  render() {
    debugger
    let {owner, currentUser} = this.props;
    // let text = owner.followers.includes(currentUser._id) ? "Unfollow" : "Follow";
    let button;
    if (owner.followers.includes(currentUser._id)) {
      button = <button onClick={this.handleClick.bind(this)} className="edit-profile-btn">Unfollow</button>
    } else {
      button = (
        <button
          disabled={this.state.clicked}
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
