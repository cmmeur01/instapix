import { connect } from 'react-redux';
import PostShow from './post_show';
import { fetchCurrentUser } from './../../actions/user_actions';
import { fetchPost } from './../../actions/post_actions';
import { fetchComments } from './../../actions/comment_actions';

const msp = (state, ownProps) => {
  return (
    {currentUserId: state.session.user.id,
    users: state.entities.users,
    posts: state.entities.posts}
  )
};

const mdp = dispatch => ({
  fetchPost: (id) => dispatch(fetchPost(id)),
  fetchCurrentUser: (id, username) => dispatch(fetchCurrentUser(id, username)),
  fetchComments: (id) => dispatch(fetchComments(id))
});

export default connect(msp, mdp)(PostShow);