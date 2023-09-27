import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import DatePicker from "react-datepicker2";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles((theme) => ({
  remove: {
    fontSize: 18,
    color: "red",
    cursor: "pointer",
  },
  "@global": {
    ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(28px,-5px) scale(0.7) !important",
    },
    ".tether-element": {
      top: "0 !important",
    },
    ".datepicker-input": {
      marginTop: 6,
      width: "100%",
      height: 56,
      backgroundColor: "#fafafa",
      padding: "0 10px",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      fontWeight: 700,
      fontSize: 15,
      textAlign: "right",
      display: "flex",
      justifyContent: "space-between",
    },
    ".JDatePicker": {
      zIndex: 99,
    },
    ".JDatePicker button": {
      width: "auto !important",
    },
    ".JDcancel": {
      backgroundColor: "red",
    },
    ".JDsubmit": {
      backgroundColor: "#46426c !important",
    },
    ".JDatePicker .JC-months .holder:last-child": {
      width: "100% !important",
    },
    ".JDatePicker .day-items:hover, .JDatePicker .day-items.selected": {
      backgroundColor: "#46426c !important",
      color: "white !important",
    },
  },
}));
const DatePickerInput = (props) => {
  return <input {...props}></input>;
};
const SimpleDatePicker = ({ setvalue, remove, label }) => {
  const classes = useStyles();
  const change = (unix) => {
    setvalue(unix._d.getTime());
  };
  return (
    <>
      <DatePicker
        inputComponent={DatePickerInput}
        placeholder={label}
        isGregorian={false}
        timePicker={false}
        persianDigits={false}
        onChange={change}
        id="datePicker"
      />
    </>
  );
};

export default SimpleDatePicker;
