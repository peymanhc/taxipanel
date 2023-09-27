import { Box, Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import React from "react";
import InputText from "../InputText/InputText";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(47px,-5px) scale(0.7) !important",
    },
  },
}));
const AppInformation = ({ state, setstate }) => {
  useStyles();
  return (
    <Box display="flex">
      <Box padding="10px">
        <InputText
          value={state.userVersion}
          onChange={(e) => setstate({ ...state, userVersion: e.target.value })}
          type="text"
          name={"title"}
          label={"ورژن اپلیکیشن مسافر"}
        />
        <FormControlLabel
          style={{ margin: 0 }}
          control={
            <Checkbox
              value={state.lastuserVersion}
              onChange={(e) =>
                setstate({ ...state, lastuserVersion: !state.lastuserVersion })
              }
              size="small"
            />
          }
          label={
            <span style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}>
              اپدیت اجباری؟
            </span>
          }
        />
      </Box>
      <Box padding="10px">
        <InputText
          value={state.driverVersion}
          onChange={(e) =>
            setstate({ ...state, driverVersion: e.target.value })
          }
          type="text"
          name={"title"}
          label={"ورژن اپلیکیشن راننده"}
        />
        <FormControlLabel
          style={{ margin: 0 }}
          control={
            <Checkbox
              value={state.lastdriverVersion}
              onChange={(e) =>
                setstate({
                  ...state,
                  lastdriverVersion: !state.lastdriverVersion,
                })
              }
              size="small"
            />
          }
          label={
            <span style={{ fontWeight: 800, fontSize: 13, color: "#546e7a" }}>
              اپدیت اجباری؟
            </span>
          }
        />
      </Box>
    </Box>
  );
};

export default AppInformation;
