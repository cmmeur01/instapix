import React from 'react';
import { connect } from 'react-redux';
import { notFollowing } from './../../reducers/selectors';
import { Link } from 'react-router-dom';
import SuggestionItem from './suggestion_item';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] }
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  componentDidMount() {
    this.setState({ users: this.props.users })
  }

  getSuggestions() {
    if (this.state.users.length === 0) return null;
    let users = this.state.users;

    const results = users.map((user, i) => <SuggestionItem user={user} key={i} />);
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