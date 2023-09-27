import { Box } from "@material-ui/core";
import React from "react";
import InputText from "../InputText/InputText";

const ContactUs = ({ state, setstate }) => {
  return (
    <Box width={"50%"}>
      <InputText
        value={state}
        onChange={(e) => setstate(e.target.value)}
        type="text"
        name={"title"}
        label={"شماره تماس"}
      />
    </Box>
  );
};

export default ContactUs;
