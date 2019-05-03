import React from 'react';
import { connect } from 'react-redux';
import { notFollowing } from './../../reducers/selectors';
import { Link } from 'react-router-dom';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  getSuggestions() {
    if (!this.props.users) return null;
    let users = this.props.users;

    const results = users.map((user, i) => {
      return (
        <li className="li-users" key={i}>
          <div className="user-div sug-users">
            <Link to={`/users/${user.name}`}>
              <img src={user.image_url} alt="avatar" />
              <div className="user-p">
                <p className="first-p">{user.username}</p>
                <p className="second-p">{user.name}</p>
              </div>
            </Link>
          </div>
          <div>
            <button className="follow-btn">Follow</button>
          </div>
        </li>
      );
    });
    return results;
  }

  render() {
    return (
      <div className="sug-container">
        <div>
          <h4 className="sug-header">Suggestions For You</h4>
        </div>
        <div className="sug-list-div">
           { this.getSuggestions() }
        </div>
      </div>
    )
  }
}

const mstp = state => {
  return({
    users: notFollowing(state)
  });
};

export default connect(mstp)(Suggestions);