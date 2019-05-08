import React from "react";
import "./../../assets/stylesheets/searchbar.css";
// import { fetchUsers } from "./../../actions/user_actions";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { searchUsers } from './../../actions/user_actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputVal: "" };
    this.update = this.update.bind(this);
    this.visitSearchResult = this.visitSearchResult.bind(this);
  }

  update(e) {
    this.setState({ inputVal: e.target.value });
    let modal = document.getElementById("input-names");
    if (e.target.value.length === 0) {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
    this.props.searchUsers(e.target.value);
  }

  visitSearchResult(username) {
    return (e) => {
      this.setState({ inputVal: '' });
      let modal = document.getElementById("input-names");
      modal.style.display = "none";
      this.props.history.push(`/users/${username}`);
    }
  }

  // matches() {
  //   const matches = [];
  //   const users = this.props.users;

  //   if (this.state.inputVal.length === 0) {
  //     return users;
  //   }

  //   users.forEach(user => {
  //     const sub = user.username.slice(0, this.state.inputVal.length);
  //     if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
  //       matches.push(user);
  //     }
  //   });

  //   if (matches.length === 0) {
  //     matches.push("No matches");
  //   }

  //   return matches;
  // }

  render() {
    const { users } = this.props;
    let results = '';
    if (!users || users.length < 1 || users === {} ) {
      results = <div className='no-results-found'>No results found.</div>;
    } else {
      results = users.map((user, i) => {
      return (
        <li key={i} onClick={this.visitSearchResult(user.username)}>
          <div className="user-div">
            
              <img src={user.image_url} alt="avatar" />
              <div className="user-p">
                <p className="first-p">{user.username}</p>
                <p className="second-p">{user.name}</p>
              </div>
            
          </div>
        </li>
      );
      })};

    return (
      <div className="searchbar-div">
        <input
          className="searchbar"
          type="text"
          onChange={this.update}
          value={this.state.inputVal}
          placeholder="&#xF002; Search"
        />

        <div id="input-names" className="matches-div">
          <ul className="matches">{results}</ul>
        </div>
      </div>
    );
  }
}

const msp = state => {
  return({
    users: state.ui.search.searchResults
  });
};

const mdp = dispatch => {
  return({
    searchUsers: searchTerm => dispatch(searchUsers(searchTerm))
  });
};

export default withRouter(connect(msp, mdp)(SearchBar));
