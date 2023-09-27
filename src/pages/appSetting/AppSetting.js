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
import Aboutus from "../../components/aboutus/Aboutus";
import AppInformation from "../../components/appInformation/AppInformation";
import ContactUs from "../../components/contactUs/ContactUs";
import Notificatins from "../../components/notificatins/Notificatins";
import SaveModal from "../../components/saveModal/SaveModal";
import SearchBar from "../../components/searchbar/SearchBar";
import Socials from "../../components/socials/Socials";
import { AddConfig, GetUsers } from "../../store/config/config.action";
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
function AppSetting() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  const [value, setValue] = useState("1");
  const ServiceInfo = useSelector((state) => state.ServiceInfo);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openmodal, setOpenmodal] = useState(false);
  const [state, setState] = useState({
    about: "",
    contactus: "",
    AppInformation: {
      lastdriverVersion: false,
      lastuserVersion: false,
      driverVersion: "",
      userVersion: "",
    },
    Socials: {
      instagram: "",
      telegram: "",
      youtube: "",
      aparat: "",
    },
  });
  const Config = useSelector((state) => state.Config);
  const aboutUsData = Config?.users?.data[0]?.information?.aboutUs;
  const ContactUsData = Config?.users?.data[0]?.information?.callNumber;
  const InformationData = Config?.users?.data[0]?.information?.version;
  const SocialLinkData = Config?.users?.data[0]?.information?.socialMedia;
  useEffect(() => {
    setState({
      about: aboutUsData,
      contactus: ContactUsData,
      AppInformation: {
        lastdriverVersion: InformationData?.versionMaser.mandetoryDriver,
        driverVersion: InformationData?.versionMaser.versionAppDriver,
        lastuserVersion: InformationData?.versionCustomer.mandetoryCustomer,
        userVersion: InformationData?.versionCustomer.versionAppCustomer,
      },
      Socials: {
        instagram: SocialLinkData?.instaLink,
        telegram: SocialLinkData?.telegramLink,
        youtube: SocialLinkData?.youtubeLink,
        aparat: SocialLinkData?.aparatLink,
      },
    });
  }, [Config?.users?.status]);

  const submitConfig = () => {
    dispatch(
      AddConfig(
        state.about,
        state.contactus,
        state.AppInformation.userVersion,
        state.AppInformation.lastuserVersion,
        state.AppInformation.driverVersion,
        state.AppInformation.lastdriverVersion,
        state.Socials.telegram,
        state.Socials.instagram,
        state.Socials.aparat,
        state.Socials.youtube
      )
    );
  };
  const handleOpenModal = () => {
    setOpenmodal(true);
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  return (
    <Box>
      <SaveModal
        open={openmodal}
        onClose={handleCloseModal}
        SaveChanges={submitConfig}
      />
      {ServiceInfo.loading ? <LinearProgress /> : null}
      <SearchBar
        onclick={handleOpenModal}
        btntext={"ذخیره"}
        error={Config?.msg?.data?.message}
        background="#0c1d34"
        submitbtn={true}
        search={false}
        height={120}
        title={"تنظیمات اپلیکیشن"}
      />
      <AppBar className={classes.panel} position="relative">
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          value={value}
          onChange={handleChange}
        > 
          <Tab style={{ backgroundColor: value === "1" ? "#272d4d" : "" }} value="1" label="درباره ما" />
          <Tab style={{ backgroundColor: value === "2" ? "#272d4d" : "" }} value="2" label="تماس با ما" />
          <Tab style={{ backgroundColor: value === "3" ? "#272d4d" : "" }} value="3" label="اطلاعات اپلیکیشن" />
          <Tab style={{ backgroundColor: value === "4" ? "#272d4d" : "" }} value="4" label="شبکه های اجتماعی" />
          <Tab style={{ backgroundColor: value === "5" ? "#272d4d" : "" }} value="5" label="ارسال نوتفیکیشن" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="1">
        <Aboutus
          state={state.about}
          setstate={(index) => setState({ ...state, about: index })}
        />
      </TabPanel>
      <TabPanel value={value} index="2">
        <ContactUs
          state={state.contactus}
          setstate={(index) => setState({ ...state, contactus: index })}
        />
      </TabPanel>
      <TabPanel value={value} index="3">
        <AppInformation
          state={state.AppInformation}
          setstate={(index) => setState({ ...state, AppInformation: index })}
        />
      </TabPanel>
      <TabPanel value={value} index="4">
        <Socials
          state={state.Socials}
          setstate={(index) => setState({ ...state, Socials: index })}
        />
      </TabPanel>
      <TabPanel value={value} index="5">
        <Notificatins />
      </TabPanel>
    </Box>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ direction: "rtl" }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
export default AppSetting;
