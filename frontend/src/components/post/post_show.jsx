import React from 'react';
import Comment from './comment_container';
import { css } from "@emotion/core";
import { MoonLoader } from "react-spinners";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ShowPost extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }
  

  componentDidMount() {
    this.setState({"loading": true});
    let username;
    let that = this;
    this.props.fetchPost(this.props.match.params.postId)
      .then( ({post}) => {
        username = post.user[post.post.user].username;
      })
      .then( () => {
        that.props.fetchCurrentUser(that.props.currentUserId, username);
        that.setState({ "loading": false });
      });
  }

  componentDidUpdate(prevProps) {
    let that = this;
    if (this.props.match.params.postId !== prevProps.match.params.postId) {
      let username;
      this.props.fetchPost(this.props.match.params.postId)
        .then(({ post }) => {
          username = post.user[post.post.user].username;
        });
      that.props.fetchCurrentUser(that.props.currentUserId, username);
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <div className="stock-loading">
          <MoonLoader
            className={override}
            sizeUnit={"px"}
            size={25}
            color={"#312F2D"}
            loading={true}
          />
        </div>
      )
    }
    let post;
    if (this.props.posts[this.props.match.params.postId]) {
      post = this.props.posts[this.props.match.params.postId];
    }

    return (
      <div>
        {post ? (
          <div className="show-post-container">
            <div className="img-cont">
              <img src={post.imgUrl} alt="" />
            </div>
            <div className="comment-container">
              <Comment post={post} />
            </div>
          </div>
        ) : (
          <div className="stock-loading">
            <MoonLoader
              className={override}
              sizeUnit={"px"}
              size={25}
              color={"#312F2D"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ShowPost;