import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import Footer from "./footer";
import Splash from "./splash";
import SignupForm from "./../components/session/signup_form_container";
import LoginForm from "./../components/session/login_form_container";
// import UserProfile from "./../components/user_profile/user_profile_container";
// import UploadComponent from "./../components/upload/upload";
// import ShowPost from "./../components/post/post_show_container";

// import Explore from "../components/main/explore";
// import MainPage from './main/main_page';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';

import Main from "./../components/main/main";

const App = () => (
  <div className="app-div">
    <Switch>
      <ProtectedRoute exact path="/newpost" component={Main} />
      <ProtectedRoute exact path="/users/:username" component={Main} />
      <ProtectedRoute exact path="/posts/:postId" component={Main} />
      <AuthRoute exact path="/" component={Splash} />
      <ProtectedRoute exact path="/home" component={Main} />
      <AuthRoute exact path="/signup" component={SignupForm} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/suggestions" component={Main} />
      <ProtectedRoute exact path="/explore" component={Main} />
    </Switch>
    <Footer />
  </div>
);

export default App;
