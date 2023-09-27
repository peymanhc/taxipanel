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
import TitleBox from "../../components/titleBox/TitleBox";
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { GetServices } from "../../store/services/service.action";

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
    objectFit: "cover",
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
    width: "100%",
    height: 56,
    marginTop: 6,
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
  griditemscenter: {
    display: "flex",
    justifyContent: "center",
  },
}));
const Master = ({ info }) => {
  const classes = useStyles();
  const { register } = useForm();
  const [serviceitem, setserviceitem] = useState(null);
  const dispatch = useDispatch();
  const [cartType, setcartType] = useState("شخصی");
  const [oilType, setoilType] = useState("بنزینی");
  const [state, setState] = useState({
    name: "",
    mobile: "",
    phone: "",
    codemeli: "",
    address: "",
    description: "",
    active: "",
    carname: "",
    carColor: "",
    iran: "",
    birthday: "",
    bimeEnd: "",
    certificateEnd: "",
    parentCode: "",
    pelak: {},
  });
  useEffect(() => {
    setState({
      name: info?.displayName,
      mobile: info?.mobile,
      phone: info?.phone,
      codemeli: info?.nid,
      address: info?.address,
      description: info?.description,
      active: info?.active,
      carname: info?.carInfo.carName,
      carColor: info?.carInfo.carColor,
      carDate: info?.carInfo.carDate,
      pelak: info?.pelak,
      birthday: info?.birthday,
      bimeEnd: info?.bimeEnd,
      certificateEnd: info?.certificateEnd,
      parentCode: info?.parentCode,
    });
    setoilType(info?.carInfo?.oilType);
    setcartType(info?.carInfo?.carType);
    setserviceitem(info?.masterService?.serviceTitle);
    dispatch(GetServices());
  }, [info?.id]);
  return (
    <div>
      <TitleBox title={"اطلاعات فردی راننده"} />
      <Grid className={classes.root} container>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.name}
              name={"name"}
              label={"نام و نام خانوادگی"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              value={state.mobile}
              type="text"
              name={"mobile"}
              label={"شماره موبایل"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.phone}
              name={"phone"}
              label={"تلفن ثابت"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <Button className={classes.chooseCity}>
              {" "}
              {serviceitem === null ? "انتخاب خدمت" : serviceitem}
              <ArrowBackIosIcon className={classes.arrow} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              maxLength={2}
              type="text"
              value={state.birthday}
              name={"birthday"}
              label={"دو عدد"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.codemeli}
              name={"codemeli"}
              label={"کد ملی"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.address}
              name={"address"}
              label={"آدرس"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.description}
              name={"description"}
              label={"توضیحات"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            style={{ margin: 0 }}
            inputRef={register}
            name="active"
            value={state.active}
            control={<Checkbox size="small" />}
            label={
              <span style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}>
                راننده فعال ؟
              </span>
            }
          />
        </Grid>
      </Grid>
      <TitleBox title={"اطلاعات خودرو راننده"} />
      <Grid className={classes.root} container>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.carname}
              name={"carname"}
              label={"نام خودرو"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.carColor}
              name={"carColor"}
              label={"رنگ خودرو"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              value={state.carDate}
              name={"carDate"}
              label={"مدل خودرو"}
            />
          </Box>
        </Grid>
        <Box display="flex" justifyContent="space-between">
          <Grid item xs={5}>
            <Typography className={classes.inputlabel}>پلاک</Typography>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    type="text"
                    value={state?.pelak?.iranPelak}
                    name={"iran"}
                    label={"ایران"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    value={state?.pelak?.plaktree}
                    maxLength={3}
                    type="text"
                    name={"seadad"}
                    label={"سه عدد"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    maxLength={1}
                    value={state?.pelak?.plakCharacter}
                    type="text"
                    name={"harf"}
                    label={"حرف"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    maxLength={2}
                    type="text"
                    value={state?.pelak?.plaktwo}
                    name={"doadad"}
                    label={"دو عدد"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "30px" }} item xs={5}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    maxLength={2}
                    type="text"
                    value={state?.certificateEnd}
                    name={"certificateEnd"}
                    label={"تاریخ اتمام گواهینامه"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    maxLength={2}
                    type="text"
                    value={state?.bimeEnd}
                    name={"bimeEnd"}
                    label={"تاریخ اتمام بیمه"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    type="text"
                    value={state.parentCode}
                    name={"parentCode"}
                    label={"کدناظر"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={7}>
            <Typography className={classes.inputlabel}>نوع سوخت</Typography>
            <Box display="flex" justifyContent="space-between">
              <RadioGroup
                inputRef={register}
                name="oilType"
                className={classes.radiogp}
                value={oilType}
              >
                <FormControlLabel
                  value="بنزینی"
                  control={<Radio size="small" />}
                  label="بنزینی"
                />
                <FormControlLabel
                  value="گازسوز"
                  control={<Radio size="small" />}
                  label="گازسوز"
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography className={classes.inputlabel}>نوع خودرو</Typography>
            <Box display="flex" justifyContent="space-between">
              <RadioGroup
                className={classes.radiogp}
                value={cartType}
                inputRef={register}
                name="carType"
              >
                <FormControlLabel
                  value="شخصی"
                  control={<Radio size="small" />}
                  label="شخصی"
                />
                <FormControlLabel
                  value="تاکسی"
                  control={<Radio size="small" />}
                  label="تاکسی"
                />
              </RadioGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <TitleBox title={"چند رسانه ای"} />
      <Grid className={classes.root} container>
        <Grid className={classes.griditemscenter} item xs={6} md={2}>
          <Box className={classes.ImageBox}>
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.images?.picAvarez}`}
            />
          </Box>
        </Grid>
        <Grid className={classes.griditemscenter} item xs={6} md={2}>
          <Box className={classes.ImageBox}>
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.images?.picBime}`}
            />
          </Box>
        </Grid>
        <Grid className={classes.griditemscenter} item xs={6} md={2}>
          <Box className={classes.ImageBox}>
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.images?.picCarKart}`}
            />
          </Box>
        </Grid>
        <Grid className={classes.griditemscenter} item xs={6} md={2}>
          <Box className={classes.ImageBox}>
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.images?.picCertificate}`}
            />
          </Box>
        </Grid>
        <Grid className={classes.griditemscenter} item xs={6} md={2}>
          <Box className={classes.ImageBox}>
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.images?.picProfile}`}
            />
          </Box>
        </Grid>
        <Grid className={classes.griditemscenter} item xs={6} md={2}>
          <Box className={classes.ImageBox}>
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.images?.picTaxiCertificate}`}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Master;
