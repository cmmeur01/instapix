import React from 'react';

class UserProfile extends React.Component {


  render() {

    return (
      <div className="user-profile-container">
        <div className="inner-profile">
          <div className="profile-top">
            <div className="profile-picture">
              <img src="https://scontent-ort2-2.cdninstagram.com/vp/d0fd61aabef89f393314a15cea688a1f/5D59C865/t51.2885-19/s150x150/29740522_596049654060990_7562383221418098688_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com" />
            </div>
            <div className="outer-user-info">
              <div className="user-profile-row">
                <h3>Username</h3>
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
              <ul className="inner-user-info">
                <li className="post-count">
                  <span>
                    <span className="profile-num-count">25 </span>
                      posts
                  </span>
                </li>
                <li className="follower-count">
                  <span>
                    <span className="profile-num-count">1000 </span>
                    followers
                  </span>
                </li>
                <li className="following-count">
                  <span>
                    <span className="profile-num-count">100 </span>
                    following
                  </span>
                </li>
              </ul>
              <div className="user-bio">
                <span className="user-profile-name">Full Name</span>
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
    );
  }

}

export default UserProfile;
