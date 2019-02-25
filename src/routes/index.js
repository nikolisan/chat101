import React from 'react'
import { Route, Switch } from 'react-router'

import NoMatch from '../components/NoMatch';
import { Navbar } from '../containers/Navbar';
import { Home } from '../containers/Home';
import { Register } from '../containers/Register';
import { Login } from '../containers/Login';
import { Chatroom } from '../containers/Chatroom';

const routes = (
  <div id="main">
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route path="/chat/:id?" component={Chatroom} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)


export default routes