import { connect } from 'react-redux';
import Comment from './comment';
import { postComment, fetchPost } from './../../actions/post_actions';
import { likePost, unlikePost } from "./../../util/post_api_util";
import { openLikesModal } from "./../../actions/modal_actions";

const msp = (state, ownProps) => {
  return({
    currentUserId: state.session.user.id,
    comments: state.entities.comments,
    users: state.entities.users
  })
}

const mdp = dispatch => ({
  postComment: (post_id, user_id, text) =>
  dispatch(postComment(post_id, user_id, text)),
  likePost: postId => likePost(postId),
  unlikePost: likeData => unlikePost(likeData),
  openLikesModal: postId => dispatch(openLikesModal(postId)),
  fetchPost: (id) => dispatch(fetchPost(id))
});

export default connect(msp, mdp)(Comment);