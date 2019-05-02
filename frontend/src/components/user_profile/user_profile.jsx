import React from 'react';
import { jsx, css } from "@emotion/core";
import { BeatLoader } from "react-spinners";
import FollowButton from './follow_button';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class UserProfile extends React.Component {
  
  componentDidMount() {
    let username = this.props.match.params.username;
    // this.props.fetchUser(username);
    this.props.fetchCurrentUser(this.props.currentUser, username);
    // debugger
  }

  render() {
    let owner;
    let url;
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
    debugger;
    return (
      <div>
      { 
        owner ? (
          <div className="user-profile-container">
            <div className="inner-profile">
              <div className="profile-top">
                <div className="profile-picture">
                  <img src={owner.image_url} />
                </div>
                <div className="outer-user-info">
                  <div className="user-profile-row">
                    <h3>{owner.username}</h3>
                    {/* conditional */}
                    {owner._id === this.props.currentUser ? (
                      <button className="edit-profile-btn">Edit Profile</button> 
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
                    <span className="user-profile-name">{owner.bio}</span>
                    <span>userBio text blahblahblah</span>
                  </div>
                </div>
                
              </div>
              <nav className="user-nav">
                <ul className="user-nav-links">
                  <li>
                    <div className="posts-icon"></div>
                    <span> POSTS</span>
                  </li>
                  <li>
                    <div className="new-post-icon"></div>
                    <span> NEW POST</span>
                  </li>
                </ul>
              </nav>
              <div className="user-posts">
                <div className="test-div" />
                <div className="test-div" />
                <div className="test-div" />
                <div className="test-div" />
                <div className="test-div" />
                <div className="test-div" />
              </div>
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
