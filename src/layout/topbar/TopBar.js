import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ProfileImage from "../../resurces/profileimage.png";
import { useDispatch, useSelector } from "react-redux";
import { DoLogout } from "../../store/auth/auth.action";
import { GetUsers } from "../../store/config/config.action";
import { useHistory } from "react-router";
import TemporaryDrawer from "../drawer/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "right",
  },
  appBar: {
    width: "calc(100% - 280px)",
    left: 0,
    height: 65,
    backgroundColor: "#eeeeee",
    color: "black",
    [theme.breakpoints.down(1200)]: {
      width: "75%",
    },
    [theme.breakpoints.down(920)]: {
      width: "100%",
    },
  },
  topbar: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    height: "100%",
    [theme.breakpoints.down(920)]: {
      padding: "0",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  mycash: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 10,
    margin: "0 20px",
    [theme.breakpoints.down(920)]: {
      fontSize: 10,
      padding: "4px",
      margin: "0",
    },
  },
  topbaricon: {
    fontSize: 30,
    color: "black",
    margin: "0 20px",
  },
  topbarbtns: {
    [theme.breakpoints.down(920)]: {
      display: "none",
    },
  },
  profile: {
    width: 55,
    height: 55,
    objectFit: "cover",
    borderRadius: "50%",
    border: "1px solid #262545",
    margin: "10px",
    [theme.breakpoints.down(920)]: {
      width: 35,
      height: 35,
    },
  },
  profilename: {
    fontSize: 16,
    fontWeight: 700,
    color: "#262545",
    [theme.breakpoints.down(920)]: {
      fontSize: 13,
    },
  },
  profileNumber: {
    fontSize: 14,
    color: "#262545",
    [theme.breakpoints.down(920)]: {
      fontSize: 12,
    },
  },
}));

const TopBar = ({ name, mobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Config = useSelector((state) => state.Config);
  const history = useHistory();
  const addCommas = num => num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const handleLogout = () => {
    dispatch(DoLogout());
  };
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  const redirectHome = () => {
    history.push(`/dashboard`);
  };
  const myCash = Config?.users?.data[0]?.information?.smsCredite;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.topbar}>
        <Box display="flex" alignItems="center">
          <Button className={classes.topbarbtns} onClick={handleLogout}>
            <ExitToAppIcon className={classes.topbaricon} />
          </Button>
          <Button className={classes.topbarbtns} onClick={redirectHome}>
            <HomeIcon className={classes.topbaricon} />
          </Button>
          <Box
            style={{
              backgroundColor:
                myCash > 1500 ? "#4caf50" : myCash > 1000 ? "orange" : "red",
            }}
            className={classes.mycash}
          >
            موجودی پنل پیامکی {addCommas(myCash)} تومان
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography className={classes.profilename}>{name}</Typography>
            <Typography className={classes.profileNumber}>{mobile}</Typography>
          </Box>
          <img className={classes.profile} alt="profile" src={ProfileImage} />
          <TemporaryDrawer />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
