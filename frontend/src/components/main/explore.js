import React from "react";
import { connect } from "react-redux";
// import { notFollowingExplore } from "./../../reducers/selectors";
import { Link } from "react-router-dom";
// import { fetchUsers } from "./../../actions/user_actions";
import { fetchExplorePosts } from "../../actions/post_actions";
import "../../assets/stylesheets/explore.css";
import Carousel from "./carousel";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUsers().then(() =>{
    //   this.props.fetchExplorePosts();
    // })
    this.props.fetchExplorePosts()
    .then(() => this.setState({posts: this.props.posts}))
  }

  getPosts() {
    // debugger
    let {posts} = this.state;
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
              <Carousel />
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
    currentUser: state.entities.users[state.session.user.id],
    posts: Object.values(state.entities.posts)
  };
};

const mdtp = dispatch => ({
  // fetchUsers: () => dispatch(fetchUsers()),
  fetchExplorePosts: () => dispatch(fetchExplorePosts())
});

export default connect(
  mstp,
  mdtp
)(Explore);

