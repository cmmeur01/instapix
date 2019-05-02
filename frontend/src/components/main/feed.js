import React from "react";
import PostItem from "./post_item_container";
// import SideBar from "./sidebar";
import "./../../assets/stylesheets/feed.css";

class Feed extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, users } = this.props;
    let feed = "";
    if (posts) {
      feed = (
        <ul className="feed-list">
          {posts.map((post, i) => {
            let user = users.filter(user => user._id === post.user)[0];
            return (
              <li key={i}>
                <PostItem post={post} user={user} />
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      // <div className="outer-feed-container">
      <div className="feed-div">{feed}</div>
      /* <SideBar /> */
      /* </div> */
    );
  }
}

export default Feed;
