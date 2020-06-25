import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Route from "./Route";
import Login from "../pages/Login";
import Users from "../pages/Users";
import Contents from "../pages/Contents";
import Settings from "../pages/Settings";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} isPublic></Route>
        <Route path="/contents" component={Contents}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/settings" component={Settings}></Route>
      </Switch>
    </Router>
  );
};
