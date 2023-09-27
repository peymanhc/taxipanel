import {
  Box,
  Button,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCity, GetCities, RemoveCity } from "../../store/cities/city.action";
import SimpleTable from "../SimpleTable/SimpleTable";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import SimpleModal from "../simpleModal/SimpleModal";
import InputText from "../InputText/InputText";
import MyMap from "../map/MyMap";
import PlaceIcon from "../../resurces/black_pin.svg";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    direction: "rtl",
    textAlign: "right",
  },
  tablecell: {
    color: "#607d8b",
    fontSize: 15,
    textAlign: "right",
    [theme.breakpoints.down(1200)]: {
      fontSize: "12px !important",
    },
  },
  modalTitle: {
    backgroundColor: "#46426c",
    color: "white",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "center",
    padding: "5px",
  },
  addToList: {
    backgroundColor: "#0c1d34",
    color: "white",
    float: "left",
    width: "200px",
    marginBottom: "20px",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  SubmitButton: {
    backgroundColor: "#0c1d34",
    color: "white",
    float: "left",
    width: "100%",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  "@global": {
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
        backgroundImage: `url(${PlaceIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: 30,
        height: 30,
      },
    },
  },
}));
const CityList = () => {
  const classes = useStyles();
  const Cities = useSelector((state) => state.Cities);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [openmodal, setOpenmodal] = useState(false);
  const [cityTitle, setcityTitle] = useState("");
  const [Place, setPlace] = useState();
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const handleOpenModal = () => {
    setOpenmodal(true);
  };
  useEffect(() => {
    dispatch(GetCities());
  }, []);
  const RemoveItem = (e, id) => {
    dispatch(RemoveCity(id));
  };
  const SubmitAddCity = (id) => {
    dispatch(AddCity(cityTitle, Place?.Ra?.i, Place?.La?.g));
    setOpenmodal(false);
  };
  return (
    <div>
      {Auth?.profile?.data[0]?.role === "سوپر ادمین" && (
        <Button onClick={handleOpenModal} className={classes.addToList}>
          افزودن شهر <AddIcon />
        </Button>
      )}
      <SimpleTable
        head={Tablehead}
        body={
          <>
            {Cities?.cities?.data.map((item, i) => (
              <TableRow className={classes.row} key={i}>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {i + 1}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                  width="30%"
                >
                  {item.nameCity}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.location?.coordinates[0]}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.location?.coordinates[1]}
                </TableCell>
                <TableCell className={classes.tablecell}>
                  <IconButton onClick={(e) => RemoveItem(e, item?.id)}>
                    <DeleteOutlineIcon
                      style={{ color: "#c62828", fontSize: 25 }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      <SimpleModal
        open={openmodal}
        onClose={handleCloseModal}
        body={
          <React.Fragment>
            <Box className={classes.modalTitle}>افزودن شهر</Box>
            <Box
              padding="10px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <InputText
                type="text"
                value={cityTitle}
                onChange={(e) => setcityTitle(e.target.value)}
                name={"title"}
                label={"عنوان شهر"}
              />
              <Box marginTop="5px" width="100%" height="400px">
                <MyMap
                  zoom={13}
                  center={{
                    lat: 36.2605,
                    lng: 59.6168,
                  }}
                  events={{ onBoundsChangerd: (arg) => setPlace(arg) }}
                ></MyMap>
              </Box>
            </Box>
            <Button onClick={SubmitAddCity} className={classes.SubmitButton}>
              افزودن شهر <AddIcon />
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
};

const Tablehead = [
  {
    id: 0,
    title: "ردیف",
  },
  {
    id: 1,
    title: "شهر",
  },
  {
    id: 2,
    title: "طول جغرافیایی",
  },
  {
    id: 3,
    title: "عرض جغرافیایی",
  },
  {
    id: 4,
    title: "",
  },
];
export default CityList;
