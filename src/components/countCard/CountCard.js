import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    position: "relative",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    margin: "10px",
    width: 360,
    height: 240,
    borderRadius: 10,
  },
  refresh: {
    left: 15,
    top: 15,
    margin: "auto",
    position: "absolute",
    cursor: "pointer",
  },
  icon: {
    fontSize: 120,
    opacity: 0.2,
  },
  countnumber: {
    fontSize: 35,
    fontWeight: 700,
  },
  counttext: {
    fontSize: 20,
    fontWeight: 700,
  },
}));
const CountCard = ({ bgcolor, count, text, icon }) => {
  const classes = useStyles();
  return (
    <Box style={{ backgroundImage: bgcolor }} className={classes.root}>
      <Box>
        <Typography className={classes.countnumber}>{count}</Typography>
        <Typography className={classes.counttext}>{text}</Typography>
      </Box>
      {icon}
      <RefreshIcon className={classes.refresh} />
    </Box>
  );
};

export default CountCard;
