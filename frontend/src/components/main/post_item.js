import React from "react";
import { Link } from "react-router-dom";
import "./../../assets/stylesheets/post_item.css";
import * as heart from "./../../assets/images/heart.png";
import * as redheart from "./../../assets/images/redheart.png";
import * as bubble from "./../../assets/images/bubble.png";
import * as upload from "./../../assets/images/igupload.png";

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      likeCount: 0,
      liked: false,
      comments: []
    };

    this.handleLike = this.handleLike.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    if (this.props.post) {
      // debugger
      this.setLocalState();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.comments !== prevProps.comments) {
      this.setLocalState({ comments: this.props.comments });
    }
  }

  setLocalState() {
    this.setState({
      likeCount: this.props.post.likes.length,
      liked: this.props.post.likes.includes(this.props.currentUserId),
      comments: this.props.comments.filter(
        comment => comment.post === this.props.post._id
      )
    });
  }

  // handleUpdate(e) {
  //   // debugger;
  //   this.setState({ inputVal: e.target.value });
  //   let button = document.getElementById("comment-btn");
  //   button.disabled = false;
  //   button.classList.add("show-btn");
  // }

  handleUpdate(e) {
    // debugger;
    this.setState({ inputVal: e.target.value });
    // this.state.inputVal = e.target.value;
    // debugger;
    // let textarea = document.getElementById("myTextarea");
    // let l = this.state.inputVal.length;
    // if (l > 90) {
    //   document.getElementById("myTextarea").style.height = "72px";
    // } else if (l > 60 && l <= 90) {
    //   document.getElementById("myTextarea").style.height = "54px";
    // } else if (l > 30 && l <= 60) {
    //   document.getElementById("myTextarea").style.height = "36px";
    // } else if (l <= 30) {
    //   document.getElementById("myTextarea").style.height = "18px";
    // }
    // debugger;

    // let button = document.getElementById("comment-btn");
    // if (l < 1) {
    //   button.classList.remove("show-btn");
    //   button.disabled = true;
    // } else {
    //   button.classList.add("show-btn");
    //   button.disabled = false;
    // }
    // textarea.scrollTop = textarea.scrollHeight;
  }

  // disableBtn(e) {
  //   let button = document.getElementById("comment-btn");
  //   if (e.keyCode === 8 && e.target.value === "") {
  //     button.classList.remove("show-btn");
  //     button.disabled = true;
  //   }
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.postComment(this.props.post._id, this.props.currentUserId, this.state.text)
  //     .then(this.setState({ text: '' }))
  //     .then(() => document.getElementById("myTextarea").value = '');
  // }

  commentSubmit(e) {
    e.preventDefault();
    this.props
      .postComment(
        this.props.post._id,
        this.props.currentUserId,
        this.state.inputVal
      )
      .then(() => this.setState({ inputVal: "" }));
  }

  handleLike() {
    // debugger;
    if (this.state.liked === true) {
      this.props
        .unlikePost({
          postId: this.props.post._id,
          userId: this.props.currentUserId
        })
        .then(() =>
          this.setState({ liked: false, likeCount: this.state.likeCount - 1 })
        );
    } else {
      this.props
        .likePost({
          postId: this.props.post._id,
          userId: this.props.currentUserId
        })
        .then(() =>
          this.setState({ liked: true, likeCount: this.state.likeCount + 1 })
        );
    }
  }

  modalOpen() {
    this.props.openModal(this.props.post._id);
  }

  render() {
    let { user, post } = this.props;
    // debugger;
    if (!user) return null;

    let heartButton = "";
    if (this.state.liked === true) {
      heartButton = (
        <img
          id="like-icon"
          onClick={this.handleLike}
          className="img-heart-icon"
          src={redheart}
          alt="like"
        />
      );
    } else {
      heartButton = (
        <img
          id="like-icon"
          onClick={this.handleLike}
          className="img-heart-icon"
          src={heart}
          alt="like"
        />
      );
    }

    let likeCounter = "";
    if (this.state.likeCount === 1) {
      likeCounter = <h4>{this.state.likeCount} like</h4>;
    } else if (this.state.likeCount > 1) {
      likeCounter = <h4>{this.state.likeCount} likes</h4>;
    }

    let viewAll = "";
    if (this.state.comments.length > 2) {
      viewAll = (
        <p>
          <Link to={`/posts/${post._id}`} className="view-all-comments">
            View all comments
          </Link>
        </p>
      );
    }

    let postComments = "";
    if (this.state.comments.length >= 2) {
      let lastComment = this.state.comments.length - 1;
      let commentOne = this.state.comments[lastComment - 1];
      let userOne = this.props.users.filter(
        user => user._id === commentOne.user
      )[0];
      let commentTwo = this.state.comments[lastComment];
      let userTwo = this.props.users.filter(
        user => user._id === commentTwo.user
      )[0];
      // debugger;
      postComments = (
        <div className="user-comments">
          {viewAll}
          <p>
            <Link to={`/users/${userOne.username}`}>
              <span className="example">{userOne.username} </span>
            </Link>
            {commentOne.body}
          </p>
          <p>
            <Link to={`/users/${userTwo.username}`}>
              <span className="example">{userTwo.username} </span>
            </Link>
            {commentTwo.body}
          </p>
        </div>
      );
    } else if (this.state.comments.length === 1) {
      let commentOne = this.state.comments[0];
      let userOne = this.props.users.filter(
        user => user._id === commentOne.user
      )[0];
      postComments = (
        <div className="user-comments">
          <p>
            <Link to={`/users/${userOne.username}`}>
              <span className="example">{userOne.username} </span>
            </Link>
            {commentOne.body}
          </p>
        </div>
      );
    }

    let date = "";
    if (post) {
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = parseInt(post.date.slice(5, 7));
      let day = post.date.slice(8, 10);
      let year = post.date.slice(0, 4);
      date = months[month - 1] + " " + day + ", " + year;
    }

    return (
      <div className="post-item-container">
        <article className="post-item">
          <header className="post-header">
            <Link to={`/users/${user.username}`}>
              <div className="post-user-image">
                <img src={user.image_url} alt={user.username} />
              </div>
              <div className="post-user-username">
                <h4>{user.username}</h4>
              </div>
            </Link>
          </header>
          <div className="post-image">
            <img src={post.imgUrl} alt={user.username} />
          </div>
          <footer className="post-footer">
            <section className="icons-div">
              <div className="like-icon">
                <button className="icon-btn">{heartButton}</button>
              </div>
              <div className="comment-icon">
                <Link to={`posts/${post._id}`} className="icon-btn">
                  <img className="icon-comment img-icon" src={bubble} alt="" />
                </Link>
              </div>
              <div className="share-icon">
                <img className="share" src={upload} alt="share" />
              </div>
            </section>
            <section className="likes-section" onClick={this.modalOpen}>
              {likeCounter}
            </section>
            <div className="post-caption">
              <Link to={`/users/${user.username}`}>
                <span className="post-user-username">{user.username}</span>
              </Link>
              <span>{post.description}</span>
            </div>
            {postComments}
            <div className="post-item-date">
              <h4>{date}</h4>
            </div>
          </footer>
          <section className="comment-box">
            <form className="comment-form2" onSubmit={this.commentSubmit}>
              <textarea
                onChange={this.handleUpdate}
                // onKeyDown={this.disableBtn}
                aria-label="Add a comment…"
                placeholder="Add a comment…"
                className="add-comment"
                autoComplete="off"
                autoCorrect="off"
                id="myTextarea"
                value={this.state.inputVal}
              />
              <button
                id="comment-btn"
                disabled={!this.state.inputVal}
                className={
                  !this.state.inputVal ? "comment-btn" : "comment-btn show-btn"
                }
              >
                Post
              </button>
            </form>
          </section>
        </article>
      </div>
    );
  }
}

export default PostItem;
