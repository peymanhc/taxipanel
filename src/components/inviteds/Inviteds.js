import {
  Box,
  Button,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCities, RemoveCity } from "../../store/cities/city.action";
import SimpleTable from "../SimpleTable/SimpleTable";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { ChildMaster } from "../../store/users/users.action";
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
}));
const Inviteds = ({ pcode,data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCities());
    dispatch(ChildMaster(pcode));
  }, []);
  return (
    <div>
      <SimpleTable
        head={Tablehead}
        body={
          <>
            {data?.map((item, i) => (
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
                  {item.displayName}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item?.mobile}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.createDate}
                </TableCell>
                <TableCell className={classes.tablecell}>
                  {item?.active ? (
                    <Typography
                      className={classes.tablecell}
                      style={{ color: "green" }}
                    >
                      فعال
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.tablecell}
                      style={{ color: "red" }}
                    >
                      غیر فعال
                    </Typography>
                  )}
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
    title: "نام کاربر",
  },
  {
    id: 2,
    title: "موبایل",
  },
  {
    id: 3,
    title: "تاریخ عضویت",
  },
  {
    id: 4,
    title: "وضعیت",
  },
];
export default Inviteds;
