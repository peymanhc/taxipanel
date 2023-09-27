import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCities } from "../../store/cities/city.action";
import SimpleTable from "../SimpleTable/SimpleTable";
import PlaceIcon from "../../resurces/black_pin.svg";
import { GetMasterSumTravel } from "../../store/driver/driver.action";
import { useParams } from "react-router";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    direction: "rtl",
    textAlign: "right",
  },
  tablecell: {
    color: "#607d8b",
    fontSize: 15,
    textAlign: "right",
    [theme.breakpoints.down(1200)]: {
      fontSize: "12px !important",
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
  addToList: {
    backgroundColor: "#0c1d34",
    color: "white",
    float: "left",
    width: "200px",
    marginBottom: "20px",
    "&:hover": {
      backgroundColor: "black",
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
  "@global": {
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
}));
const Reports = () => {
  const classes = useStyles();
  const Driver = useSelector((state) => state.Driver);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(GetCities());
    dispatch(GetMasterSumTravel(params.id));
  }, []);
  console.log(Driver?.masterSumtravel);
  return (
    <div>
      <SimpleTable
        head={Tablehead}
        body={
          <>
            {Driver?.masterSumtravel?.data?.map((item, i) => (
              <TableRow className={classes.row} key={i}>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {i + 1}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                  width="30%"
                >
                  {item.totalAmount} تومان
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.totalIncome} تومان
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {(item?.distanceTraveled / 1000).toFixed(1)} کیلومتر
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
    </div>
  );
};

const Tablehead = [
  {
    id: 0,
    title: "تعداد کل سفر ها",
  },
  {
    id: 1,
    title: "مبلغ کل سفر ها",
  },
  {
    id: 2,
    title: "میزان درامد",
  },
  {
    id: 3,
    title: "مسافت طی شده",
  },
];
export default Reports;
