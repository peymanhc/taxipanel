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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import TitleBox from "../../components/titleBox/TitleBox";
import SearchIcon from "@material-ui/icons/Search";
import { GetCities } from "../../store/cities/city.action";
import { GetServices } from "../../store/services/service.action";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MyMap from "../../components/map/MyMap";
import PlaceIcon from "../../resurces/black_pin.svg";
import Geocode from "react-geocode";
import { debounce } from "lodash";
import { AddUser, SearchUsers } from "../../store/users/users.action";
import { SubmitOrder } from "../../store/sellList/sellList.action";
import { useForm } from "react-hook-form";
import InputText from "../../components/InputText/InputText";
import { GetDriverList } from "../../store/driver/driver.action";
import SaveModal from "../../components/saveModal/SaveModal";
import { useHistory } from "react-router";
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
  newUser: {
    fontSize: 13,
    color: "#546e7a",
    padding: "10px 0",
    cursor: "pointer",
    fontWeight: 800,
    "&:hover": {
      color: "black",
    },
  },
  placeinput: {
    position: "absolute",
    bottom: 23,
    right: 0,
    left: 0,
    margin: "auto",
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0px 0px 1px rgba(0,0,0,0.1)",
    borderRadius: 5,
    width: "80%",
    padding: "4px 20px",
    textAlign: "right",
    direction: "rtl",
  },
  submituser: {
    backgroundColor: "#46426c",
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#57496f",
    },
  },
  "@global": {
    ".MuiFormControlLabel-root": {
      margin: "0px !important",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      padding: "10px 0",
    },
    ".map-container": {
      height: "100%",
      width: "100%",
    },

    ".map-ref": {
      height: "100%",
      "&::after": {
        color: "red",
        position: "absolute",
        content: "''",
        fontSize: 30,
        left: "50%",
        right: "50%",
        top: "50%",
        bottom: "50%",
        backgroundImage: `url(${PlaceIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: 30,
        height: 30,
      },
    },
  },
  err: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
}));

function AddOrder() {
  const classes = useStyles();
  const history = useHistory();
  const [citydata, setCitydata] = useState("");
  const [adduser, setadduser] = useState(null);
  const [cityname, setcityname] = useState("");
  const [servicename, setservicename] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [keyword, setkeyword] = useState("");
  const [searchusers, setSearchusers] = useState("");
  const [driver, setdriver] = useState("");
  const [alldrivers, setAlldrivers] = useState(false);
  const [Firstplace, setFirstplace] = useState({ lat: 48.8584, long: 2.2945 });
  const [FirstplaceAddress, setFirstplaceAddress] = useState("");
  const [Lastplace, setLastplace] = useState({ lat: 48.8584, long: 2.2945 });
  const [LastplaceAddress, setLastplaceAddress] = useState("");
  const [openmodal, setOpenmodal] = useState("");
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.Cities);
  const Services = useSelector((state) => state.Services);
  const Users = useSelector((state) => state.Users);
  const Orders = useSelector((state) => state.Orders);
  const Drivers = useSelector((state) => state.Driver);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(GetCities());
    dispatch(GetServices());
    dispatch(GetDriverList());
  }, []);
  const handleOpenCityModal = (index) => {
    setOpenmodal(index);
  };
  const handleCloseModal = () => {
    setOpenmodal("");
  };
  const handleSearch = (e) => {
    setkeyword(e.target.value);
  };
  const handleChangeCity = (item) => {
    setCitydata(item.id);
    setcityname(item.nameCity);
    setOpenmodal("");
  };
  const handleChangeService = (item) => {
    setservicename(item);
    setOpenmodal("");
  };
  const handleStopTime = (item) => {
    setStopTime(item);
    setOpenmodal("");
  };
  let place1 =
    (Firstplace[Object.keys(Firstplace)[0]].i +
      Firstplace[Object.keys(Firstplace)[0]].g) /
    2;
  const re = new RegExp(keyword, "i");
  const filteredCity = Cities?.cities?.data?.filter((entry) =>
    Object.values(entry).some((val) => typeof val === "string" && val.match(re))
  );
  Geocode.setApiKey("AIzaSyAAoHnj5BKKPkfyy7TbkQkl-DqWd_i00RI");
  Geocode.setLanguage("fa");
  Geocode.fromLatLng(
    `${place1}`,
    `${Firstplace[Object.keys(Firstplace)[1]].g}`
  ).then(
    (response) => {
      const address = response.results[0].formatted_address;
      setFirstplaceAddress(address);
    },
    (error) => {
      null;
    }
  );
  Geocode.fromLatLng(
    `${Lastplace[Object.keys(Lastplace)[0]].i}`,
    `${Lastplace[Object.keys(Lastplace)[1]].g}`
  ).then(
    (response) => {
      const address = response.results[0].formatted_address;
      setLastplaceAddress(address);
    },
    (error) => {
      null;
    }
  );
  const delayedCallback = debounce((value) => {
    dispatch(SearchUsers(value));
  }, 1000);
  const handlesearchUser = (event) => {
    setSearchusers(() => {
      const newstate = event.target.value;
      delayedCallback(newstate);
      return newstate;
    });
  };
  const saveOrder = () => {
    dispatch(
      SubmitOrder(
        servicename?.id,
        searchusers?.id,
        Firstplace?.Ra?.i,
        Firstplace?.La?.g,
        FirstplaceAddress,
        Lastplace?.Ra?.i,
        Lastplace?.La?.g,
        LastplaceAddress,
        stopTime.b
      )
    );
  };
  useEffect(() => {
    Orders?.msg?.status ? history.push(`/SellList`) : null;
  }, [Orders?.msg?.status]);
  const handleAddUser = (data) => {
    if (data.mobile.length < 11 || data.password !== data.confrimPassword) {
      setadduser("فیلد ها را چک کنید");
    } else {
      setadduser(null);
      dispatch(AddUser(data.name, data.mobile, data.password));
    }
  };
  return (
    <div>
      <SearchBar
        onclick={() => handleOpenCityModal("save")}
        btntext={"ذخیره"}
        error={Orders?.msg?.message}
        height={120}
        search={false}
        title={"ثبت سفارش جدید"}
      />
      <TitleBox title={"اطلاعات سفارش"} />
      <Box className={classes.wrapper}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenCityModal("city")}
                className={classes.chooseCity}
              >
                {cityname === "" ? "انتخاب شهر" : cityname}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenCityModal("firstplace")}
                className={classes.chooseCity}
              >
                {FirstplaceAddress === "" ? "مبدا" : FirstplaceAddress}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenCityModal("lastplace")}
                className={classes.chooseCity}
              >
                {LastplaceAddress === "" ? "مقصد" : LastplaceAddress}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenCityModal("service")}
                className={classes.chooseCity}
              >
                {servicename === ""
                  ? "انتخاب سرویس"
                  : servicename?.infoService?.title}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenCityModal("stoptime")}
                className={classes.chooseCity}
              >
                {stopTime === ""
                  ? "میزان توقف"
                  : `${stopTime.a} تا ${stopTime.b} دقیقه`}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="10px">
              <Button
                onClick={() => handleOpenCityModal("user")}
                className={classes.chooseCity}
              >
                {searchusers === "" ? "انتخاب کاربر" : searchusers?.displayName}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
              {/* <Typography
                onClick={() => handleOpenCityModal("adduser")}
                className={classes.newUser}
              >
                ثبت نام کاربر جدید
              </Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box padding="10px">
              <Button
                disabled={alldrivers}
                onClick={() => handleOpenCityModal("driver")}
                className={classes.chooseCity}
              >
                {driver === "" ? "انتخاب راننده" : driver?.displayName}
                <ArrowBackIosIcon className={classes.arrow} />
              </Button>
              <FormControlLabel
                style={{ margin: 0 }}
                control={
                  <Checkbox
                    value={alldrivers}
                    onChange={() => setAlldrivers(!alldrivers)}
                    size="small"
                  />
                }
                label={
                  <span
                    style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}
                  >
                    همه رانندگان
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
          SaveChanges={saveOrder}
        />
      ) : (
        <SimpleModal
          open={openmodal}
          onClose={handleCloseModal}
          body={
            <React.Fragment>
              {openmodal === "city" ? (
                <>
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
                    {filteredCity?.map((item, i) => (
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
                </>
              ) : openmodal === "firstplace" ? (
                <Box>
                  <Box className={classes.modalTitle}>مبدا</Box>
                  <Box height="450px">
                    <MyMap
                      zoom={13}
                      center={{
                        lat: 36.2605,
                        lng: 59.6168,
                      }}
                      events={{ onBoundsChangerd: (arg) => setFirstplace(arg) }}
                    ></MyMap>
                  </Box>
                  <InputBase
                    className={classes.placeinput}
                    placeholder="روی نقشه انتخاب کنید"
                    value={FirstplaceAddress}
                  />
                </Box>
              ) : openmodal === "lastplace" ? (
                <Box>
                  <Box className={classes.modalTitle}>مقصد</Box>
                  <Box height="450px">
                    <MyMap
                      zoom={13}
                      center={{
                        lat: 36.2605,
                        lng: 59.6168,
                      }}
                      events={{ onBoundsChangerd: (arg) => setLastplace(arg) }}
                    ></MyMap>
                  </Box>
                  <InputBase
                    className={classes.placeinput}
                    placeholder="روی نقشه انتخاب کنید"
                    value={LastplaceAddress}
                  />
                </Box>
              ) : openmodal === "service" ? (
                <>
                  <Box className={classes.modalTitle}>انتخاب سرویس</Box>
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
                </>
              ) : openmodal === "stoptime" ? (
                <>
                  <Box className={classes.modalTitle}>مدت زمان توقف</Box>
                  <Box
                    padding="10px 35px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {StopTimes?.map((item, i) => (
                      <Box
                        onClick={() => handleStopTime(item)}
                        key={i}
                        className={classes.cityList}
                      >
                        <Typography className={classes.city}>
                          {item.a} {"تا "} {item.b} {"دقیقه"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              ) : openmodal === "user" ? (
                <>
                  <Box className={classes.modalTitle}>انتخاب کاربر</Box>
                  <Box
                    padding="10px 35px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box className={classes.searchcity} width="100%">
                      <InputBase
                        value={searchusers}
                        placeholder={"جستجوی کاربر"}
                        onChange={(e) => handlesearchUser(e)}
                        style={{
                          width: "100%",
                          direction: "rtl",
                          textAlign: "right",
                          padding: "2px 7px",
                        }}
                      />
                      <SearchIcon />
                    </Box>
                    {Users?.users?.data.length === 0 ? (
                      <span style={{ fontSize: 12 }}>( کاربر پیدا نشد )</span>
                    ) : (
                      <>
                        {Users?.users?.data?.map((item, i) => (
                          <Box
                            onClick={() =>
                              setSearchusers(item) & setOpenmodal(false)
                            }
                            key={i}
                            className={classes.cityList}
                          >
                            <Typography className={classes.city}>
                              {item.displayName}
                            </Typography>
                            <span style={{ fontSize: 12 }}>
                              ( {item.mobile} )
                            </span>
                          </Box>
                        ))}
                      </>
                    )}
                  </Box>
                </>
              ) : openmodal === "driver" ? (
                <>
                  <Box className={classes.modalTitle}>انتخاب راننده</Box>
                  <Box
                    padding="10px 35px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box className={classes.searchcity} width="100%">
                      <InputBase
                        placeholder={"جستجوی راننده"}
                        // value={searchusers}
                        onChange={(e) => handlesearchUser(e)}
                        style={{
                          width: "100%",
                          direction: "rtl",
                          textAlign: "right",
                          padding: "2px 7px",
                        }}
                      />
                      <SearchIcon />
                    </Box>
                    {Drivers?.data?.data?.length === 0 ? (
                      <span style={{ fontSize: 12 }}>( کاربر پیدا نشد )</span>
                    ) : (
                      <>
                        {Drivers?.data?.data?.map((item, i) => (
                          <Box
                            onClick={() =>
                              setdriver(() => {
                                const newstate = item;
                                setOpenmodal(false);
                                setdriver(newstate);
                                return newstate;
                              })
                            }
                            key={i}
                            className={classes.cityList}
                          >
                            <Typography className={classes.city}>
                              {item.displayName}
                            </Typography>
                            <span style={{ fontSize: 12 }}>
                              ( {item.mobile} )
                            </span>
                          </Box>
                        ))}
                      </>
                    )}
                  </Box>
                </>
              ) : openmodal === "adduser" ? (
                <>
                  {" "}
                  <Box className={classes.modalTitle}>ثبت راننده جدید</Box>
                  <Box padding="5px 10px">
                    <InputText
                      name={"name"}
                      inputRef={register}
                      label={"نام"}
                    />
                  </Box>
                  <Box padding="5px 10px">
                    <InputText
                      name={"mobile"}
                      inputRef={register}
                      label={"موبایل"}
                    />
                  </Box>
                  <Box padding="5px 10px">
                    <InputText
                      name={"password"}
                      type="password"
                      inputRef={register}
                      label={"رمزعبور"}
                    />
                  </Box>
                  <Box padding="5px 10px">
                    <InputText
                      type="password"
                      name={"confrimPassword"}
                      inputRef={register}
                      label={"تکرار رمزعبور"}
                    />
                  </Box>
                  <Box padding="5px 10px">
                    <Button
                      onClick={handleSubmit(handleAddUser)}
                      className={classes.submituser}
                    >
                      اضافه کردن
                    </Button>
                    <Typography className={classes.err}>
                      {adduser === null ? Users?.msg?.data?.message : adduser}
                    </Typography>
                  </Box>
                </>
              ) : (
                ""
              )}
            </React.Fragment>
          }
        />
      )}
    </div>
  );
}

const StopTimes = [
  {
    a: 5,
    b: 10,
  },
  {
    a: 10,
    b: 15,
  },
  {
    a: 15,
    b: 20,
  },
  {
    a: 20,
    b: 25,
  },
  {
    a: 25,
    b: 30,
  },
  {
    a: 30,
    b: 45,
  },
  {
    a: 45,
    b: 60,
  },
];
export default AddOrder;
