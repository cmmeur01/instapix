import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "./../../actions/user_actions";
import { logout } from "./../../actions/session_actions";
import SearchBar from "./search_bar";
import "./../../assets/stylesheets/main_nav.css";
import * as ip from "./../../assets/images/ip.png";

class MainNav extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    if (!this.props.users) return null;

    return (
      <div className="main-header">
        <div className="inner-main-div">
          <div className="main-logos">
            <Link to="/">
              <div className="icons-left">
                <img src={ip} alt="instapix-icon" />
                <div className="side-border" />
              </div>
              <div className="instapix-name">
                <span>Instapix</span>
              </div>
            </Link>
          </div>
          <div className="search-bar">
            <SearchBar />
          </div>

          <div className="nav-icons">
            <div className="inner-icons-div">
              <div className="explore-icon">
                <Link to="/explore">
                  <img
                    src="http://cdn.onlinewebfonts.com/svg/img_119257.png"
                    alt="compass"
                  />
                </Link>
              </div>
              <div className="activity-icon">
                <Link to="#">
                  <img
                    className="activity-heart"
                    src="http://cdn.onlinewebfonts.com/svg/img_448611.png"
                    alt="heart"
                  />
                </Link>
              </div>
              <div className="profile-icon">
                <Link to="#">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/basic-user-interface-application/32/INSTAGRAM_ICON_SETS-12-512.png"
                    alt="profile-icon"
                  />
                </Link>
              </div>
              <button className="logout-btn" onClick={this.props.logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mstp = state => {
  return {
    users: Object.values(state.entities.users)
  };
};

const mdtp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mstp,
  mdtp
)(MainNav);
