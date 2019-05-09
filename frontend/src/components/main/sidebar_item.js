import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from './../../actions/user_actions';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followed: false };
    this.handleFollow = this.handleFollow.bind(this);
  }

  handleFollow(e) {
    debugger;
    e.preventDefault();
    this.props.followUser(this.props.currentUserId, this.props.user._id);
    this.setState({ followed: true });
  }

  render() {
    const { user } = this.props;

    let followButton;
    if (!this.state.followed) {
      followButton = <div className='side-follow-btn'>
        <button onClick={this.handleFollow}>
          Follow
        </button>
      </div>;
    } else {
      followButton = <button>
        Following
      </button>;
    }

    return (
      <li className="side-lis">
        <div className="user-div">
          <Link to={`/users/${user.username}`}>
            <img src={user.image_url} alt="avatar" />
            <div className="user-p">
              <p className="first-p">{user.username}</p>
              <p className="second-p">{user.name}</p>
            </div>
          </Link>
        </div>
        {followButton}
      </li>
    )
  }
}

const msp = state => {
  return({
    currentUserId: state.session.user.id
  });
};

const mdp = dispatch => {
  return({
    followUser: (currentUserId, userId) => dispatch(followUser(currentUserId, userId)),
    unfollowUser: (currentUserId, userId) => dispatch(unfollowUser(currentUserId, userId))
  });
};

export default connect(msp, mdp)(SidebarItem);