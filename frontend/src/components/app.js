import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';
import Footer from './footer';
import Splash from './splash';

// import MainPage from './main/main_page';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';


const App = () => (
  <div>
    
    <Switch>
      <Route to='/' component={Splash} />
    </Switch>
    <Footer />
  </div>
);

export default App;