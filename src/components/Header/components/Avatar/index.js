import React, { useState, useMemo } from "react";

import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { makeStyles, Popover, Typography, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import { useUser } from "../../../../contexts/user";

const useStyles = makeStyles((theme) => ({
  avatarWrapper: {
    marginLeft: 15,
    paddingLeft: 20,
    borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
  },
  avatar: {
    backgroundColor: deepOrange[500],
    cursor: "pointer",
    textTransform: "capitalize",
  },
  popupContainer: {
    padding: 20,
    width: 300,
  },
  popupHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  popupAvatar: {
    backgroundColor: deepOrange[500],
    textTransform: "capitalize",
    width: 80,
    height: 80,
    fontSize: 35,
  },
  popupTitle: {
    fontWeight: 500,
    marginTop: 15,
  },
  popupDescription: {
    color: "#555",
    marginTop: -3,
    marginBottom: 15,
  },
  popupAction: {
    marginTop: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

export default () => {
  const { user, onLogout } = useUser();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const _user = useMemo(() => user?.user || {}, [user]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.avatarWrapper}>
        <Avatar className={classes.avatar} onClick={handlePopoverOpen}>
          {_user.name[0]}
        </Avatar>
      </div>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={classes.popupContainer}>
          <div className={classes.popupHeader}>
            <Avatar className={classes.popupAvatar}>{_user.name[0]}</Avatar>

            <Typography className={classes.popupTitle}>{_user.name}</Typography>
            <Typography className={classes.popupDescription}>
              {_user.email}
            </Typography>
          </div>

          <Divider />
          <div className={classes.popupList}>
            <div className={classes.popupAction}>
              <Button variant="outlined" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};
