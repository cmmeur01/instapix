import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Footer from './footer';
import Splash from './splash';
import SignupForm from './../components/session/signup_form_container';
import LoginForm from './../components/session/login_form_container';
import Main from './../components/main/main';

const App = () => (
  <div className="app-div">    
    <Switch>
      <AuthRoute exact path='/' component={Splash} />
      <ProtectedRoute exact path='/home' component={Main} />
      <AuthRoute exact path='/signup' component={SignupForm} />
      <AuthRoute exact path='/login' component={LoginForm} />
      <ProtectedRoute exact path='/suggestions' component={Main} />
    </Switch>
    <Footer />
  </div>
);

export default App;