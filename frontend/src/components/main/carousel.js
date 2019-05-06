import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    let users = [];
    if (this.props.users.length === 0) return null;

    while (users.length < 5) {
      let random = Math.floor(Math.random() * this.props.users.length);
      users.push(this.props.users[random]);
    }

    users = users.map((user, i) => {
      let popular;
      if (user.following.includes(this.props.currentUser.id)) {
        popular = <p className="carousel-follows">Follows you</p>;
      } else {
        popular = <p className="carousel-follows">Popular</p>;
      }
      return (
        <li className="card-info" key={i}>
          <div className="d-block">
            <div>
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
              <div className="btn-div">
                <button className="carousel-btn">Follow</button>
              </div>
            </div>
          </div>
        </li>
      );
    });

    return users;
  }

  render() {
    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <ul>{this.getUsers()}</ul>
          </div>
          <div className="carousel-item">
            <ul>{this.getUsers()}</ul>
          </div>{" "}
          <div className="carousel-item">
            <ul>{this.getUsers()}</ul>
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <img
              src="https://www.nicepng.com/png/detail/15-157899_free-download-of-up-arrow-icon-clipart-youtube.png"
              alt="prev"
            />
          </span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <img
              src="https://www.nicepng.com/png/detail/15-157899_free-download-of-up-arrow-icon-clipart-youtube.png"
              alt="next"
            />
          </span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

const mstp = state => ({
  users: Object.values(state.entities.users)
});

export default connect(mstp)(Carousel);
