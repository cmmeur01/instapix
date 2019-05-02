import { connect } from 'react-redux';
import PostItem from './post_item';
import { likePost, unlikePost } from './../../util/post_api_util';

const msp = state => {
  return({
    currentUserId: state.session.user.id
  });
};

const mdp = dispatch => {
  return({
    likePost: postId => likePost(postId),
    unlikePost: likeData => unlikePost(likeData)
  });
};

export default connect(msp, mdp)(PostItem);