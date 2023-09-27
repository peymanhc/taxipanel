import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "100px",
    zIndex: 99,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    overflow: "hidden",
    overflowY: "scroll",
    maxHeight: 700,
    position: "relative",
  },
  wrap: {
    minWidth: 700,
    [theme.breakpoints.down(1200)]: {
      minWidth: 500,
    },
    [theme.breakpoints.down(900)]: {
      minWidth: 280,
    },
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const classes = useStyles();
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
    <animated.div
      ref={ref}
      className={classes.wrap}
      style={{ style }}
      {...other}
    >
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

export default function SimpleModal({ open, onClose, body }) {
  const classes = useStyles();
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
          <div className={classes.paper}>{body}</div>
        </Fade>
      </Modal>
    </div>
  );
}
