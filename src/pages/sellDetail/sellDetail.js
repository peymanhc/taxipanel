import {
  AppBar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputBase,
  LinearProgress,
  makeStyles,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import SearchBar from "../../components/searchbar/SearchBar";
import { UpdateServices } from "../../store/services/service.action";
import InputLabel from "@material-ui/core/InputLabel";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import SaveModal from "../../components/saveModal/SaveModal";
import axios from "../../shared/Shared";
import { GetCustomerOrders } from "../../store/sellList/sellList.action";
import { MasterDetailInfo } from "../../store/driver/driver.action";
import { getUserInfo } from "../../store/users/users.action";
import Places from "../../components/places/Places";
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
  divider: {
    margin: "25px 10px",
    backgroundColor: "#607d8b",
  },
  tableTitle: {
    fontSize: 14,
  },
  tabletext: {
    fontSize: 13,
    color: "#607d8b",
    fontWeight: 800,
  },
  "@global": {
    ".fileContainer": {
      boxShadow: "none",
    },
  },
}));
function SellDetail() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  const Orders = useSelector((state) => state.Orders);
  const Driver = useSelector((state) => state.Driver);
  const Users = useSelector((state) => state.Users);
  const Services = useSelector((state) => state.Services);
  const [openmodal, setOpenmodal] = useState(false);
  const addCommas = num => num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const [state, setState] = useState({
    id: "",
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
  const info = Orders?.data?.data[0];
  const Driverinfo = Driver?.masterDetail?.data[0];
  const masterDetail = Users?.user?.data[0]; 
  console.log(masterDetail);
  useEffect(() => {
    dispatch(GetCustomerOrders(params.id));
    dispatch(MasterDetailInfo(info?.masterInfo?.masterId));
    dispatch(getUserInfo(info?.customerInfo?.customerId));
    setState({
      id: info?.id,
      price: addCommas(info?.priceInfo?.price),
      paymentInfo: info?.paymentInfo?.paymentTitle,
      origin: info?.origin?.originTitle,
      timeRequest: info?.timeRequest,
      serviceInfo: info?.serviceInfo?.serviceTitle,
      Driverinfo: Driverinfo,
      customerInfo: masterDetail,
    });
  }, [info?.id, Driverinfo?.id, masterDetail?.id]);
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
      {Orders.loading ? <LinearProgress /> : null}
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
        search={false}
        title={"جزئیات سفر"}
      />
      <AppBar className={classes.panel} position="relative">
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          value={value}
          onChange={handleChange}
        >
          <Tab style={{ backgroundColor: value === "1" ? "#1e1a46" : "" }} value="1" label="اطلاعات سفر" />
          <Tab style={{ backgroundColor: value === "2" ? "#1e1a46" : "" }} value="2" label="اطلاعات راننده" />
          <Tab style={{ backgroundColor: value === "3" ? "#1e1a46" : "" }} value="3" label="اطلاعات مسافر" />
          <Tab style={{ backgroundColor: value === "4" ? "#1e1a46" : "" }} value="4" label="نمایش مسیر روی نقشه" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="1">
        <Grid container style={{ direction: "rtl" }}>
          <Grid xs={12} md={4} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>شناسه سفر</InputLabel>
              <InputBase
                className={classes.input}
                name={"id"}
                placeholder="شناسه سفر"
                value={state.id}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={4} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>هزینه سفر</InputLabel>
              <InputBase
                className={classes.input}
                name={"price"}
                placeholder={"هزینه سفر"}
                value={state.price}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={4} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>نوع پرداخت</InputLabel>
              <InputBase
                className={classes.input}
                name={"paymentInfo"}
                placeholder={"نوع پرداخت"}
                value={state.paymentInfo}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={4} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>مبدا</InputLabel>
              <InputBase
                className={classes.input}
                name={"origin"}
                placeholder={"مبدا"}
                value={state.origin}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={4} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>میزان توقف</InputLabel>
              <InputBase
                className={classes.input}
                name={"timeRequest"}
                placeholder={"میزان توقف"}
                value={state.timeRequest}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={4} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>نوع سرویس</InputLabel>
              <InputBase
                className={classes.input}
                name={"serviceInfo"}
                placeholder={"نوع سرویس"}
                value={state.serviceInfo}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Table dir="rtl" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTitle} align="right">
                ردیف
              </TableCell>
              <TableCell
                className={classes.tableTitle}
                width="90%"
                align="right"
              >
                مقصد
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info?.destination?.map((row, i) => (
              <TableRow key={i}>
                <TableCell className={classes.tabletext} align="right">
                  {i + 1}
                </TableCell>
                <TableCell className={classes.tabletext} align="right">
                  {row.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider className={classes.divider} />
        <Table dir="rtl" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTitle} align="right">
                ردیف
              </TableCell>
              <TableCell className={classes.tableTitle} align="right">
                وضعیت سفر
              </TableCell>
              <TableCell className={classes.tableTitle} align="right">
                تاریخ ثبت
              </TableCell>
              <TableCell className={classes.tableTitle} align="right">
                توضیح
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info?.statusInfo?.map((row, i) => (
              <TableRow key={i}>
                <TableCell className={classes.tabletext} align="right">
                  {i + 1}
                </TableCell>
                <TableCell className={classes.tabletext} align="right">
                  {row?.statusTitle}
                </TableCell>
                <TableCell className={classes.tabletext} align="right">
                  {row?.statusDate}
                </TableCell>
                <TableCell className={classes.tabletext} align="right">
                  {row?.statusDes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index="2">
        <Grid container style={{ direction: "rtl" }}>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>نام راننده</InputLabel>
              <InputBase
                className={classes.input}
                name={"customerDisplayName"}
                placeholder="وارد نشده"
                value={state.Driverinfo?.displayName}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>موبایل راننده</InputLabel>
              <InputBase
                className={classes.input}
                name={"customerMobile"}
                placeholder="وارد نشده"
                value={state.Driverinfo?.mobile}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>تاریخ عضویت</InputLabel>
              <InputBase
                className={classes.input}
                name={"mobile"}
                placeholder="وارد نشده"
                value={state.Driverinfo?.createDate}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>
                تعداد سفر های انجام شده در این ماه
              </InputLabel>
              <InputBase
                className={classes.input}
                name={"safar"}
                placeholder={"وارد نشده"}
                value={""}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>نوع فعالیت</InputLabel>
              <InputBase
                className={classes.input}
                name={"serviceInfo"}
                placeholder={"نوع سرویس"}
                value={state.serviceInfo}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>درامد ماه</InputLabel>
              <InputBase
                className={classes.input}
                name={"price"}
                placeholder={"درامد ماه"}
                value={""}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>
                درامد از این سفر
              </InputLabel>
              <InputBase
                className={classes.input}
                name={"price"}
                placeholder={"درامد از این سفر"}
                value={state.price}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>بدهی به شرکت</InputLabel>
              <InputBase
                className={classes.input}
                name={"serviceInfo"}
                placeholder={0}
                value={""}
              />
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index="3">
        <Grid container style={{ direction: "rtl" }}>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>نام کاربری</InputLabel>
              <InputBase
                className={classes.input}
                name={"customerDisplayName"}
                placeholder="وارد نشده"
                value={state.customerInfo?.displayName}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>شماره موبایل</InputLabel>
              <InputBase
                className={classes.input}
                name={"customerMobile"}
                placeholder="وارد نشده"
                value={state.customerInfo?.mobile}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>
                تعداد سفر های این ماه
              </InputLabel>
              <InputBase
                className={classes.input}
                name={"customerDisplayName"}
                placeholder="وارد نشده"
                value={""}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} item>
            <Box padding="10px">
              <InputLabel className={classes.label}>تاریخ عضویت</InputLabel>
              <InputBase
                className={classes.input}
                name={"customerDisplayName"}
                placeholder="وارد نشده"
                value={state.customerInfo?.createDate}
              />
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index="4" >
        <Places/>
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
export default SellDetail;
