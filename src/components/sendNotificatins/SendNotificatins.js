import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendNoti } from "../../store/config/config.action";
import InputText from "../InputText/InputText";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(47px,-5px) scale(0.7) !important",
    },
  },
  title: {
    fontSize: 15,
    padding: "5px 15px",
    fontWeight: 700,
  },
  submit: {
    padding: "5px",
    backgroundColor: "#252d4c",
    color: "white",
    width: "200px",
    "&:hover": {
      backgroundColor: "#252d4c",
    },
  },
  errmsg: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
}));
const SendNotificatins = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Config = useSelector((state) => state.Config);
  const Driver = useSelector((state) => state.Driver);
  const info = Driver?.masterDetail?.data[0];
  const [state, setState] = useState({
    titledriver: "",
    infodriver: "",
    contentdriver: "",
    titlecustmer: "",
    infocustmer: "",
    contentcustmer: "",
  });
  const submitNotificationDriver = () => {
    dispatch(
      SendNoti(
        state.titledriver,
        state.infodriver,
        state.contentdriver,
        info?.Token
      )
    );
  };
  return (
    <Box dir="rtl" >
      <Typography className={classes.title}>
        ارسال نوتیفیکیشن به این کاربر
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box padding="10px">
            <InputText
              value={state.titledriver}
              onChange={(e) =>
                setState({ ...state, titledriver: e.target.value })
              }
              type="text"
              name={"title"}
              label={"عنوان نوتیفیکیشن"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding="10px">
            <InputText
              value={state.infodriver}
              onChange={(e) =>
                setState({ ...state, infodriver: e.target.value })
              }
              type="text"
              name={"info"}
              label={"موضوع نوتیفیکیشن"}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box padding="10px">
            <InputText
              value={state.contentdriver}
              onChange={(e) =>
                setState({ ...state, contentdriver: e.target.value })
              }
              type="text"
              name={"content"}
              label={"متن نوتیفیکیشن"}
              multiline={true}
            />
          </Box>
        </Grid>
        <Box
          padding="10px"
          flexDirection="column"
          alignItems="end"
          display="flex"
          width="100%"
        >
          <Button onClick={submitNotificationDriver} className={classes.submit}>
            ارسال
          </Button>
        </Box>
      </Grid>
      <Typography className={classes.errmsg}>
        {" "}
        {Config?.error?.message}
      </Typography>
    </Box>
  );
};

export default SendNotificatins;
