import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText";
import SearchBar from "../../components/searchbar/SearchBar";
import TitleBox from "../../components/titleBox/TitleBox";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Controller, useForm } from "react-hook-form";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import { GetServices } from "../../store/services/service.action";
import { useDispatch, useSelector } from "react-redux";
import { AddDiscount } from "../../store/discount/discount.action";
import { useHistory } from "react-router";
import SaveModal from "../../components/saveModal/SaveModal";
import SimpleDatePicker from "../../components/datePicker/DatePicker";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "90%",
    margin: "20px auto",
    direction: "rtl",
  },
  chooseCity: {
    width: "100%",
    height: 56,
    marginTop: 6,
    color: "#627e8c",
    padding: "0 10px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    fontWeight: 700,
    fontSize: 15,
    textAlign: "right",
    display: "flex",
    justifyContent: "space-between",
  },
  arrow: {
    margin: "0 10px",
  },
  modalTitle: {
    backgroundColor: "#46426c",
    color: "white",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "center",
    padding: "5px",
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
  city: {
    fontSize: 15,
    fontWeight: 900,
    color: "#546e7a",
  },
  error: {
    color: "red",
    fontSize: 10,
  },
}));
function AddDiscountCode() {
  const classes = useStyles();
  const [openmodal, setOpenmodal] = useState("");
  const [userUseThat, setuserUseThat] = useState(false);
  const [date, setdate] = useState("");
  const [serviceUseThat, setserviceUseThat] = useState(false);
  const [service, setservice] = useState(null);
  const { register, handleSubmit, errors, control } = useForm();
  const Services = useSelector((state) => state.Services);
  const Discount = useSelector((state) => state.Discount);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(GetServices());
  }, []);
  const handleOpenModal = (index) => {
    setOpenmodal(index);
  };
  const handleCloseModal = () => {
    setOpenmodal("");
  };
  const handleChangeService = (item) => {
    setservice(item);
    setOpenmodal("");
  };
  const handleAddDiscount = (data) => {
    dispatch(
      AddDiscount(
        data.discountCode,
        data.maximumPrice,
        data.percentCode,
        date.toString(),
        serviceUseThat ? "0" : service?.id,
        userUseThat ? "0" : data.userMobile
      )
    );
  };
  return (
    <Box>
      <SearchBar
        onclick={() => handleOpenModal("save")}
        btntext={"ذخیره"}
        error={Discount?.msg?.message}
        search={false}
        title={"افزودن کد تخفیف"}
      />
      <TitleBox title={"اطلاعات کد تخفیف"} />
      <Box className={classes.wrapper}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box padding="5px 10px">
              <InputText
                maxLength={25}
                name={"discountCode"}
                inputRef={register}
                label={"کد تخفیف"}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="5px 10px">
              <Controller
                name={"percentCode"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"درصد تخفیف"}
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
                defaultValue={0}
              />
              <Typography className={classes.error}>
                {errors?.percentCode?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="5px 10px">
              <Controller
                name={"maximumPrice"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"حداکثر تخفیف"}
                    type={"number"}
                    inputRef={register({
                      required: "موردی وارد کنید",
                    })}
                    maxLength={12}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10))}
                  />
                )}
                control={control}
                defaultValue={0}
              />
              <Typography className={classes.error}>
                {errors?.maximumPrice?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="5px 10px">
              <SimpleDatePicker label={"انقضا"} setvalue={setdate} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="5px 10px">
              <Controller
                name={"userMobile"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"موبایل کاربر"}
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
                disabled={userUseThat}
              />
              <Typography className={classes.error}>
                {errors?.userMobile?.message}
              </Typography>
              <FormControlLabel
                style={{ margin: 0 }}
                control={
                  <Checkbox
                    value={userUseThat}
                    onChange={() => setuserUseThat(!userUseThat)}
                    size="small"
                  />
                }
                label={
                  <span
                    style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}
                  >
                    همه کاربران
                  </span>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="5px 10px">
              <Button
                onClick={() => handleOpenModal("city")}
                disabled={serviceUseThat}
                className={classes.chooseCity}
              >
                {service === null
                  ? " انتخاب خدمت"
                  : service?.infoService?.title}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
              <FormControlLabel
                style={{ margin: 0 }}
                control={
                  <Checkbox
                    value={serviceUseThat}
                    onChange={() => setserviceUseThat(!serviceUseThat)}
                    size="small"
                  />
                }
                label={
                  <span
                    style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}
                  >
                    همه خدمات
                  </span>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openmodal === "save" ? (
        <SaveModal
          open={openmodal}
          onClose={handleCloseModal}
          SaveChanges={handleSubmit(handleAddDiscount)}
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
                      {item.infoService.title} ({item?.city?.cityName})
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
}

export default AddDiscountCode;
