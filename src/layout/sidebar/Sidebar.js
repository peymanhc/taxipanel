import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import { Link, NavLink } from "react-router-dom";
import { CheckSession } from "../../store/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSplash from "../../components/loading/LoadingSplash";
import LOGO from "../../resurces/logo_pishgaman.png";
import ChevronRight from "@material-ui/icons/ChevronRight";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "right",
  },
  drawer: {
    width: "16%",
    textAlign: "right",
    direction: "rtl",
    flexShrink: 0,
    [theme.breakpoints.down(1200)]: {
      width: "25%",
    },
  },
  drawerPaper: {
    width: 280,
    textAlign: "right",
    direction: "rtl",
    backgroundColor: "#0c1d34",
    color: "white",
    [theme.breakpoints.down(1200)]: {
      width: "25%",
    },
    [theme.breakpoints.down(920)]: {
      width: "250px",
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down(1200)]: {
      width: "75%",
    },
  },
  logotxt: {
    fontSize: 20,
    fontWeight: 700,
    margin: "0 5px",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  divider2: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  listbox: {
    padding: "15px",
  },
  listText: {
    fontSize: 18,
    color: "white",
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    textDecoration: "none",
  },
  accordion: {
    backgroundColor: "transparent",
    color: "white",
    boxShadow: "none",
    borderBottom: "1px solid rgba(255,255,255,0.6)",
  },
  "@global": {
    ".MuiListItem-gutters": {
      padding: 0,
    },
    ".MuiAccordion-root.Mui-expanded": {
      padding: 0,
      margin: 0,
    },
    ".MuiAccordionSummary-content": {
      margin: "15px 0 !important",
    },
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 700,
  },
  listaccordionText: {
    fontSize: 12,
    fontWeight: 900,
    color: "#808894",
  },
  listitems: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "white",
    textTransform: "capitalize",
    padding: "5px 0",
  },
  close: {
    color: "white",
    width: "50px",
    display: "none",
    [theme.breakpoints.down(920)]: {
      display: "block",
    },
  },
  activeLink: {
    color: "#2196f3",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [activelink, setactivelink] = useState("home");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    dispatch(CheckSession());
  }, []);
  const hilghit = (index) => {
    setactivelink(index);
  };
  return (
    <div className={classes.root}>
      {Auth?.profile?.data === undefined ? (
        <LoadingSplash />
      ) : (
        <React.Fragment>
          <CssBaseline />
          <main className={classes.content}>
            <div className={classes.toolbar} />
          </main>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="right"
          >
            {" "}
            <IconButton onClick={props.close} className={classes.close}>
              <ChevronRight />
            </IconButton>
            <Box
              className={classes.toolbar}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <img
                style={{ width: "80px", margin: "0 25px" }}
                alt="Logo"
                src={LOGO}
              />
              <Typography className={classes.logotxt}>پیشگامان</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.listbox}>
              <NavLink
                to="/dashboard"
                onClick={props.close}
                activeClassName={classes.activeLink}
                style={{ textDecoration: "none" }}
                className={classes.listText}
              >
                <StarsIcon />
                <span style={{ margin: "0 15px" }}>پیشخوان </span>
              </NavLink>
            </Box>
            <Divider className={classes.divider2} />
            <List>
              {sidebarList.map((item, i) => (
                <Accordion
                  square
                  expanded={expanded === i}
                  onChange={handleChange(i)}
                  key={i}
                  className={classes.accordion}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography className={classes.listTitle}>
                        {item.title}
                      </Typography>
                      <Typography className={classes.listaccordionText}>
                        {item.text}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    {item.items.map((index, i) => (
                      <NavLink
                        onClick={props.close}
                        activeClassName={classes.activeLink}
                        className={classes.listitems}
                        style={{ textDecoration: "none" }}
                        key={i}
                        to={index.link}
                      >
                        <Typography
                          style={{
                            margin: "0 15px",
                            color: activelink === index.title && "#2196f3",
                          }}
                        >
                          {index.title}
                        </Typography>
                      </NavLink>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
          </Drawer>
        </React.Fragment>
      )}
    </div>
  );
}

const sidebarList = [
  {
    id: 0,
    title: "خدمات",
    text: "افزودن خدمت , لیست خدمات ",
    items: [
      {
        title: "لیست خدمات",
        link: "/ServiceList",
      },
      {
        title: "خدمت جدید",
        link: "/AddService",
      },
    ],
  },
  {
    id: 1,
    title: "فروش",
    text: "لیست سفارشات , کد تخفیف",
    items: [
      {
        title: "لیست سفارشات",
        link: "/SellList",
      },
      {
        title: "لیست درخواست ها",
        link: "/RequestList",
      },
      {
        title: "ثبت سفارش جدید",
        link: "/AddOrder",
      },
      {
        title: "کد تخفیف",
        link: "/DiscountCode",
      },
      {
        title: "افزودن کد تخفیف",
        link: "/addDiscountCode",
      },
    ],
  },
  {
    id: 2,
    title: "مدیریت کاربران",
    text: "مدیریت کاربران سایت و اپلیکیشن",
    items: [
      {
        title: "لیست کاربران",
        link: "/clientList",
      },
      {
        title: "لیست ناظر ها",
        link: "/SupervisorList",
      },
      {
        title: "لیست راننده ها",
        link: "/driverList",
      },
      {
        title: "وضعیت رانندگان",
        link: "/masterStatus",
      },
      {
        title: "افزودن راننده",
        link: "/addMaster",
      },
      {
        title: "تعیین سطح دسترسی",
        link: "/roleUser",
      },
    ],
  },
  {
    id: 3,
    title: "حسابداری",
    text: "لیست تراکنش ها , وضعیت حساب ها",
    items: [
      {
        title: "لیست حساب رانندگان",
        link: "/transactionList",
      },
      {
        title: "تسویه حساب رانندگان",
        link: "/MasterTransaction",
      },
      {
        title: "گزارش کارکرد رانندگان",
        link: "/masterStatisticalReport",
      },
      {
        title: "تراکنش های مالی",
        link: "/PaymentList",
      },
    ],
  },
  {
    id: 4,
    title: "تنظیمات",
    text: "تنظیمات داشبورد و اپلیکیشن",
    items: [
      {
        title: "تنظیمات سیستم",
        link: "/SystemSetting",
      },
      {
        title: "تنظیمات اپلیکیشن",
        link: "/AppSetting",
      },
    ],
  },
];
