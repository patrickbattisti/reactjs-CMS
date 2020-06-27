import React from "react";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    height: 150,
    userSelect: "none",
  },
  root: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    flexDirection: "column",
    height: 150,
  },
  message: {
    color: "#777",
    marginTop: 5,
  },
});

function EmptyMessage({ rowName }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.root}>
          <LineWeightIcon style={{ fontSize: 45, color: "#777" }} />

          <Typography
            color="textPrimary"
            variant="h6"
            className={classes.message}
          >
            No Data
          </Typography>
        </div>
      </div>
    </>
  );
}

export default EmptyMessage;
