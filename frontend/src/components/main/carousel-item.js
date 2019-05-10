import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from './../../actions/user_actions';
import "./../../assets/stylesheets/explore.css";
import { closeModal } from './../../actions/modal_actions';


class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followed: false };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentDidMount() {
    this.setState({
      followed: this.props.user.followers.includes(this.props.currentUser._id)
    });
  };

  handleFollow(e) {
    e.preventDefault();
    this.props.followUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: true }));
  }

  handleUnfollow(e) {
    e.preventDefault();
    this.props.unfollowUser(this.props.currentUser, this.props.user._id)
      .then(() => this.setState({ followed: false }));
  }

  render() {
    const { user, currentUser } = this.props;

    let followButton;
    if (user._id === currentUser._id) {
      followButton = ''
    } else if (!this.state.followed) {
      followButton = <button onClick={this.handleFollow} className='edit-profile-btn2 inactive'>
        Follow
        </button>
    } else {
      followButton = <button onClick={this.handleUnfollow} className='edit-profile-btn2'>
        Following
        </button>
    }

    let popular;
    // debugger;
    if (user.following.includes(currentUser._id)) {
      popular = <p className="carousel-follows">Follows you</p>;
    } else {
      popular = <p className="carousel-follows">Popular</p>;
    }

    return (
      <div className="card-info">
        <div className="d-block">
          <div className="caro-card">
            <div className="inner-caro-div">
              <Link to={`users/${user.username}`}>
                <img
                  className="carousel-img"
                  src={user.image_url}
                  alt="user"
                />
              </Link>
            </div>
            <div className="carousel-username">
              <Link to={`users/${user.username}`}>{user.username}</Link>
            </div>
            <div className="popular">{popular}</div>
            <div className="btn-div carousel-btn">
              {followButton}
            </div>
          </div>
        </div>
      </div>
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

export default connect(msp, mdp)(CarouselItem);