import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mytable from "../../components/myTable/Mytable";
import SearchBar from "../../components/searchbar/SearchBar";
import {
  GetMasterInfoWorked,
  removeDriver,
} from "../../store/driver/driver.action";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    top: -60,
    margin: "auto 60px",
    marginLeft: 110,
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 15,
    boxShadow: "0px 1px 6px rgba(0,0,0,0.2)",
    padding: "30px 50px",
    minHeight: 300,
  },
  row: {
    "&:hover": {
      backgroundColor: "rgba(70, 66, 108,0.05)",
    },
  },
  tablecell: {
    color: "#607d8b",
    fontSize: 15,
    textAlign: "right",
    [theme.breakpoints.down(1200)]: {
      fontSize: "14px !important",
      padding: "5px 0",
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
  "@global": {
    ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(22px,-5px) scale(0.7) !important",
    },
  },
  SubmitButton: {
    backgroundColor: "#0c1d34",
    color: "white",
    float: "left",
    width: "100%",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  profile: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    border: "1px solid #262545",
  },
  err: {
    textAlign: "center",
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
}));
function MasterStatus() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const Drivers = useSelector((state) => state.Driver);
  useEffect(() => {
    dispatch(GetMasterInfoWorked());
  }, []);
  return (
    <Box>
      <SearchBar
        error={Drivers?.msg?.message}
        search={true}
        btntext={"جستجو"}
        title={"وضعیت راننده ها"}
      />
      <Mytable
        column={Headrow}
        button={false}
        length={Drivers?.driverinfo?.data?.length}
        rows={
          <>
            {Drivers?.driverinfo?.data?.map((row, i) => (
              <tr>
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="نام راننده"> {row?.masterInfo?.mName}</td>
                <td data-title="موبایل"> {row?.masterInfo?.mMobile}</td>
                <td data-title="شهر"> {row?.masterService?.serviceCity}</td>
                <td data-title="خدمت"> {row?.masterService?.serviceTitle}</td>
                <td data-title="به روز رسانی"> {row?.createDate}</td>
                <td data-title="وضعیت">
                  {" "}
                  {row?.shiftWork ? (
                    <Typography
                      className={classes.tablecell}
                      style={{ color: "green" }}
                    >
                      آنلاین
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.tablecell}
                      style={{ color: "red" }}
                    >
                      آفلاین
                    </Typography>
                  )}
                </td>
              </tr>
            ))}
          </>
        }
      />
    </Box>
  );
}

const Headrow = [
  {
    id: 1,
    title: "ردیف",
  },
  {
    id: 2,
    title: "نام راننده",
  },
  {
    id: 3,
    title: "موبایل",
  },
  {
    id: 3,
    title: "شهر",
  },
  {
    id: 4,
    title: "خدمت",
  },
  {
    id: 5,
    title: "به روز رسانی",
  },
  {
    id: 6,
    title: "وضعیت",
  },
];

export default MasterStatus;
