import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#46426c",
    textAlign: "center",
    height: "100vh",
  },
  title: {
    margin: 0,
    textAlign: "center",
    color: "white",
    fontSize: "15em",
    fontWeight: 100,
    textShadow: "1px 8px 3px black",
  },
  text: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 50,
    textShadow: "1px 1px 2px rgba(255,255,255,0.3)",
  },
  button: {
    border: "1px solid white",
    color: "white",
    padding: "10px 15px",
    textDecoration: "none",
  },
}));
function NotFound() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <h1 className={classes.title}>404</h1>
      <p className={classes.text}>صفحه مورد نظر وجود ندارد</p>
      <Link className={classes.button} to="/">
        برگشت به صفحه پیشخوان
      </Link>
    </Box>
  );
}

export default NotFound;
