import React from 'react';
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";
import FollowButton from './follow_button';
import ProfilePostImageItem from './profile_post_image_item';
import * as gearButton from './../../assets/images/gear.png';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class UserProfile extends React.Component {
  
  componentDidMount() {
    let owner;
    let username = this.props.match.params.username;
    this.props.fetchCurrentUser(this.props.currentUser, username).then(() => {
      let users = Object.values(this.props.users);
      // debugger;
      users.forEach(user => {
        // debugger;
        if (user.username === this.props.match.params.username) {
          owner = user;
        }
      });
      // debugger;
      this.props.fetchPostsByUserId(owner._id);
    });
  }

  render() {
    let owner;
    if (this.props.match.params.username === this.props.currentUser.username) {

      owner = this.props.users[this.props.currentUser];
    } else {
      let users = Object.values(this.props.users);
      
      users.forEach( user => {
        if (user.username === this.props.match.params.username) {
          owner = user;
  
        }
      });
    }
    let posts;
    if (Array.isArray(this.props.posts.posts)) {
      console.log("inside");
      posts = this.props.posts.posts.map( (post, id) => {
        return <ProfilePostImageItem key={id} currentUser={this.props.currentUser} post={post} />
      });
    }
    return (
      <div>
      { 
        owner ? (
          <div className="user-profile-container">
            <div className="inner-profile">
              <div className="profile-top">
                <div className="profile-picture">
                  <img src={owner.image_url} alt={owner.username} />
                </div>
                <div className="outer-user-info">
                  <div className="user-profile-row">
                    <h3>{owner.username}</h3>
                    {/* conditional */}
                    {owner._id === this.props.currentUser ? (
                      <div className='edit-logout-buttons'>
                        <button className="edit-profile-btn">Edit Profile</button>
                        <button className='logout-gear-btn' onClick={this.props.openLogoutModal}>
                          <img src={gearButton} alt='gear'/>
                        </button>
                      </div>
                    ) : (
                      <FollowButton owner={owner} currentUser={this.props.users[this.props.currentUser]} />
                    )}
                  </div>
                  <ul className="inner-user-info">
                    <li className="post-count">
                      <span>
                        <span className="profile-num-count">{owner.posts.length} </span>
                          posts
                      </span>
                    </li>
                    <li className="follower-count">
                      <span>
                        <span className="profile-num-count">{owner.followers.length} </span>
                        followers
                      </span>
                    </li>
                    <li className="following-count">
                      <span>
                        <span className="profile-num-count">{owner.following.length} </span>
                        following
                      </span>
                    </li>
                  </ul>
                  <div className="user-bio">
                    <span className="user-profile-name">{owner.name}</span>
                    <span>{owner.bio}</span>
                  </div>
                </div>
                
              </div>
              <nav className="user-nav">
                <ul className="user-nav-links">
                  <li>
                    <div className="posts-icon"></div>
                    <span> POSTS</span>
                  </li>
                    {owner._id === this.props.currentUser ? (
                      <li>
                        <div className="new-post-icon"></div>
                        <span> NEW POST</span>
                      </li>
                    ) : (
                      ''
                    )}
                </ul>
              </nav>
              <ul className="user-posts">
                {posts}
              </ul>
            </div>
          </div>
        ) : (
          <div className='stock-loading'>
            <BeatLoader
              className={override}
              sizeUnit={"px"}
              size={25}
              color={'#21ce99'}
              loading={true}
            />
          </div>
        )

      }
      </div>
    );
  }

}

export default UserProfile;
