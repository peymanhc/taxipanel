import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import InputText from "../InputText/InputText";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".MuiInputLabel-formControl": {
      left: "unset",
      right: "5px !important",
    },
  },
}));
const Aboutus = ({ state, setstate }) => {
  useStyles();
  const handleChange = (e) => {
    setstate(e.target.value);
  };
  return (
    <div>
      <InputText
        value={state}
        onChange={(e) => handleChange(e)}
        type="text"
        name={"title"}
        label={"درباره ی ما"}
        multiline={true}
      />
    </div>
  );
};

export default Aboutus;
