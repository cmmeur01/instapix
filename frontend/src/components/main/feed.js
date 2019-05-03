import React from "react";
import PostItem from "./post_item_container";
import SideBar from "./sidebar";
import "./../../assets/stylesheets/feed.css";
import Suggestions from './suggestions';

class Feed extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, users } = this.props;
    if (users.length === 0) return null;
    let feed = "";
    if (posts.length > 0) {
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
    } else {
      return (
        <div className='outer-feed-container'>
          <Suggestions />
        </div>
      )
    }

    return (
      <div className="outer-feed-container">
      <div className="feed-div">{feed}</div>
       <SideBar /> 
      </div> 
    );
  }
}

export default Feed;
