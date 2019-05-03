import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNav  from './main_nav';
import Feed from './feed_container';

const Main = () => (
  <div>
    <MainNav />
    <Switch>
      <Route path='/home' component={Feed} />
    </Switch>
  </div>
);

export default Main;



