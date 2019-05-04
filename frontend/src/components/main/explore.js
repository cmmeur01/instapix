import React from 'react';
import { connect } from 'react-redux';
import { notFollowing } from './../../reducers/selectors';
import ProfilePostImageItem from '../user_profile/profile_post_image_item';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
  }

  // getPosts() {
  //   posts = []
  //   this.props.users.map((user, id) => {
    
  //     return <ProfilePostImageItem key={id} currentUser={this.props.currentUser} post={post} />
  //   });
  //   return posts;
  // }

  render() {
    return (
      <div>
        <h2>Explorer</h2>
          <article>
            {this.getPosts()}
          </article>
      </div>
    )
  }
}




const mstp = state => {
  return ({
    users: notFollowing(state),
    currentUser: state.session.user
  });
};

export default connect(mstp)(Explore);