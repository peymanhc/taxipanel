import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import Sidebar from "../layout/sidebar/Sidebar";
import TopBar from "../layout/topbar/TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "right",
    [theme.breakpoints.down(920)]: {
      display: "none",
    },
  },
  test: {
    width: "calc(100% - 280px)",
    [theme.breakpoints.down(1200)]: {
      width: "75%",
    },
    [theme.breakpoints.down(920)]: {
      width: "100%",
    },
  },
}));
const Private = ({ component: Component, isAuthenticated, ...rest }) => {
  const classes = useStyles();
  const Auth = useSelector((state) => state.Auth);
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        Auth?.profile?.status === true ? (
          <>
            <TopBar
              name={Auth?.profile?.data[0]?.desplayName}
              mobile={Auth?.profile?.data[0]?.mobile}
            />
            <Box className={classes.root}>
              <Sidebar />
            </Box>
            <Box className={classes.test}>
              <Component {...props} />
            </Box>
          </>
        ) : (
          <Redirect
            to={{ pathname: "/loginPage", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default Private;
