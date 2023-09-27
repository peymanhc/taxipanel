import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import {
  Box,
  Button,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import SimpleDatePicker from "../datePicker/DatePicker";
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
    [theme.breakpoints.down(1200)]: {
      padding: "20px",
      margin: "20px",
      marginLeft: 20,
    },
  },
  title: {
    color: "#262545",
    fontSize: 20,
    fontWeight: 900,
    [theme.breakpoints.down(1200)]: {
      fontSize: 18,
    },
  },
  filter: {
    margin: "0 15px",
  },

  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdown_content: {
    position: "absolute",
    backgroundColor: "white",
    minWidth: "160px",
    overflow: "auto",
    boxShadow: " 0px 8px 16px 0px rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  filteritems: {
    color: "#262545",
    fontWeight: 700,
    fontSize: 12,
    width: "100%",
    border: "none",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
    "&:hover": {
      backgroundColor: "rgba(91, 80, 166,0.2)",
    },
  },
  addbtn: {
    borderRadius: 10,
    backgroundColor: "#262545",
    color: "white",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: 15,
    padding: "6px 10px",
    transition: "0.4s",
    "&:hover": {
      backgroundColor: "#6c0b8f",
      transition: "0.4s",
    },
    [theme.breakpoints.down(1200)]: {
      marginLeft: 20,
      fontSize: 12,
    },
  },
  row: {
    "&:hover": {
      backgroundColor: "rgba(70, 66, 108,0.05)",
      cursor: "pointer",
    },
  },
  filterbtn: {
    height: 56,
    width: 200,
    backgroundColor: "#46426c",
    color: "white",
    "&:hover": {
      backgroundColor: "#262545",
    },
    [theme.breakpoints.down(920)]: {
      width: "auto",
      height: 45,
      fontSize: 12,
    },
  },
  "@global": {
    "@global": {
      ".MuiTableContainer-root": {
        boxShadow: "none",
        direction: "rtl",
      },
      ".MuiTableCell-root": {
        textAlign: "right",
      },
      ".MuiTableCell-head": {
        fontSize: 14,
        fontWeight: 900,
      },
      ".MuiPagination-root": {
        display: "flex",
        justifyContent: "center",
      },
      ".MuiPagination-ul": {
        justifyContent: "center",
        marginTop: "20px",
        padding: "7px 40px",
        boxShadow: "0px 15px 10px -15px #46426c",
      },
      ".MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "#0c1d34",
        color: "white",
        "&:hover": {
          backgroundColor: "#0c1d34",
        },
      },
    },
  },
  down: {
    margin: "0 5px",
  },
}));
const Mytable = ({
  column,
  rows,
  addbtn,
  button,
  length,
  ListData,
  itemsCount,
  Filter,
  Filter2,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Pagenumber, setPagenumber] = useState(1);
  const [dropdown, setDropdown] = useState(false);
  const [Filtertitle, setFiltertitle] = useState("");
  const [date, setdate1] = useState("");
  const [date2, setdate2] = useState("");
  const [sort, setSort] = useState("");
  const handleChangeFilter = (id) => {
    setDropdown(false);
    setFiltertitle(id);
  };
  const handlePageChange = (event, value) => {
    setPagenumber(() => {
      const newstate = value;
      dispatch(ListData(newstate));
      return newstate;
    });
    window.scroll(0, 0);
  };
  useEffect(() => {
    if (ListData !== undefined) {
      dispatch(ListData(Pagenumber));
    }
  }, []);
  const pageCount = useMemo(() => {
    return Math.ceil(itemsCount / 10) || 0;
  }, [itemsCount, 16]);

  function sortTable() {
    let table = document.querySelector("table"),
      ths = table.querySelectorAll("thead th"),
      row = table.querySelectorAll("tbody tr"),
      tBody = table.querySelector("tbody"),
      docF = document.createDocumentFragment();

    function sortMe(e) {
      let thsArray = [].slice.call(ths),
        rowArray = [].slice.call(row),
        target = e.target,
        thsIndex = thsArray.indexOf(target);

      rowArray.sort(function (a, b) {
        let tdA = a.children[thsIndex].textContent,
          tdB = b.children[thsIndex].textContent;
        let num1 = parseInt(tdA);
        let num2 = parseInt(tdB);

        const arr = [];
        arr.push(num1);

        const findInteger = (arr = []) => {
          const isInteger = (num) => {
            return typeof num === "number";
          };
          const el = arr.find(isInteger);
          return !!el;
        };
        const checknum = findInteger(arr);
        if (checknum === true) {
          if (num1 > num2) {
            return 1;
          } else if (tdA < tdB) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (tdA > tdB) {
            return 1;
          } else if (tdA < tdB) {
            return -1;
          } else {
            return 0;
          }
        }
      });

      rowArray.forEach(function (row) {
        docF.appendChild(row);
      });

      tBody.appendChild(docF);
    }

    for (let i = 0; i < ths.length; i++) {
      ths[i].addEventListener("click", sortMe, false);
    }
  }
  return (
    <Box className={classes.root}>
      <Box
        dir="rtl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        textAlign="right"
      >
        <Typography className={classes.title}>تعداد لیست : {length}</Typography>
        {Filter && (
          <div className={classes.dropdown}>
            <Button
              onClick={() => setDropdown(!dropdown)}
              className={classes.addbtn}
            >
              <ExpandMoreIcon />
              <Typography className={classes.filter}>
                {Filtertitle === "" ? "فیلتر" : Filtertitle}
              </Typography>
              <FilterListIcon />
            </Button>
            <Box
              display={dropdown ? "block" : "none"}
              className={classes.dropdown_content}
            >
              {Filter?.map((item, i) => (
                <button
                  onClick={() => handleChangeFilter(item.title)}
                  className={classes.filteritems}
                >
                  {item.title}
                </button>
              ))}
            </Box>
          </div>
        )}
        {Filter2 && (
          <Box display="flex">
            <Box padding="5px 10px">
              <SimpleDatePicker label="از تاریخ" setvalue={setdate1} />
            </Box>
            <Box padding="5px 10px">
              <SimpleDatePicker label="تا تاریخ" setvalue={setdate2} />
            </Box>
            <Box padding="5px 10px">
              <Button className={classes.filterbtn}>اعمال فیلتر</Button>
            </Box>
          </Box>
        )}
        {button !== false && (
          <Button onClick={addbtn} className={classes.addbtn}>
            افزودن <AddIcon style={{ margin: "0 4px" }} />
          </Button>
        )}
      </Box>
      <Divider style={{ marginTop: "15px" }} />
      <table id="myTable" className="responsive-table">
        <thead>
          <tr style={{ cursor: "copy" }} onClick={sortTable}>
            {column?.map((item, i) => (
              <th onClick={() => setSort(i)} scope="col">
                {item.title}
                <span
                  style={{ display: i !== sort ? "none" : "initial" }}
                  className={classes.down}
                >
                  ↓
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      {ListData !== undefined && (
        <Pagination
          onChange={handlePageChange}
          page={Pagenumber}
          count={pageCount}
        />
      )}
    </Box>
  );
};
export default Mytable;
