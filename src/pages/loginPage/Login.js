import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  CheckSession,
  DoLogin,
  ResetPassword,
} from "../../store/auth/auth.action";
import LOGO from "../../resurces/logo_pishgaman.png";
import InputText from "../../components/InputText/InputText";
import TestBg from "../../resurces/testauthImage.PNG";
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundColor: "#242731",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
    color: "white",
    display: "flex",
    justifyContent: "end",
    [theme.breakpoints.down(700)]: {
      flexDirection: "column",
    },
  },
  logo: {
    padding: "200px 150px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down(700)]: {
      display: "none",
    },
  },
  wrapper: {
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    width: 440,
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(700)]: {
      width: "auto",
      minWidth: "100%",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
    },
  },
  form: {
    color: "black",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#455a64",
  },
  divider: {
    margin: "40px 0",
    height: 1,
    backgroundColor: "#455a64",
  },
  input: {
    margin: "15px 0",
    direction: "rtl",
  },
  submitBtn: {
    backgroundColor: "#3d4152",
    color: "white",
    width: "100%",
    padding: "5px 10px",
    fontWeight: 600,
    fontSize: 18,
    margin: "15px 0",
    "&:hover": {
      backgroundColor: "#242731",
    },
  },
  forgotpass: {
    textAlign: "right",
    marginTop: 5,
    fontSize: 15,
    fontWeight: 700,
    color: "#455a64",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  welcome: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: 700,
    color: "white",
  },
  logoimg: {
    width: "200px",
  },
  mobilelogo: {
    width: "100px",
    display: "none",
    [theme.breakpoints.down(700)]: {
      display: "block",
      margin: "auto",
    },
  },
}));
function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const Auth = useSelector((state) => state.Auth);
  const [form, setform] = useState("login");
  const [loading, setloading] = useState(false);
  const handleLogin = (data) => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1500);
    dispatch(DoLogin(data.mobile, data.password));
  };
  const handleChangePassword = (data) => {
    dispatch(ResetPassword(data.mobile, data.password));
  };
  useEffect(() => {
    dispatch(CheckSession());
    Auth?.profile?.status && window.location.replace("/dashboard");
  }, [Auth?.profile?.status]);
  return (
    <Box style={{ backgroundImage: `url(${TestBg})` }} className={classes.root}>
      <Box className={classes.logo}>
        <img className={classes.logoimg} alt="logo" src={LOGO} />
        <Typography className={classes.welcome}>خوش آمدید</Typography>
      </Box>
      <Box className={classes.wrapper}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
          padding="0 50px"
        >
          <img className={classes.mobilelogo} alt="logo" src={LOGO} />
          {form === "login" ? (
            <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
              <Typography className={classes.title}>ورود به سامانه</Typography>
              <Divider className={classes.divider} />
              <Box padding="10px 0">
                <InputText
                  label="شماره موبایل"
                  variant="outlined"
                  inputRef={register}
                  name="mobile"
                  maxLength={11}
                />
              </Box>
              <Box padding="10px 0">
                <InputText
                  label="رمز عبور"
                  type="password"
                  variant="outlined"
                  inputRef={register}
                  name="password"
                  maxLength={25}
                />
              </Box>
              <Button
                disabled={Auth?.loading}
                type="submit"
                className={classes.submitBtn}
              >
                {Auth?.loading || loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "ورود"
                )}
              </Button>
              <Typography className={classes.errorMessage}>
                {Auth.data.message}
              </Typography>
              <Typography
                onClick={() => setform("Forgotpassword")}
                className={classes.forgotpass}
              >
                رمز عبور را فراموش کردم
              </Typography>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className={classes.form}
            >
              <Typography className={classes.title}>تغییر رمز عبور</Typography>
              <Divider className={classes.divider} />
              <Box padding="10px 0">
                <InputText
                  label="شماره موبایل"
                  variant="outlined"
                  inputRef={register}
                  name="mobile"
                />
              </Box>
              <Box padding="10px 0">
                <InputText
                  label="رمز جدید"
                  type="password"
                  variant="outlined"
                  inputRef={register}
                  name="password"
                />
              </Box>
              <Button type="submit" className={classes.submitBtn}>
                تغییر رمز عبور
              </Button>
              <Typography className={classes.errorMessage}>
                {console.log(Auth)}
                {Auth?.msg?.message !== undefined
                  ? Auth?.msg?.message
                  : Auth?.msg?.data?.message}
              </Typography>
              <Typography
                onClick={() => setform("login")}
                className={classes.forgotpass}
              >
                ورود
              </Typography>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
