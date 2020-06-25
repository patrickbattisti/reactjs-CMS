import React from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/user";
import { Redirect } from "react-router-dom";

function Route({ component: Component, isPublic, ...props }) {
  const { user } = useUser();
  if (user === null) return null;

  if (!user?.token && !isPublic) {
    return <Redirect to="/login"></Redirect>;
  }

  if (user?.token && isPublic) {
    return <Redirect to="/"></Redirect>;
  }

  if (isPublic) {
    return <Component />;
  }

  return (
    <>
      <Header />
      <Component />
    </>
  );
}

export default Route;
