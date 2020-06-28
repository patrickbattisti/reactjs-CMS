import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import { format } from "date-fns";

import { useSnackbar } from "../../../contexts/snackbar";
import api from "../../../services/api";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 0",
    height: window.innerHeight - 64,
    overflowY: "auto",
  },
  root: {
    width: "80%",
    margin: "10px auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    textTransform: "capitalize",
  },
}));

export default function Contents() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [contents, setContents] = useState([]);
  const { showError } = useSnackbar();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("contents");

        setContents(response.data);
      } catch (e) {
        showError("Try again later.");
      }
    };

    fetch();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.container}>
      {contents.map((content) => (
        <Card className={classes.root} key={content._id}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {content.createdBy[0]}
              </Avatar>
            }
            title={content.title}
            subheader={`Created by ${content.createdBy} at ${format(
              new Date(content.createdAt),
              "MM/dd/yyyy"
            )}`}
          />
          {content.background && (
            <CardMedia
              className={classes.media}
              image={content.background.url}
              title="Paella dish"
            />
          )}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {content.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
