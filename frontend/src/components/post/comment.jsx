import React from "react";
import CommentItem from './comment_item';

class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.postComment(this.props.post._id, this.props.currentUserId, this.state.text);
  }

  render() {
    let {comments, users} = this.props;
    let postComments = comments.comments.map((comment, id) => {
      let user = users[comment.user];
      return <CommentItem key={id} user={user} comment={comment} />
    });
    // let comments = this.props.comments.comments.map((comment, id) => {
    //   return <CommentItem key={id}  />
    // });

    return (
      <div className="comment-component">
        <div className="page-owner" />
        <ul className="comment-index-component">
          {postComments}
        </ul>
        <div className="comment-form">
          <form onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Add a comment..."
              onChange={this.handleChange}
            />
            <button disabled={!this.state.text}>Post</button>
          </form>
        </div>
      </div>
    );
  }
};
export default Comment;
