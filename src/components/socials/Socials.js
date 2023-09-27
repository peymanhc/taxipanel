import { Box, Grid } from "@material-ui/core";
import React from "react";
import InputText from "../InputText/InputText";

const Socials = ({ state, setstate }) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box padding="10px">
            <InputText
              value={state.telegram}
              onChange={(e) => setstate({ ...state, telegram: e.target.value })}
              type="text"
              name={"title"}
              label={"لینک تلگرام"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding="10px">
            <InputText
              value={state.instagram}
              onChange={(e) =>
                setstate({ ...state, instagram: e.target.value })
              }
              type="text"
              name={"title"}
              label={"لینک اینستاگرام"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding="10px">
            <InputText
              value={state.youtube}
              onChange={(e) => setstate({ ...state, youtube: e.target.value })}
              type="text"
              name={"title"}
              label={"لینک یوتیوب"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding="10px">
            <InputText
              value={state.aparat}
              onChange={(e) => setstate({ ...state, aparat: e.target.value })}
              type="text"
              name={"title"}
              label={"لینک آپارات"}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Socials;
