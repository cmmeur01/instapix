import React from "react";
import { connect } from "react-redux";
// import { notFollowingExplore } from "./../../reducers/selectors";
import { Link } from "react-router-dom";
// import { fetchUsers } from "./../../actions/user_actions";
import { fetchPosts } from "../../actions/post_actions";
import "../../assets/stylesheets/explore.css";
import Carousel from "./carousel";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUsers();
    this.props.fetchPosts();
  }

  getPosts() {
    let posts = [];
    this.props.posts.forEach(post => {
      if (post.user !== this.props.currentUser.id) {
        posts.push(post);
      }
    });

    let allUserPosts = posts.map((post, i) => {
      return (
        <Link to={`/posts/${post._id}`}>
          <li key={i} className="test-div2">
            <img src={post.imgUrl} alt="img" />
          </li>
        </Link>
      );
    });
    return allUserPosts;
  }

  render() {
    return (
      <div className="explore-div">
        <div className="explore-content">
          <div className="carousel-header">
            <h5>Discover People</h5>
            <div className="carousel-container">
              <Carousel currentUser={this.props.currentUser} />
            </div>
          </div>
          <h2 className="explore">Explore</h2>
          <article className="explore-posts">
            <ul className="explore-list">{this.getPosts()}</ul>
          </article>
        </div>
      </div>
    );
  }
}

const mstp = state => {
  return {
    // users: notFollowingExplore(state),
    currentUser: state.session.user,
    posts: Object.values(state.entities.posts)
  };
};

const mdtp = dispatch => ({
  // fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(
  mstp,
  mdtp
)(Explore);
