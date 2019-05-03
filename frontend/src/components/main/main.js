import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNav  from './main_nav';
import Feed from './feed_container';
import Modal from './modal';
import UserProfile from './../user_profile/user_profile_container';
import ShowPost from './../post/post_show_container';
import UploadComponent from './../upload/upload';


const Main = () => (
  <div>
    <Modal />
    <MainNav />
    <Switch>
      <Route path='/users/:username' component={UserProfile} />
      <Route exact path='/posts/:postId' component={ShowPost} />
      <Route path='/home' component={Feed} />
      <Route exact path='/newpost' component={UploadComponent} />
    </Switch>
  </div>
);

export default Main;



