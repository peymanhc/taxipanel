import { makeStyles, TextField, withStyles } from "@material-ui/core";
import React from "react";
import "./styles.css";
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl !important",
    width: "100%",
  },
  "@global": {
    ".MuiFormLabel-root": {
      color: "black",
      fontWeight: 700,
      fontSize: 13,
    },
  },
}));
const StyledTextField = withStyles({
  root: {
    "& label": {
      transformOrigin: "top",
      left: "unset",
      right: 25,
    },
    "& legend": {
      textAlign: "right",
    },
  },
})(TextField);

const InputText = ({
  label,
  name,
  inputRef,
  click,
  defaultValue,
  type,
  disabled,
  value,
  onChange,
  multiline,
  maxLength,
}) => {
  const classes = useStyles();
  const checkLength = (e) => {
    if (e.target.value.length === e.target.maxLength) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    return true;
  };
  let length = maxLength?.toString();
  return (
    <label dir="rtl" className="pure-material-textfield-outlined">
      <input
        name={name}
        ref={inputRef}
        onClick={click}
        defaultValue={defaultValue}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={length}
        onKeyPress={(e) => checkLength(e)}
        placeholder=" "
      />
      <span>{label}</span>
    </label>
  );
};
export default InputText;
