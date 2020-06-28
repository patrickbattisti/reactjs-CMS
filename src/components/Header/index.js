import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "./components/Avatar";
import { useUser } from "../../contexts/user";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: "white",
  },
}));

export default function Heder() {
  const { user } = useUser();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.navLink}>
              CMS
            </NavLink>
          </Typography>
          {user?.token ? (
            <>
              <Button color="inherit">
                <NavLink to="/contents" className={classes.navLink}>
                  Contents
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink to="/users" className={classes.navLink}>
                  Users
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink to="/roles" className={classes.navLink}>
                  Roles
                </NavLink>
              </Button>

              <Avatar />
            </>
          ) : (
            <Button color="inherit">
              <NavLink to="/login" className={classes.navLink}>
                Login
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
