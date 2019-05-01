import React from "react";
import "./../../assets/stylesheets/searchbar.css";
// import { fetchUsers } from "./../../actions/user_actions";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputVal: "", popupVisible: false };
    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({ inputVal: e.target.value });
    let modal = document.getElementById("input-names");
    modal.style.display = "block";
  }

  matches() {
    const matches = [];
    const users = this.props.users;

    if (this.state.inputVal.length === 0) {
      return users;
    }

    users.forEach(user => {
      const sub = user.username.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(user);
      }
    });

    if (matches.length === 0) {
      matches.push("No matches");
    }

    return matches;
  }

  render() {
    let users = this.matches();
    if (!users) return null;
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

    return (
      <div className="searchbar-div">
        <input
          className="searchbar"
          type="text"
          onChange={this.update}
          placeholder="&#xF002; Search"
        />

        <div id="input-names" className="matches-div">
          <ul className="matches">{results}</ul>
        </div>
      </div>
    );
  }
}

export default SearchBar;

