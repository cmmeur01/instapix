import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts } from "./../../actions/post_actions";
import { fetchUsers } from "./../../actions/user_actions";

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  getCurrentUser() {
    let currentUser;
    if (this.props.users) {
      this.props.users.forEach(user => {
        if (this.props.currentUser.id === user._id) {
          currentUser = user;
          debugger;
        }
      });
    }
    return currentUser;
  }

  getSuggestions() {
    let users = [];
    while (users.length < 3) {
      let user = this.props.users[
        Math.floor(Math.random() * this.props.users.length)
      ];
      users.push(user);
    }
    debugger;
    const results = users.map((user, i) => {
      return (
        <li key={i}>
          <div className="user-div">
            <Link to={`/users/${user.name}`}>
              <img src={user.image_url} alt="avatar" />
              <div className="user-p">
                <p className="first-p">{user.username}</p>
                <p className="second-p">{user.name}</p>
              </div>
            </Link>
          </div>
        </li>
      );
    });
    return results;
  }

  render() {
    return (
      <div className="side-feed-bar">
        <div className="profile-header">
          {/* <div>
            <img src={this.getCurrentUser().image_url} />
          </div>
          <div>
            <div>
              <Link to="#">{this.getCurrentUser().username}</Link>
            </div>
            <div>{this.getCurrentUser().name}</div>
          </div> */}
        </div>

        <div className="suggestions">
          <div>Suggestions for you</div>
          <div>
            <ul>{this.getSuggestions()};</ul>
          </div>
        </div>
      </div>
    );
  }
}

// export default SideBar;
const mstp = state => {
  return {
    posts: state.entities.posts.posts,
    users: Object.values(state.entities.users),
    currentUser: state.session.user
  };
};

const mdtp = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(
  mstp,
  mdtp
)(SideBar);
