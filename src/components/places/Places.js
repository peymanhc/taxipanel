import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import MyMap from "../map/MyMap";

const useStyles = makeStyles((theme) => ({
    "@global": {
        ".MuiFormControlLabel-root": {
          margin: "0px !important",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "10px 0",
        },
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
            width: 30,
            height: 30,
          },
        },
      },
}))
const Places = () => {
    useStyles()
  return (
    <Box height="450px">
      <MyMap
        zoom={13}
        center={{
          lat: 36.2605,
          lng: 59.6168,
        }}
      ></MyMap>
    </Box>
  );
};

export default Places;
