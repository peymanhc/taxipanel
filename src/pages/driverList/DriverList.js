import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useForm } from "react-hook-form";
import { GetDriverList, removeDriver } from "../../store/driver/driver.action";
import { useHistory } from "react-router";
import Mytable from "../../components/myTable/Mytable";
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
      cursor: "pointer",
    },
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
function DriverList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const Drivers = useSelector((state) => state.Driver);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    dispatch(GetDriverList());
  }, []);
  const RemoveService = (e, id) => {
    e.stopPropagation();
    dispatch(removeDriver(id));
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 700);
  };
  const goToAddDriver = (serviceId) => {
    history.push(`/AddMaster`);
  };
  const goToDetail = (serviceId) => {
    history.push(`/DriverDetail/${serviceId}`);
  };
  return (
    <Box>
      <SearchBar
        error={Drivers?.msg?.message}
        search={true}
        btntext={"جستجو"}
        title={"لیست راننده ها"}
      />
      <Mytable
        addbtn={goToAddDriver}
        column={Headrow}
        length={Drivers?.data?.data?.length}
        rows={
          <>
            {Drivers?.data?.data?.map((row, i) => (
              <tr onClick={() => goToDetail(row.id)}>
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="نام کاربر"> {row?.displayName}</td>
                <td data-title="موبایل"> {row?.mobile}</td>
                <td data-title="خدمت"> {row?.masterService?.serviceTitle}</td>
                <td data-title="تاریخ عضویت"> {row?.createDate}</td>
                <td data-title="وضعیت">
                  {row.active ? (
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
                </td>
                <td style={{ display: "block" }} data-title="">
                  <DeleteOutlineIcon
                    onClick={(e) => RemoveService(e, row?.id)}
                    style={{
                      color: "#c62828",
                      fontSize: 25,
                      cursor: "pointer",
                    }}
                  />
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
    title: "نام کاربر",
  },
  {
    id: 3,
    title: "موبایل",
  },
  {
    id: 4,
    title: "خدمت",
  },
  {
    id: 5,
    title: "تاریخ عضویت",
  },
  {
    id: 6,
    title: "وضعیت",
  },
  {
    id: 9,
    title: "",
  },
];

export default DriverList;
