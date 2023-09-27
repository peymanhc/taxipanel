import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundColor: "#262545",
    minHeight: 50,
    width: "90%",
    position: "relative",
    color: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: 900,
  },
}));
const TitleBox = ({title}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
    </Box>
  );
};

export default TitleBox;
