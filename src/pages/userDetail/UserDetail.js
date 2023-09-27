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
import Master from "../../components/master/Master";
import Inviteds from "../../components/inviteds/Inviteds";
import TravelList from "../../components/travelList/TravelList";
import Turnover from "../../components/turnover/Turnover";
import SendNotificatins from "../../components/sendNotificatins/SendNotificatins";
import Reports from "../../components/reports/Reports";
import MasterDetail from "../../components/masterDetail/MasterDetail";
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
function UserDetail() {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const Users = useSelector((state) => state.Users);
  const Services = useSelector((state) => state.Services);
  const info = Users?.user?.data[0];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      {Users.loading ? <LinearProgress /> : null}
      <SearchBar
        error={Services?.error?.data?.message}
        search={false}
        height={110}
        submitbtn={false}
        title={info?.displayName}
      />
      {console.log(value)}
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
            label="کاربران دعوت کننده"
          />
          <Tab
            style={{ backgroundColor: value === "3" ? "#1e1a46" : "" }}
            value="3"
            label="لیست سفر ها"
          />
          <Tab
            style={{ backgroundColor: value === "4" ? "#1e1a46" : "" }}
            value="4"
            label="گردش مالی"
          />
          <Tab
            style={{ backgroundColor: value === "5" ? "#1e1a46" : "" }}
            value="5"
            label="ارسال نوتیفیکیشن"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="1">
        <MasterDetail info={info} />
      </TabPanel>
      <TabPanel value={value} index="2">
        <Inviteds
          data={Users?.MasterChild?.data}
          pcode={Users?.user?.data[0]?.UserCode}
        />
      </TabPanel>
      <TabPanel value={value} index="3">
        <TravelList />
      </TabPanel>
      <TabPanel value={value} index="4">
        <Turnover />
      </TabPanel>
      <TabPanel value={value} index="5">
        <SendNotificatins />
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
export default UserDetail;
