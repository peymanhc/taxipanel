import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Box, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "100px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 500,
    maxWidth: 1000,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    overflow: "hidden",
    maxHeight: 700,
    position: "relative",
  },
  modalTitle: {
    backgroundColor: "#46426c",
    color: "white",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "center",
    padding: "5px",
  },
  buttons: {
    backgroundColor: "#262545",
    width: 150,
    padding: "5px",
    color: "white",
    "&:hover": {
      backgroundColor: "#46426c",
    },
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SaveModal({ open, onClose, SaveChanges }) {
  const classes = useStyles();
  const clicked = (event) => {
    onClose();
    SaveChanges();
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Box className={classes.modalTitle}>ذخیره کردن </Box>
            <Box
              padding="10px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="body2">
                آیا از ذخیره تغییرات اطمینان دارید؟
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                width="100%"
                marginTop="20px"
              >
                <Button className={classes.buttons} onClick={clicked}>
                  بله
                </Button>
                <Button className={classes.buttons} onClick={onClose}>
                  خیر
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
