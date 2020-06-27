import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

function Loading() {
  return (
    <span style={{ width: "80%", position: "absolute" }}>
      <LinearProgress />
    </span>
  );
}

export default Loading;
