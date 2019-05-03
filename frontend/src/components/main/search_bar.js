import React from "react";
import "./../../assets/stylesheets/searchbar.css";
// import { fetchUsers } from "./../../actions/user_actions";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { searchUsers } from './../../actions/user_actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputVal: "", popupVisible: true };
    this.update = this.update.bind(this);
  }

  update(e) {
    // debugger;
    this.setState({ inputVal: e.target.value });
    let modal = document.getElementById("input-names");
    // if (this.state.inputVal.length < 0) {
    //   modal.style.display = "none";
    // } else {
    //   modal.style.display = "block";
    // }
    if (e.target.value.length === 0) {
      // this.setState({ inputVal: '' });
      modal.style.display = "none";
    } else {
      // this.setState({ inputVal: e.target.value });
      modal.style.display = "block";
    }
    this.props.searchUsers(e.target.value);
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
      })};

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

// export default SearchBar;

export default connect(msp, mdp)(SearchBar);