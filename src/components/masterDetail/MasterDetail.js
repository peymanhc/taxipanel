import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserInfo } from "../../store/users/users.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "10px auto",
    direction: "rtl",
  },
  ImageBox: {
    cursor: "pointer",
    float: "right",
    width: 220,
    height: 220,
    border: "2px dotted #46426c",
    borderRadius: 15,
    padding: "7px",
    position: "relative",
    overflow: "hidden",
  },
  imgfile: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  inputlabel: {
    fontSize: 14,
    fontWeight: 800,
    padding: "0 15px",
    color: "#627e8c",
  },
  radiogp: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    direction: "rtl",
  },
  chooseCity: {
    marginTop: 6,
    width: "100%",
    height: 56,
    color: "#627e8c",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    fontWeight: 700,
    fontSize: 15,
    textAlign: "right",
    direction: "rtl",
    display: "flex",
    justifyContent: "space-between",
  },
  arrow: {
    margin: "0 10px",
  },
  cityList: {
    width: "100%",
    cursor: "pointer",
    textAlign: "right",
    direction: "rtl",
    padding: "7px 10px",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.03)",
    },
  },
  modalTitle: {
    backgroundColor: "#46426c",
    color: "white",
    fontSize: 18,
    fontWeight: 900,
    marginBottom: "10px",
    textAlign: "center",
    padding: "5px",
  },
  city: {
    fontSize: 18,
    fontWeight: 900,
    color: "#546e7a",
  },
}));
const MasterDetail = ({ info }) => {
  const classes = useStyles();
  const { register } = useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const [state, setState] = useState({
    username: "",
    usercode: "",
    codemoaref: "",
    address: "",
    mobile: "",
    create_date: "",
    active: "",
  });
  useEffect(() => {
    setState({
      username: info?.displayName,
      usercode: info?.UserCode,
      codemoaref: info?.parentCode,
      address: info?.address,
      mobile: info?.mobile,
      create_date: info?.createDate,
      active: info?.active,
    });
    dispatch(getUserInfo(params.id));
  }, [info?.id]);
  return (
    <div>
      <Grid className={classes.root} container>
        <Grid item md={4} xs={12}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              onChange={(e) => setState({ ...state, username: e.target.value })}
              value={state.username}
              name={"username"}
              label={"نام کاربری"}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              onChange={(e) => setState({ ...state, usercode: e.target.value })}
              value={state.usercode}
              type="text"
              name={"usercode"}
              label={"کد کاربری"}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              onChange={(e) =>
                setState({ ...state, codemoaref: e.target.value })
              }
              value={state.codemoaref}
              name={"codemoaref"}
              label={"کد معرف"}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              onChange={(e) => setState({ ...state, address: e.target.value })}
              value={state.address}
              label={"آدرس کاربر"}
              name={"address"}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              onChange={(e) => setState({ ...state, mobile: e.target.value })}
              value={state.mobile}
              label={"شماره موبایل"}
              name={"mobile"}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              onChange={(e) =>
                setState({ ...state, create_date: e.target.value })
              }
              value={state.create_date}
              name={"create_date"}
              label={"تاریخ عضویت"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            style={{ margin: 0 }}
            inputRef={register}
            onChange={(e) => setState({ ...state, active: !state.active })}
            checked={state.active}
            control={<Checkbox name="active" size="small" />}
            label={
              <span style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}>
                راننده فعال ؟
              </span>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MasterDetail;
