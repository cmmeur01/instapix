import React from "react";
import { Link } from "react-router-dom";
import "./../../assets/stylesheets/post_item.css";
import * as heart from "./../../assets/images/heart.png";
import * as redheart from "./../../assets/images/redheart.png";
import * as bubble from "./../../assets/images/bubble.png";
import * as upload from "./../../assets/images/igupload.png";

// Need post create method
class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      likeCount: props.post.likes.length,
      liked: props.post.likes.includes(props.currentUserId)
    };

    this.getComment = this.getComment.bind(this);
    this.getName = this.getName.bind(this);
    this.likedClicked = this.likedClicked.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
  }

  update(e) {
    return e => {
      let button = document.getElementById("comment-btn");
      button.disabled = false;
      button.classList.add("show-btn");
      this.setState({ inputVal: e.target.value });
    };
  }

  disableBtn(e) {
    let button = document.getElementById("comment-btn");
    if (e.keyCode === 8 && e.target.value === "") {
      button.classList.remove("show-btn");
      button.disabled = true;
    }
  }

  getComment() {
    let quotes = [
      "This is nice.",
      "I like this.",
      "Hmmm...",
      "Tell me something.",
      "What is that about?",
      "Are you for real.",
      "Well, I guess we have a winner.",
      "Chicken is on me.",
      "Who you think you are?",
      "whatevs",
      "and that's how the west was won."
    ];
    const comment = quotes[Math.floor(Math.random() * quotes.length)];
    return comment;
  }

  getName() {
    let names = [
      "sergeythegriden",
      "christhemeurer",
      "martinthemarkaj",
      "koythesaeteurn",
      "billythekid",
      "rockstar",
      "kittymeowmeow",
      "datwhoppingirl",
      "foodiepootie",
      "areyoumymom",
      "getmilk"
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    return name;
  }

  likedClicked() {
    if (this.state.liked === true) {
      this.props.unlikePost({ postId: this.props.post._id, userId: this.props.currentUserId });
      this.setState({ liked: false, likeCount: this.state.likeCount - 1 });
    } else {
      this.props.likePost({ postId: this.props.post._id, userId: this.props.currentUserId });
      this.setState({ liked: true, likeCount: this.state.likeCount + 1 });
    }
  }

  modalOpen() {
    this.props.openModal(this.props.post._id);
  }
  
  render() {
    let { user, post } = this.props;
    // debugger;
    if (!user) return null;

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

    let likeCounter = '';
    if (this.state.likeCount === 1) {
      likeCounter = <h4>{this.state.likeCount} like</h4>;
    } else {
      likeCounter = <h4>{this.state.likeCount} likes</h4>;
    }

    let heartButton = '';
    if (this.state.liked === true ) {
      heartButton = <img id="like-icon" onClick={this.likedClicked} className="img-heart-icon" src={redheart} alt="" />
    } else {
      heartButton = <img id="like-icon" onClick={this.likedClicked} className="img-heart-icon" src={heart} alt="" />;
    }
    // debugger;
    return (
      <div className="post-item-container">
        <article className="post-item">
          <header className="post-header">
            <div className="post-user-image">
              <img src={user.image_url} alt={user.username} />
            </div>
            <div className="post-user-username">
              <h4>{user.username}</h4>
            </div>
          </header>
          <div className="post-image">
            <img src={post.imgUrl} alt={user.username} />
          </div>
          <footer className="post-footer">
            <section className="icons-div">
              <div className="like-icon">
                <button className="icon-btn">
                  {heartButton}
                </button>
              </div>
              <div className="comment-icon">
                <button className="icon-btn">
                  <img className="icon-comment img-icon" src={bubble} alt="" />
                </button>
              </div>
              <div className="share-icon">
                <img className="share" src={upload} alt="share" />
              </div>
            </section>
            <section className="likes-section" onClick={this.modalOpen}>
              {likeCounter}
            </section>
            <div className="post-caption">
              <span className="post-user-username">{user.username}</span>
              <span>{post.description}</span>
            </div>
            <div className="user-comments">
              <p>
                <Link to="/comments">View all comments</Link>
              </p>
              <p>
                <span className="example">{this.getName()} </span>
                {this.getComment()}
              </p>
              <p>
                <span className="example">{this.getName()} </span>
                {this.getComment()}
              </p>
            </div>
            <div className="post-item-date">
              <h4>{date}</h4>
            </div>
          </footer>
          <section className="comment-box">
            <form className="comment-form">
              <textarea
                onChange={this.update()}
                onKeyDown={this.disableBtn}
                aria-label="Add a comment…"
                placeholder="Add a comment…"
                className="add-comment"
                autoComplete="off"
                autoCorrect="off"
              />
              <button
                id="comment-btn"
                className="comment-btn "
                disabled
                type="submit"
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
