import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SearchBar from "../../components/searchbar/SearchBar";
import React, { useEffect, useState } from "react";
import TitleBox from "../../components/titleBox/TitleBox";
import InputText from "../../components/InputText/InputText";
import ImageUploader from "react-images-upload";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PostServices } from "../../store/services/service.action";
import { GetCities } from "../../store/cities/city.action";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { UploadImage } from "../../store/config/config.action";
import axios from "../../shared/Shared";
import SaveModal from "../../components/saveModal/SaveModal";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "90%",
    margin: "auto",
    marginTop: 10,
    color: "#627e8c",
  },
  uploadimage: {
    margin: "auto",
    width: 400,
    float: "right",
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
    display: "flex",
    justifyContent: "space-between",
  },
  "@global": {
    ".fileContainer": {
      boxShadow: "none",
      border: "1px dotted #627e8c",
    },
  },
  searchcity: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    padding: "4px 15px",
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    marginBottom: "10px",
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
  arrow: {
    margin: "0 10px",
  },
  error: {
    color: "red",
    fontSize: 10,
  },
}));
function AddService() {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm();
  const [pictures, setpicture] = useState(0);
  const [citydata, setCitydata] = useState("");
  const [cityname, setcityname] = useState("");
  const [openmodal, setOpenmodal] = useState(false);
  const [keyword, setkeyword] = useState("");
  const Services = useSelector((state) => state.Services);
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.Cities);
  const Config = useSelector((state) => state.Config);
  const history = useHistory();
  useEffect(() => {
    dispatch(GetCities());
  }, []);
  useEffect(() => {
    setpicture(Config?.imageurl?.data?.data?.picUrl);
  }, [Config?.imageurl?.status]);
  const onDrop = (picture) => {
    dispatch(UploadImage(picture));
  };
  const saveService = (data) => {
    dispatch(PostServices(data, pictures, citydata));
  };
  const handleOpenModal = (index) => {
    setOpenmodal(index);
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const handleSearch = (e) => {
    setkeyword(e.target.value);
  };
  const handleChangeCity = (item) => {
    setCitydata(item.id);
    setcityname(item.nameCity);
    setOpenmodal(false);
  };
  const re = new RegExp(keyword, "i");
  const filtered = Cities?.cities?.data?.filter((entry) =>
    Object.values(entry).some((val) => typeof val === "string" && val.match(re))
  );
  useEffect(() => {
    Services?.error?.data?.status ? history.push(`/ServiceList`) : null;
  }, [Services?.error?.data?.status]);
  return (
    <Box>
      {openmodal === "save" ? (
        <SaveModal
          open={openmodal}
          onClose={handleCloseModal}
          SaveChanges={handleSubmit(saveService)}
        />
      ) : (
        <SimpleModal
          open={openmodal}
          onClose={handleCloseModal}
          body={
            <React.Fragment>
              <Box className={classes.modalTitle}>انتخاب شهر</Box>
              <Box
                padding="10px 35px"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box className={classes.searchcity} width="100%">
                  <InputBase
                    value={keyword}
                    onChange={(e) => handleSearch(e)}
                    style={{
                      width: "100%",
                      direction: "rtl",
                      textAlign: "right",
                      padding: "2px 7px",
                    }}
                  />
                  <SearchIcon />
                </Box>
                {filtered?.map((item, i) => (
                  <Box
                    onClick={() => handleChangeCity(item)}
                    key={i}
                    className={classes.cityList}
                  >
                    <Typography className={classes.city}>
                      {item.nameCity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </React.Fragment>
          }
        />
      )}
      <SearchBar
        onclick={() => handleOpenModal("save")}
        btntext={"ذخیره"}
        error={Services?.error?.data?.message}
        search={false}
        height={120}
        title={"افزودن خدمت"}
      />
      <TitleBox title={"اطلاعات خدمت"} />
      <Box className={classes.form}>
        <Grid container>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputText
                name={"codeService"}
                inputRef={register}
                label={"کد خدمت"}
                maxLength={25}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputText
                name={"title"}
                inputRef={register}
                label={"نام خدمت"}
                maxLength={25}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenModal("city")}
                className={classes.chooseCity}
              >
                <ArrowBackIosIcon className={classes.arrow} />
                {cityname === "" ? "انتخاب شهر" : cityname}
              </Button>
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputText
                name={"description"}
                inputRef={register}
                label={"توضیحات خدمت"}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <FormControlLabel
                control={
                  <Checkbox
                    inputRef={register}
                    name={"is_active"}
                    size="small"
                  />
                }
                label={<span style={{ fontWeight: 800 }}>خدمت فعال؟</span>}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <Controller
                name={"komision"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"کمیسیون"}
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
                {errors?.komision?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <Controller
                name={"priceInter"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"مبلغ ورودی"}
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
                {errors?.priceInter?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <Controller
                name={"priceMin"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"قیمت هر دقیقه"}
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
                {errors?.priceMin?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <Controller
                name={"priceKil"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"قیمت هر کیلومتر"}
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
              <Typography className={classes.error} className={classes.error}>
                {errors?.priceKil?.message}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <Controller
                name={"priceLess"}
                render={({ value, onChange }) => (
                  <InputText
                    label={"حداقل قیمت"}
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
                {errors?.priceLess?.message}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.uploadimage}>
          <ImageUploader
            ref={register}
            name={"image"}
            withIcon={true}
            buttonText="آپلود عکس"
            withPreview={true}
            onChange={onDrop}
            singleImage={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AddService;
