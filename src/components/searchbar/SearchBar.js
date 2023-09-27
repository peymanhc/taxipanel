import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundColor: "#46426c",
    minHeight: "160px",
    width: "100%",
    position: "relative",
    color: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px 65px",
    margin: "20px 0",
    marginTop: 0,
    [theme.breakpoints.down(1200)]: {
      padding: "20px",
    },
    [theme.breakpoints.down(920)]: {
      marginTop: 65,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 900,
    [theme.breakpoints.down(1200)]: {
      fontSize: 15,
    },
  },
  inputroot: {
    width: "100%",
    backgroundColor: "white",
    color: "black",
    fontWeight: 900,
    fontSize: 15,
    padding: "10px 20px",
    borderRadius: "10px",
    [theme.breakpoints.down(1200)]: {
      padding: "5px 10px",
    },
    [theme.breakpoints.down(920)]: {
      display: "none",
    },
  },
  submitButton: {
    width: "145px",
    borderRadius: 10,
    padding: "10px 7px",
    backgroundColor: "#262545",
    color: "white",
    fontSize: 16,
    margin: "0 50px",
    fontWeight: 800,
    "&:hover": {
      backgroundColor: "black",
    },
    [theme.breakpoints.down(1200)]: {
      padding: "5px",
      width: "120px",
    },
    [theme.breakpoints.down(920)]: {
      margin: "0",
    },
  },
  before: {
    color: "white",
    margin: "0 10px",
  },
  err: {
    textAlign: "center",
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
  boxTitle: {
    width: "30%",
    [theme.breakpoints.down(920)]: {
      width: "50%",
    },
  },
}));
const SearchBar = ({
  title,
  search,
  onclick,
  btntext,
  error,
  submitbtn,
  background,
  height,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };
  return (
    <Box
      style={{ backgroundColor: background, minHeight:  height }}
      className={classes.root}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box className={classes.boxTitle} display="flex" alignItems="center">
          <IconButton onClick={GoBack} className={classes.before}>
            <ChevronRightIcon />
          </IconButton>
          <Typography className={classes.title}>{title}</Typography>
        </Box>
        {search ? (
          <InputBase className={classes.inputroot} placeholder="جستجو" />
        ) : (
          ""
        )}
        {submitbtn !== false && (
          <Box display="flex" flexDirection="column">
            <Button onClick={onclick} className={classes.submitButton}>
              {btntext}
            </Button>
            <Typography className={classes.err}>{error}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
