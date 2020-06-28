import React from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/user";
import { Redirect } from "react-router-dom";

function Route({ component: Component, isPublic, ...props }) {
  const { user } = useUser();
  if (user === null) return null;

  if (!user?.token && !isPublic) {
    return <Redirect to="/"></Redirect>;
  }

  if (user?.token && props.path === "/login") {
    return <Redirect to="/contents"></Redirect>;
  }

  if (isPublic && props.path === "/login") {
    return <Component />;
  }

  return (
    <>
      <Header showLinks={!isPublic} />
      <Component />
    </>
  );
}

export default Route;
