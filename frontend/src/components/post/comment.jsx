import React from "react";
import CommentItem from "./comment_item";
import CommentFollow from "./comment_follow";
import { Link } from "react-router-dom";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
    // let textarea = document.getElementById("myTextarea");
    let l = this.state.text.length;
    if (l > 90) {
      document.getElementById("myTextarea").style.height = "72px";
    } else if (l > 60 && l <= 90) {
      document.getElementById("myTextarea").style.height = "54px";
    } else if (l > 30 && l <= 60) {
      document.getElementById("myTextarea").style.height = "36px";
    } else if (l <= 30) {
      document.getElementById("myTextarea").style.height = "18px";
    }
    // textarea.scrollTop = textarea.scrollHeight;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .postComment(
        this.props.post._id,
        this.props.currentUserId,
        this.state.text
      )
      .then(this.setState({ text: "" }))
      .then(() => (document.getElementById("myTextarea").value = ""));
  }

  render() {
    
    let {comments, users} = this.props;
    let postComments = Object.values(comments).map((comment, id) => {

      let user = users[comment.user];
      return <CommentItem key={id} user={user} comment={comment} />;
    });
    // let comments = this.props.comments.comments.map((comment, id) => {
    //   return <CommentItem key={id}  />
    // });
    let owner = users[this.props.post.user];
    let currentUser = users[this.props.currentUserId];
    return (
      <div className="comment-component">
        <div className="page-owner">
          <div className="comment-user-pic">
            <img src={owner.image_url} alt="" />
          </div>
          <div className="owner-names">
            <div className="owner-username">
              <Link to={`/users/${owner.username}`}>{owner.username}</Link> •
            </div>
            <div className="full-name">{owner.name}</div>
          </div>
          <div className="is-following">
            <CommentFollow owner={owner} currentUser={currentUser} />
          </div>
        </div>
        <ul className="comment-index-component">
          <li className="comment-item">
            <img className="comment-user-pic" src={owner.image_url} alt="img" />
            <span className="comment-body">
              <strong>{owner.name}</strong> {this.props.post.description}
            </span>
          </li>
          {postComments}
        </ul>
        <div className="post-comment-form">
          <form onSubmit={this.handleSubmit}>
            <textarea
              id="myTextarea"
              rows="5"
              cols="35"
              // height="18px"
              placeholder="Add a comment..."
              onChange={this.handleChange}
            />
            <button
              className={!this.state.text ? "disabled" : ""}
              disabled={!this.state.text}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Comment;
