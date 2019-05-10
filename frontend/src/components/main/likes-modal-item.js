import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { followUser, unfollowUser } from './../../actions/user_actions';
import "./../../assets/stylesheets/feed.css";
import { closeModal } from './../../actions/modal_actions';


class LikesModalItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followed: false,
      clicked: false
    };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.visitLiker = this.visitLiker.bind(this);
    
  }

  componentDidMount() {
    debugger
    this.setState({
      followed: this.props.user.followers.includes(this.props.currentUser._id)
    });
  }

  visitLiker(username) {
    return e => {
      this.props.closeModal();
      this.props.history.push(`/users/${username}`);
    }
  }

  handleFollow(e) {
    e.preventDefault();
    this.setState({ clicked: true });
    this.props
      .followUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: true, clicked: false }));
  }

  handleUnfollow(e) {
    e.preventDefault();
    this.setState({ clicked: true });
    this.props.unfollowUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: false, clicked: false  }));
  }

  render() {
    const { user, currentUser } = this.props;

    let followButton;
    debugger
    if (user._id === currentUser._id) {
      followButton = ''
    } else if (!this.state.followed) {
      followButton = (
        <button
          disabled={this.state.clicked}
          onClick={this.handleFollow}
          className="edit-profile-btn inactive"
        >
          Follow
        </button>
      );
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
        <div className="user-div sug-users" onClick={this.visitLiker(user.username)}>
          
            <img src={user.image_url} alt="avatar" className='sug-users-image' />
            <div className="user-p">
              <p className="first-p">{user.username}</p>
              <p className="second-p">{user.name}</p>
            </div>
          
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
    unfollowUser: (currentUser, userId) => dispatch(unfollowUser(currentUser, userId)),
    closeModal: () => dispatch(closeModal())
  });
};

export default withRouter(connect(msp, mdp)(LikesModalItem));