import React from "react";
import Slider from "react-slick";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FollowButton from "../user_profile/follow_button";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.getUsers = this.getUsers.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getCurrentUser() {
    let currentUser;

    this.props.users.forEach(user => {
      if (user._id === this.props.currentUser.id) {
        currentUser = user;
      }
    });

    return currentUser;
  }

  getUsers() {
    if (this.props.users.length === 0) return null;
    let users = this.props.users.slice(0, 30);

    users = users.map((user, i) => {
      let popular;
      if (user.following.includes(this.props.currentUser.id)) {
        popular = <p className="carousel-follows">Follows you</p>;
      } else {
        popular = <p className="carousel-follows">Popular</p>;
      }

      return (
        <div className="card-info" key={i}>
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
                <FollowButton
                  currentUser={this.getCurrentUser()}
                  owner={user}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });

    return users;
  }

  render() {
    var settings = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: true
    };

    return (
      <div>
        <Slider {...settings}>{this.getUsers()}</Slider>
      </div>
    );
  }
}

const mstp = state => ({
  users: Object.values(state.entities.users)
});

export default connect(mstp)(Carousel);
