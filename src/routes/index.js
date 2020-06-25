import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Route from "./Route";
import Login from "../pages/Login";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} isPublic></Route>
        <Route path="/" component={() => null} exact></Route>
        <Route path="/contents"></Route>
        <Route path="/users"></Route>
        <Route path="/settings"></Route>
      </Switch>
    </Router>
  );
};
