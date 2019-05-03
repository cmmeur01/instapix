import { connect } from 'react-redux';
import Comment from './comment';
import { postComment } from './../../actions/post_actions';

const msp = (state, ownProps) => {
  return({
    currentUserId: state.session.user.id,
    comments: state.entities.comments,
    users: state.entities.users
  })
}

const mdp = dispatch => ({
  postComment: (post_id, user_id, text) => dispatch(postComment(post_id, user_id, text))
});

export default connect(msp, mdp)(Comment);