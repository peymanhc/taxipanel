import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import LOGO from "../../resurces/logo_pishgaman.png"
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundColor: "#242731",
    minHeight: "100vh",
    width:"100%",
    position: "relative",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo:{
    width:"200px"
  }
}));
const LoadingSplash = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <img className={classes.logo} src={LOGO} alt="Pishgaman" />
      <CircularProgress style={{ color: "white", margin: "10px 0" }} />
    </Box>
  );
};

export default LoadingSplash;
