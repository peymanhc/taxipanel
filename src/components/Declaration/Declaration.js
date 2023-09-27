import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleTable from "../SimpleTable/SimpleTable";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  AddDeclaration,
  GetDeclaration,
  RemoveDeclaration,
} from "../../store/declaration/declaration.action";
import AddIcon from "@material-ui/icons/Add";
import SimpleModal from "../simpleModal/SimpleModal";
import InputText from "../InputText/InputText";

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
  radiogp: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    direction: "rtl",
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
}));
const Declaration = () => {
  const Declaration = useSelector((state) => state.Declaration);
  const Auth = useSelector((state) => state.Auth);
  const [openmodal, setOpenmodal] = useState(false);
  const [groupselect, setgroupselect] = useState("0");
  const [DecTitle, setDecTitle] = useState("");
  const [DecDescription, setDecDescription] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(GetDeclaration());
  }, []);
  const RemoveItem = (e, id) => {
    dispatch(RemoveDeclaration(id));
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const handleOpenModal = () => {
    setOpenmodal(true);
  };
  const handleChangegroup = (event) => {
    setgroupselect(event.target.value);
  };
  const SubmitAddDec = (id) => {
    dispatch(AddDeclaration(DecTitle, DecDescription, groupselect));
    setOpenmodal(false);
  };
  return (
    <div>
      {Auth?.profile?.data[0]?.role === "سوپر ادمین" && (
        <Button onClick={handleOpenModal} className={classes.addToList}>
          افزودن اعلامیه <AddIcon />
        </Button>
      )}
      <SimpleTable
        head={Tablehead}
        body={
          <>
            {Declaration?.data?.data.map((item, i) => (
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
                  {item.title}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.description}
                </TableCell>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {item.type}
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
            <Box className={classes.modalTitle}>افزودن اعلامیه</Box>
            <Box
              padding="10px 35px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box width="100%" padding="10px">
                <InputText
                  type="text"
                  value={DecTitle}
                  onChange={(e) => setDecTitle(e.target.value)}
                  name={"title"}
                  label={"عنوان اعلامیه"}
                />
              </Box>
              <Box width="100%" padding="10px">
                <InputText
                  type="text"
                  value={DecDescription}
                  onChange={(e) => setDecDescription(e.target.value)}
                  name={"title"}
                  label={"توضیحات"}
                  multiline={true}
                />
              </Box>
              <RadioGroup
                className={classes.radiogp}
                value={groupselect}
                onChange={handleChangegroup}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio size="small" />}
                  label="همه"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="سفیران"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio size="small" />}
                  label="مسافران"
                />
              </RadioGroup>
            </Box>
            <Button onClick={SubmitAddDec} className={classes.SubmitButton}>
              افزودن اعلامیه <AddIcon />
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
    title: "عنوان",
  },
  {
    id: 2,
    title: "توضیح",
  },
  {
    id: 3,
    title: "گروه",
  },
  {
    id: 4,
    title: "",
  },
];
export default Declaration;
