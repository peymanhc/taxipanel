import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../InputText/InputText";
import CheckIcon from "@material-ui/icons/Check";
import { SmsSubmitPayment } from "../../store/pay/pay.action";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    direction: "rtl",
    textAlign: "right",
    width: "50%",
    [theme.breakpoints.down(920)]: {
      width: "100%",
    },
  },
  cash: {
    fontWeight: 900,
    color: "red",
    fontSize: 16,
    textDecoration: "underline",
  },
  text: {
    color: "#607d8b",
    fontSize: 17,
    letterSpacing: -1,
  },
  submit: {
    fontSize: 15,
    color: "white",
    backgroundColor: "#0c1d34",
    width: 200,
    margin: "0 20px",
  },
  errormsg: {
    color: "red",
    fontWeight: 800,
    fontSize: 14,
  },
}));
const SmsPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [payval, setpayval] = useState("");
  const [loading, setLoading] = useState(false);
  const Config = useSelector((state) => state.Config);
  const Auth = useSelector((state) => state.Auth);
  const Pay = useSelector((state) => state.Pay);
  const myCash = Config?.users?.data[0]?.information?.smsCredite;
  const userid = Auth?.profile?.data[0].id;
  const SubmitSmsPay = () => {
    dispatch(SmsSubmitPayment(userid, payval));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>
        کاربر گرامی موجودی پنل پیامکی شما{" "}
        <span className={classes.cash}>{myCash}</span> تومان میباشد .{" "}
      </Typography>
      <Typography className={classes.text}>
        لطفا توجه داشته باشید درصورتی که اعتبار شما به پایان برسد دیگر امکان ثبت
        نام کاربران وجود ندارد
      </Typography>
      <Box display="flex" margin="20px 0">
        <InputText
          onChange={(e) => setpayval(e.target.value)}
          value={payval}
          label={"قیمت به تومان"}
        />
        <Button onClick={SubmitSmsPay} className={classes.submit}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              پرداخت
              <CheckIcon />
            </>
          )}
        </Button>
      </Box>
      <Typography className={classes.errormsg}>
        {Pay?.error?.message}
      </Typography>
    </Box>
  );
};

export default SmsPanel;
