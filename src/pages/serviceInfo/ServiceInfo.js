import {
  AppBar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputBase,
  LinearProgress,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import SearchBar from "../../components/searchbar/SearchBar";
import { GetServiceInfo } from "../../store/serviceInfo/serviceInfo.action";
import { UpdateServices } from "../../store/services/service.action";
import InputLabel from "@material-ui/core/InputLabel";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ImageUploader from "react-images-upload";
import axios from "../../shared/Shared";
import SaveModal from "../../components/saveModal/SaveModal";
const useStyles = makeStyles((theme) => ({
  panel: {
    position: "relative",
    top: -50,
    direction: "rtl",
    padding: "0 40px",
    boxShadow: "none",
    backgroundImage: "linear-gradient(#46426c, #251f57)",
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
    backgroundColor: "white",
  },
  imgfile: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  input: {
    direction: "rtl",
    width: "100%",
    textAlign: "right",
    color: "rgba(0,0,0,0.7)",
    fontWeight: 700,
    fontSize: 15,
    border: "1px solid rgba(0,0,0,0.3)",
    borderRadius: 4,
    height: 56,
    padding: "20px",
  },
  label: {
    padding: "5px 10px",
    color: "#627e8c",
    fontWeight: 700,
  },
  zoomicon: {
    fontSize: 25,
    zIndex: 9,
    position: "absolute",
    right: 15,
    top: 15,
  },
  "@global": {
    ".fileContainer": {
      boxShadow: "none",
    },
  },
}));
function ServiceInfo() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  const ServiceInfo = useSelector((state) => state.ServiceInfo);
  const Services = useSelector((state) => state.Services);
  const [openmodal, setOpenmodal] = useState(false);
  const addCommas = (num) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const [state, setState] = useState({
    codeService: "",
    title: "",
    description: "",
    is_active: "",
    priceLess: "",
    priceMin: "",
    priceKil: "",
    priceInter: "",
    komision: "",
    pic: "",
  });

  const info = ServiceInfo?.data?.data[0];
  useEffect(() => {
    dispatch(GetServiceInfo(params.id));
    setState({
      codeService: info?.infoService?.codeService,
      title: info?.infoService?.title,
      description: info?.infoService?.description,
      is_active: info?.active,
      priceLess: info?.price?.priceLess,
      priceMin: info?.price?.priceMin,
      priceKil: info?.price?.priceKil,
      priceInter: info?.price?.priceInter,
      komision: info?.price?.komision,
      pic: info?.infoService?.image,
    });
  }, [info?.id]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const updateService = () => {
    dispatch(UpdateServices(state, info?.city?.cityId, params.id));
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const handleOpenModal = (index) => {
    setOpenmodal(index);
  };
  const onDropImage = (picture) => {
    const data = new FormData();
    data.append("image", picture !== undefined ? picture[0] : "");
    data.append("image", picture !== undefined ? picture[0].name : "");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const request = axios.post("config/imageUpload", data, config);
    request
      .then((response) => {
        setState({
          ...state,
          pic: response.data.data.picUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      {ServiceInfo.loading ? <LinearProgress /> : null}
      {openmodal === "save" ? (
        <SaveModal
          open={openmodal}
          onClose={handleCloseModal}
          SaveChanges={updateService}
        />
      ) : (
        <SimpleModal
          open={openmodal}
          onClose={handleCloseModal}
          body={
            <>
              <Box width="100%" height="100%">
                <img
                  style={{ width: "100%" }}
                  alt="چند رسانه ای"
                  src={`https://asaptaxi.ir/${info?.infoService?.image}`}
                />
              </Box>
            </>
          }
        />
      )}
      <SearchBar
        onclick={() => handleOpenModal("save")}
        error={Services?.error?.data?.message}
        btntext={"ذخیره"}
        height={120}
        search={false}
        title={info?.infoService?.title}
      />
      <AppBar className={classes.panel} position="relative">
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            style={{ backgroundColor: value === "1" ? "#1e1a46" : "" }}
            value="1"
            label="اطلاعات پایه"
          />
          <Tab
            style={{ backgroundColor: value === "2" ? "#1e1a46" : "" }}
            value="2"
            label="چندرسانه ای"
          />
          <Tab
            style={{ backgroundColor: value === "3" ? "#1e1a46" : "" }}
            value="3"
            label="قیمت گذاری"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="1">
        <Grid style={{ direction: "rtl" }} container>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>نام خدمت</InputLabel>
              <InputBase
                className={classes.input}
                name={"title"}
                label={"نام خدمت"}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                value={state.title}
                inputProps={{ maxLength: 25 }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>کد خدمت</InputLabel>
              <InputBase
                className={classes.input}
                name={"codeService"}
                placeholder={"کد خدمت"}
                onChange={(e) =>
                  setState({ ...state, codeService: e.target.value })
                }
                value={state.codeService}
                inputProps={{ maxLength: 25 }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={12} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>توضیحات خدمت</InputLabel>
              <InputBase
                className={classes.input}
                name={"description"}
                label={"توضیحات خدمت"}
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
                value={state.description}
              />
            </Box>
          </Grid>
        </Grid>
        <Box dir="rtl" padding="10px">
          {console.log(state.is_active)}
          <FormControlLabel
            control={
              <Checkbox
                value={state?.is_active}
                onChange={(e) =>
                  setState({ ...state, is_active: !state.is_active })
                }
                name={"is_active"}
                size="small"
              />
            }
            label={<span style={{ fontWeight: 800 }}>خدمت فعال؟</span>}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index="2">
        <Box display="flex" justifyContent="space-around">
          <Box
            onClick={() => handleOpenModal("photo")}
            className={classes.ImageBox}
          >
            <img
              className={classes.imgfile}
              alt="چند رسانه ای"
              src={`https://asaptaxi.ir/${info?.infoService?.image}`}
            />
            <ZoomInIcon className={classes.zoomicon} />
          </Box>
          <Box className={classes.ImageBox}>
            <ImageUploader
              withIcon={true}
              buttonText="تغییر عکس"
              withPreview={true}
              onChange={onDropImage}
              singleImage={true}
            />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index="3">
        <Grid style={{ direction: "rtl" }} container>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>حداقل قیمت</InputLabel>
              <InputBase
                className={classes.input}
                name={"priceLess"}
                label={"حداقل قیمت"}
                value={state?.priceLess}
                inputProps={{ maxLength: 25 }}
                onChange={(e) =>
                  setState({
                    ...state,
                    priceLess: e.target.value,
                  })
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>قیمت هر دقیقه</InputLabel>
              <InputBase
                className={classes.input}
                name={"priceMin"}
                label={"قیمت هر دقیقه"}
                inputProps={{ maxLength: 25 }}
                value={state?.priceMin}
                onChange={(e) =>
                  setState({
                    ...state,
                    priceMin: e.target.value,
                  })
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>قیمت هر کیلومتر</InputLabel>
              <InputBase
                className={classes.input}
                name={"priceKil"}
                label={"قیمت هر کیلومتر"}
                inputProps={{ maxLength: 25 }}
                value={state?.priceKil}
                onChange={(e) =>
                  setState({
                    ...state,
                    priceKil: e.target.value,
                  })
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>مبلغ ورودی</InputLabel>
              <InputBase
                className={classes.input}
                name={"priceInter"}
                label={"مبلغ ورودی"}
                inputProps={{ maxLength: 25 }}
                value={state?.priceInter}
                onChange={(e) =>
                  setState({
                    ...state,
                    priceInter: e.target.value.replace,
                  })
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} md={2} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>کمیسیون</InputLabel>
              <InputBase
                className={classes.input}
                name={"komision"}
                label={"کمیسیون"}
                inputProps={{ maxLength: 25 }}
                value={state?.komision}
                onChange={(e) =>
                  setState({
                    ...state,
                    komision: e.target.value,
                  })
                }
              />
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
export default ServiceInfo;
