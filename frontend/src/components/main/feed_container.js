import { connect } from 'react-redux';
import { fetchPosts } from './../../actions/post_actions';
import Feed from './feed';

const mstp = state => {
  return({
    posts: state.entities.posts.posts,
    users: Object.values(state.entities.users)
  });
};

const mdtp = dispatch => {
  return({
    fetchPosts: () => dispatch(fetchPosts())
  });
};

export default connect(mstp, mdtp)(Feed);