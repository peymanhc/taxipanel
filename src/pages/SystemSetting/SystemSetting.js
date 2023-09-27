import {
  AppBar,
  Box,
  LinearProgress,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Declaration from "../../components/Declaration/Declaration";
import LogoPanel from "../../components/LogoPanel/LogoPanel";
import SearchBar from "../../components/searchbar/SearchBar";
import SmsPanel from "../../components/smsPanel/SmsPanel";
import CityList from "../../components/cityList/CityList";
const useStyles = makeStyles((theme) => ({
  panel: {
    position: "relative",
    top: -50,
    direction: "rtl",
    padding: "0 40px",
    boxShadow: "none",
    backgroundImage: "linear-gradient(#0c1d34,#2c3152)",
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
  input: {
    direction: "rtl",
    width: "100%",
    textAlign: "right",
    color: "#627e8c",
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
}));
function SystemSetting() {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const ServiceInfo = useSelector((state) => state.ServiceInfo);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      {ServiceInfo.loading ? <LinearProgress /> : null}
      <SearchBar
        background="#0c1d34"
        submitbtn={false}
        search={false}
        height={120}
        title={"تنظیمات سیستم"}
      />
      <AppBar className={classes.panel} position="relative">
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          value={value}
          onChange={handleChange}
        > 
          <Tab style={{ backgroundColor: value === "1" ? "#272d4d" : "" }} value="1" label="پنل پیامکی" />
          <Tab style={{ backgroundColor: value === "2" ? "#272d4d" : "" }} value="2" label="لوگوی پنل" />
          <Tab style={{ backgroundColor: value === "3" ? "#272d4d" : "" }} value="3" label="پس زمینه لاگین" />
          <Tab style={{ backgroundColor: value === "4" ? "#272d4d" : "" }} value="4" label="لیست شهر ها " />
          <Tab style={{ backgroundColor: value === "5" ? "#272d4d" : "" }} value="5" label="اعلامیه ها " />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="1">
        <SmsPanel />
      </TabPanel>
      <TabPanel value={value} index="2">
        <LogoPanel />
      </TabPanel>
      <TabPanel value={value} index="3">
        <LogoPanel />
      </TabPanel>
      <TabPanel value={value} index="4">
        <CityList />
      </TabPanel>
      <TabPanel value={value} index="5">
        <Declaration />
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
      style={{ direction: "rtl" }}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
export default SystemSetting;
