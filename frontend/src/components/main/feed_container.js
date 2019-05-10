import { connect } from 'react-redux';
import { fetchPosts, fetchMorePosts } from './../../actions/post_actions';
import Feed from './feed';
import { fetchUsers } from '../../actions/user_actions';

const mstp = state => {
  return({
    posts: Object.values(state.entities.posts),
    users: Object.values(state.entities.users),
    comments: Object.values(state.entities.comments)
  });
};

const mdtp = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchMorePosts: numPosts => dispatch(fetchMorePosts(numPosts)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mstp, mdtp)(Feed);