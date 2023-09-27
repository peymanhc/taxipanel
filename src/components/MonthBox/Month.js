import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundImage: "linear-gradient(#262545, #262545)",
    minHeight: "470px",
    width: "100%",
    position: "relative",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  wrapper: {
    backgroundImage: "linear-gradient(#46426c, #2d284d)",
    width: "100%",
    padding: "25px",
    position: "relative",
    height: 350,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: "#6f6f97",
    margin: "5px 20px",
  },
  month: {
    color: "#7f7aa7",
    fontSize: 15,
    fontWeight: 700,
  },
  permonthTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: 700,
  },
  divider: {
    height: 2,
    width: "95%",
    backgroundColor: "#4e4965",
    bottom: 40,
    position: "absolute",
  },
  refresh: {
    left: 30,
    top: 0,
    bottom: 0,
    margin: "auto",
    position: "absolute",
    cursor: "pointer",
  },
}));
const Month = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>آمار بازدید</Typography>
      <Box className={classes.wrapper}>
        <Typography className={classes.month}>آبان</Typography>
        <Typography className={classes.permonthTitle}>آمار ماهانه</Typography>
        <RefreshIcon className={classes.refresh} />
        <Divider className={classes.divider} />
      </Box>
    </Box>
  );
};

export default Month;
