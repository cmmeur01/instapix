import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';
import Footer from './footer';
import Splash from './splash';
import SignupForm from './../components/session/signup_form_container';
import LoginForm from './../components/session/login_form_container';
import UserProfile from './../components/user_profile/user_profile_container';
import UploadComponent from './../components/upload/upload';

// import MainPage from './main/main_page';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';


const App = () => (
  <div className="app-div">    
    <Switch>
      <Route exact path='/' component={Splash} />
      <Route exact path='/signup' component={SignupForm} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/newpost' component={UploadComponent} />
      <Route exact path='/users/:username' component={UserProfile} />
    </Switch>
    <Footer />
  </div>
);

export default App;