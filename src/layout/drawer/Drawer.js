import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "../sidebar/Sidebar";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    display: "none",
    [theme.breakpoints.down(920)]: {
      display: "block",
    },
  },
}));

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box margin="0 10px">
        <MenuIcon className={classes.menuIcon} onClick={handleDrawerOpen} />
        <Drawer anchor={"right"} open={open} onClose={handleDrawerClose}>
          <Sidebar close={handleDrawerClose} />
        </Drawer>
      </Box>
    </div>
  );
}
