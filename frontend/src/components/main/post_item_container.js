import { connect } from 'react-redux';
import PostItem from './post_item';
import { likePost, unlikePost } from './../../util/post_api_util';
import { openModal } from './../../actions/modal_actions';
import { postComment } from './../../actions/post_actions';

const msp = state => {
  return({
    currentUserId: state.session.user.id
  });
};

const mdp = dispatch => {
  return({
    likePost: postId => likePost(postId),
    unlikePost: likeData => unlikePost(likeData),
    openModal: postId => dispatch(openModal(postId)),
    postComment: (post_id, user_id, text) => dispatch(postComment(post_id, user_id, text))
  });
};

export default connect(msp, mdp)(PostItem);