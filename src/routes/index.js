import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Route from "./Route";
import Login from "../pages/public/Login";
import Users from "../pages/private/Users";
import Contents from "../pages/private/Contents";
import Roles from "../pages/private/Roles";

import PublicContents from "../pages/public/Contents";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PublicContents} isPublic></Route>
        <Route path="/login" component={Login} isPublic></Route>
        <Route path="/contents" component={Contents}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/roles" component={Roles}></Route>
      </Switch>
    </Router>
  );
};
