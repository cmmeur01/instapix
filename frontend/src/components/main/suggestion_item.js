import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from './../../actions/user_actions';
import "./../../assets/stylesheets/feed.css";


class SuggestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followed: false };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.clicked = false;
  }

  handleFollow(e) {
    e.preventDefault();
    this.setState({ "clicked": true });
    this.props
      .followUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: true, clicked: false }));
  }

  handleUnfollow(e) {
    e.preventDefault();
    this.setState({ "clicked": true });
    this.props
      .unfollowUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: false, clicked: false }));
  }

  render() {
    const { user } = this.props;

    let followButton;
    if (!this.state.followed) {
      followButton = <button disabled={this.state.clicked} onClick={this.handleFollow} className='edit-profile-btn inactive'>
          Follow
        </button>
    } else {
      followButton = (
        <button
          disabled={this.state.clicked}
          onClick={this.handleUnfollow}
          className="edit-profile-btn"
        >
          Following
        </button>
      );
    }

    return (
      <li className="li-users">
        <div className="user-div sug-users">
          <Link to={`/users/${user.username}`}>
            <img src={user.image_url} alt="avatar" className='sug-users-image' />
            <div className="user-p">
              <p className="first-p">{user.username}</p>
              <p className="second-p">{user.name}</p>
            </div>
          </Link>
        </div>
        <div className='sug-btn-container'>
          {followButton}
        </div>
      </li>
    )
  }
}

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.user.id]
  });
};

const mdp = dispatch => {
  return ({
    followUser: (currentUser, userId) => dispatch(followUser(currentUser, userId)),
    unfollowUser: (currentUser, userId) => dispatch(unfollowUser(currentUser, userId))
  });
};

export default connect(msp, mdp)(SuggestionItem);