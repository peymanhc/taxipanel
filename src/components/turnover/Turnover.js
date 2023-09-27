import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCities } from "../../store/cities/city.action";
import SimpleTable from "../SimpleTable/SimpleTable";
import PlaceIcon from "../../resurces/black_pin.svg";
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
    fontSize: 17,
    textAlign: "right",
    [theme.breakpoints.down(1200)]: {
      fontSize: "15px !important",
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
const Turnover = () => {
  const classes = useStyles();
  const Cities = useSelector((state) => state.Cities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCities());
  }, []);
  return (
    <div>
      <SimpleTable
        head={Tablehead}
        body={
          <>
            {Cities?.cities?.data.map((item, i) => (
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
                  {item.nameCity}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.location?.coordinates[0]}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.location?.coordinates[1]}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.location?.coordinates[1]}
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
    title: "ردیف",
  },
  {
    id: 1,
    title: "تاریخ",
  },
  {
    id: 2,
    title: "مبلغ",
  },
  {
    id: 3,
    title: "نوع",
  },
  {
    id: 4,
    title: "توضیح",
  },
];
export default Turnover;
