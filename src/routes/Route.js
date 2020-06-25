import React from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/user";
import { Redirect } from "react-router-dom";

function Route({ component: Component, isPublic, ...props }) {
  const { user } = useUser();

  if (!user?.token && !isPublic) {
    return <Redirect to="/login"></Redirect>;
  }

  if (user?.token && isPublic) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <>
      <Header></Header>
      <Component></Component>
    </>
  );
}

export default Route;
