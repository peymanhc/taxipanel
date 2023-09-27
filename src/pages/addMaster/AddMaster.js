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
import axios from "../../shared/Shared";
import InputText from "../../components/InputText/InputText";
import SearchBar from "../../components/searchbar/SearchBar";
import TitleBox from "../../components/titleBox/TitleBox";
import ImageUploader from "react-images-upload";
import { Controller, useForm } from "react-hook-form";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { AddDriver } from "../../store/driver/driver.action";
import { GetServices } from "../../store/services/service.action";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveModal from "../../components/saveModal/SaveModal";
import SimpleDatePicker from "../../components/datePicker/DatePicker";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "10px auto",
    direction: "rtl",
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
}));
const AddMaster = () => {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [serviceitem, setserviceitem] = useState(null);
  const [Loading, setLoading] = useState(false);
  const Services = useSelector((state) => state.Services);
  const Drivers = useSelector((state) => state.Driver);
  const dispatch = useDispatch();
  const [openmodal, setOpenmodal] = useState("");
  const [cartType, setcartType] = useState("شخصی");
  const [oilType, setoilType] = useState("بنزینی");
  const [passworderr, setpassworderr] = useState(null);
  const [dates, setDate] = useState({
    bimeEnd: "",
    birthday: "",
    certificateEnd: "",
    carDate: "",
  });
  const [pictures, setpicture] = useState({
    picProfile: "",
    picCertificate: "",
    picCarKart: "",
    picBime: "",
    picAvarez: "",
  });
  const handleChangeOil = (event) => {
    setoilType(event.target.value);
  };
  const handleChangeCar = (event) => {
    setcartType(event.target.value);
  };
  const saveDriver = (data) => {
    if (data.confrimPassword === data.password) {
      dispatch(
        AddDriver(data, serviceitem?.id, cartType, oilType, dates, pictures)
      );
      setpassworderr(null);
    } else {
      setpassworderr("ارور رمز عبور");
    }
  };
  const handleCloseModal = () => {
    setOpenmodal("");
  };
  const handleOpenModal = (index) => {
    setOpenmodal(index);
  };
  const handleChangeService = (index) => {
    setserviceitem(index);
    setOpenmodal("");
  };
  useEffect(() => {
    dispatch(GetServices());
  }, []);
  const onDropProfile = (picture) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const data = new FormData();
    data.append("image", picture !== undefined ? picture[0] : "");
    data.append("image", picture !== undefined ? picture[0].name : "");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const request = axios.post("config/imageUpload", data, config);
    request
      .then((response) => {
        setpicture({
          ...pictures,
          picProfile: response.data.data.picUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDropCertificate = (picture) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const data = new FormData();
    data.append("image", picture !== undefined ? picture[0] : "");
    data.append("image", picture !== undefined ? picture[0].name : "");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const request = axios.post("config/imageUpload", data, config);
    request
      .then((response) => {
        setpicture({
          ...pictures,
          picCertificate: response.data.data.picUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDropCarKart = (picture) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const data = new FormData();
    data.append("image", picture !== undefined ? picture[0] : "");
    data.append("image", picture !== undefined ? picture[0].name : "");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const request = axios.post("config/imageUpload", data, config);
    request
      .then((response) => {
        setpicture({
          ...pictures,
          picCarKart: response.data.data.picUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDropBime = (picture) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const data = new FormData();
    data.append("image", picture !== undefined ? picture[0] : "");
    data.append("image", picture !== undefined ? picture[0].name : "");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const request = axios.post("config/imageUpload", data, config);
    request
      .then((response) => {
        setpicture({
          ...pictures,
          picBime: response.data.data.picUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDropAvarez = (picture) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const data = new FormData();
    data.append("image", picture !== undefined ? picture[0] : "");
    data.append("image", picture !== undefined ? picture[0].name : "");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const request = axios.post("config/imageUpload", data, config);
    request
      .then((response) => {
        setpicture({
          ...pictures,
          picAvarez: response.data.data.picUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <SearchBar
        error={Drivers?.msg?.data?.message || passworderr}
        onclick={() => handleOpenModal("save")}
        search={false}
        height={120}
        btntext={"ذخیره"}
        title={"افزودن راننده"}
      />
      <TitleBox title={"اطلاعات فردی راننده"} />
      <Grid className={classes.root} container>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              name={"name"}
              label={"نام و نام خانوادگی"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <Controller
              name={"mobile"}
              render={({ value, onChange }) => (
                <InputText
                  label={"شماره موبایل"}
                  type={"number"}
                  inputRef={register({
                    required: "موردی وارد کنید",
                  })}
                  maxLength={11}
                  type="number"
                  value={value}
                  onChange={(e) => onChange(parseInt(e.target.value, 10))}
                />
              )}
              control={control}
              defaultValue={0}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
              name={"phone"}
              label={"تلفن ثابت"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <Button
              onClick={() => handleOpenModal("service")}
              className={classes.chooseCity}
            >
              {" "}
              {serviceitem === null
                ? "انتخاب خدمت"
                : serviceitem?.infoService?.title}
              <ArrowBackIosIcon className={classes.arrow} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <SimpleDatePicker
              label=" تاریخ تولد"
              setvalue={(e, i) => setDate({ ...dates, birthday: e })}
            />
          </Box>
          {console.log(dates)}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="text"
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
              name={"description"}
              label={"توضیحات"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="password"
              name={"password"}
              label={"رمز عبور"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box padding="10px">
            <InputText
              inputRef={register}
              type="password"
              name={"confrimPassword"}
              label={"تکرار رمز عبور"}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            style={{ margin: 0 }}
            inputRef={register}
            name="active"
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
              name={"carColor"}
              label={"رنگ خودرو"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding="10px">
            <SimpleDatePicker
              label="سال ساخت"
              setvalue={(e, i) => setDate({ ...dates, carDate: e })}
            />
          </Box>
        </Grid>
        <Box display="flex" justifyContent="space-between">
          <Grid item xs={5}>
            <Typography className={classes.inputlabel}>پلاک</Typography>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <Controller
                    name={"iran"}
                    render={({ value, onChange }) => (
                      <InputText
                        label={"ایران"}
                        type={"number"}
                        inputRef={register({
                          required: "موردی وارد کنید",
                        })}
                        maxLength={2}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value, 10))}
                      />
                    )}
                    control={control}
                    defaultValue={11}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <Controller
                    name={"seadad"}
                    render={({ value, onChange }) => (
                      <InputText
                        label={"سه عدد"}
                        type={"number"}
                        inputRef={register({
                          required: "موردی وارد کنید",
                        })}
                        maxLength={3}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value, 10))}
                      />
                    )}
                    control={control}
                    defaultValue={791}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    maxLength={1}
                    type="text"
                    name={"harf"}
                    label={"حرف"}
                    defaultValue="ج"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box padding="10px">
                  <Controller
                    name={"doadad"}
                    render={({ value, onChange }) => (
                      <InputText
                        label={"دو عدد"}
                        type={"number"}
                        inputRef={register({
                          required: "موردی وارد کنید",
                        })}
                        maxLength={2}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value, 10))}
                      />
                    )}
                    control={control}
                    defaultValue={91}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "30px" }} item xs={5}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box padding="10px">
                  <SimpleDatePicker
                    label="تاریخ اتمام بیمه"
                    setvalue={(e, i) => setDate({ ...dates, bimeEnd: e })}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box padding="10px">
                  <SimpleDatePicker
                    label="تاریخ اتمام گواهینامه"
                    setvalue={(e, i) =>
                      setDate({ ...dates, certificateEnd: e })
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box padding="10px">
                  <InputText
                    inputRef={register}
                    type="text"
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
                onChange={handleChangeOil}
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
                onChange={handleChangeCar}
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
        <Grid item xs={12} md={2}>
          <Box padding="10px">
            <ImageUploader
              ref={register}
              name={"picProfile"}
              withIcon={true}
              buttonText="آپلود عکس کاربری"
              withPreview={true}
              onChange={onDropProfile}
              singleImage={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box padding="10px">
            <ImageUploader
              ref={register}
              name={"picCertificate"}
              withIcon={true}
              buttonText="آپلود عکس گواهینامه"
              withPreview={true}
              onChange={onDropCertificate}
              singleImage={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box padding="10px">
            <ImageUploader
              ref={register}
              name={"picCarKart"}
              withIcon={true}
              buttonText="آپلود عکس کارت ماشین"
              withPreview={true}
              onChange={onDropCarKart}
              singleImage={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box padding="10px">
            <ImageUploader
              ref={register}
              name={"picBime"}
              withIcon={true}
              buttonText="آپلود عکس بیمه نامه"
              withPreview={true}
              onChange={onDropBime}
              singleImage={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box padding="10px">
            <ImageUploader
              ref={register}
              name={"picAvarez"}
              withIcon={true}
              buttonText="آپلود عکس عوارض خودرو"
              withPreview={true}
              onChange={onDropAvarez}
              singleImage={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box display="flex" justifyContent="center" padding="10px">
            {Loading && (
              <CircularProgress
                style={{ width: 50, height: 50, margin: "50px 0" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      {openmodal === "save" ? (
        <SaveModal
          open={openmodal}
          onClose={handleCloseModal}
          SaveChanges={handleSubmit(saveDriver)}
        />
      ) : (
        <SimpleModal
          open={openmodal}
          onClose={handleCloseModal}
          body={
            <React.Fragment>
              <Box className={classes.modalTitle}>انتخاب خدمت</Box>
              <Box
                padding="10px 35px"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                {Services?.services?.data?.map((item, i) => (
                  <Box
                    onClick={() => handleChangeService(item)}
                    key={i}
                    className={classes.cityList}
                  >
                    <Typography className={classes.city}>
                      {item?.infoService?.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </React.Fragment>
          }
        />
      )}
    </Box>
  );
};

export default AddMaster;
