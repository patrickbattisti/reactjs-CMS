import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Route from "./Route";
import Login from "../pages/public/Login";
import Users from "../pages/private/Users";
import Contents from "../pages/private/Contents";
import Roles from "../pages/private/Roles";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} isPublic></Route>
        <Route path="/contents" component={Contents}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/roles" component={Roles}></Route>
        <Route path="/" component={() => <Redirect to="/contents" />}></Route>
      </Switch>
    </Router>
  );
};
