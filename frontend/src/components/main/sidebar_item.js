import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from './../../actions/user_actions';
import "./../../assets/stylesheets/sidebar.css";


class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followed: false };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.clicked = false;
  }

  handleFollow(e) {
    e.preventDefault();
    this.setState({ clicked: true });
    this.props.followUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: true, clicked: false }));
  }

  handleUnfollow(e) {
    e.preventDefault();
    this.setState({ clicked: true })
    this.props.unfollowUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: false, clicked: false }));
  }

  render() {
    const { user } = this.props;

    let followButton;
    if (!this.state.followed) {
      followButton = (
        <div className="side-follow-btn">
          <button disabled={this.state.clicked} onClick={this.handleFollow}>
            Follow
          </button>
        </div>
      );
    } else {
      followButton = (
        <div className="side-unfollow-btn">
          <button disabled={this.state.clicked} onClick={this.handleUnfollow}>
            Following
          </button>
        </div>
      );
    }

    return (
      <li className="side-lis">
        <div className="user-div">
          <Link to={`/users/${user.username}`}>
            <img src={user.image_url} alt="avatar" className='sidebar-list-image'/>
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
    currentUser: state.entities.users[state.session.user.id]
  });
};

const mdp = dispatch => {
  return({
    followUser: (currentUser, userId) => dispatch(followUser(currentUser, userId)),
    unfollowUser: (currentUser, userId) => dispatch(unfollowUser(currentUser, userId))
  });
};

export default connect(msp, mdp)(SidebarItem);