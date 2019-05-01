import { connect } from 'react-redux';
import { fetchPosts } from './../../actions/post_actions';
import Feed from './feed';

const mstp = state => {
  return({
    posts: Object.values(state.entities.posts)
  });
};

const mdtp = dispatch => {
  return({
    fetchPosts: () => dispatch(fetchPosts())
  });
};

export default connect(mstp, mdtp)(Feed);