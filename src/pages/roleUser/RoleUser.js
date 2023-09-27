import {
  Box,
  makeStyles,
  IconButton,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../components/InputText/InputText";
import SearchBar from "../../components/searchbar/SearchBar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  AddRoles,
  GetRolesList,
  removeRoles,
} from "../../store/roles/roles.action";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useForm } from "react-hook-form";
import Mytable from "../../components/myTable/Mytable";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    top: -60,
    margin: "auto 60px",
    marginLeft: 110,
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 15,
    boxShadow: "0px 1px 6px rgba(0,0,0,0.2)",
    padding: "30px 50px",
    minHeight: 300,
  },
  row: {
    "&:hover": {
      backgroundColor: "rgba(70, 66, 108,0.05)",
      cursor: "pointer",
    },
  },
  tablecell: {
    color: "#607d8b",
    fontSize: 15,
    textAlign: "right",
    [theme.breakpoints.down(1200)]: {
      fontSize: "12px !important",
    },
  },
  tablecelltitle: {
    color: "black",
    fontSize: 18,
    fontWeight: 800,
    textAlign: "right",
  },
  modalTitle: {
    backgroundColor: "#46426c",
    color: "white",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "center",
    padding: "5px",
  },
  SubmitButton: {
    backgroundColor: "#0c1d34",
    color: "white",
    float: "left",
    width: "100%",
    margin: "10px 0",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  title: { textAlign: "center" },
  err: {
    textAlign: "center",
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
}));
function RoleUser() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const Roles = useSelector((state) => state.Roles);
  const [openmodal, setOpenmodal] = useState(false);
  const [expanded, setExpanded] = React.useState("panel1");
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const handleOpenModal = () => {
    setOpenmodal(true);
  };
  const RemoveService = (e, id) => {
    e.stopPropagation();
    dispatch(removeRoles(id));
  };
  useEffect(() => {
    dispatch(GetRolesList());
  }, []);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const SubmitRole = (data) => {
    dispatch(AddRoles(data));
  };
  return (
    <Box>
      <SearchBar search={true} btntext={"جستجو"} title={"سطح دسترسی"} />
      <Mytable
        addbtn={handleOpenModal}
        column={Headrow}
        length={Roles?.data?.data?.length}
        rows={
          <>
            {Roles?.data?.data?.map((row, i) => (
              <tr>
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="عنوان سطح"> {row?.title}</td>
                <td style={{ display: "block" }} data-title="">
                  <IconButton onClick={(e) => RemoveService(e, row?.id)}>
                    <DeleteOutlineIcon
                      style={{ color: "#c62828", fontSize: 25 }}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </>
        }
      />
      <SimpleModal
        open={openmodal}
        onClose={handleCloseModal}
        body={
          <React.Fragment>
            <Box className={classes.modalTitle}>افزودن سطح دسترسی</Box>
            <Box padding="10px">
              <InputText
                type="text"
                name={"title"}
                label={"نام سطح دسترسی"}
                inputRef={register}
              />
            </Box>
            <Typography className={classes.title}>سطح دسترسی ؟</Typography>
            <Box dir={"rtl"}>
              {Levels.map((item, i) => (
                <Accordion
                  expanded={expanded === i}
                  square
                  onChange={handleChange(i)}
                  key={i}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex" flexDirection="column">
                      {item.children.map((index, e) => (
                        <FormControlLabel
                          key={e}
                          style={{ margin: 0 }}
                          control={
                            <Checkbox
                              inputRef={register}
                              name={index.name}
                              size="small"
                            />
                          }
                          label={
                            <span
                              style={{
                                fontWeight: 800,
                                fontSize: 13,
                                color: "#546e7a",
                              }}
                            >
                              {index.title}
                            </span>
                          }
                        />
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            <Box padding="10px">
              <Button
                onClick={handleSubmit(SubmitRole)}
                className={classes.SubmitButton}
              >
                ثبت
              </Button>
            </Box>
          </React.Fragment>
        }
      />
    </Box>
  );
}

const Headrow = [
  {
    id: 1,
    title: "ردیف",
  },
  {
    id: 2,
    title: "عنوان سطح",
  },
  {
    id: 3,
    title: "",
  },
];

const Levels = [
  {
    id: 0,
    title: "خدمات",
    children: [
      {
        id: 0,
        title: "لیست خدمات",
        name: "serviceList",
      },
      {
        id: 2,
        title: "افزودن خدمت",
        name: "serviceAdd",
      },
    ],
  },
  {
    id: 1,
    title: "فروش",
    children: [
      {
        id: 0,
        title: "لیست سفارشات",
        name: "orderList",
      },
      {
        id: 1,
        title: "لیست درخواست ها",
        name: "reqList",
      },
      {
        id: 2,
        title: "ثبت صفارش جدید",
        name: "addorder",
      },
      {
        id: 3,
        title: "لیست کد های تخفیف",
        name: "discountList",
      },
      {
        id: 4,
        title: "افزودن کد تخفیف",
        name: "AddDiscount",
      },
    ],
  },
  {
    id: 2,
    title: "مدیریت کاربران",
    children: [
      {
        id: 0,
        title: "لیست کاربران",
        name: "UsersList",
      },
      {
        id: 1,
        title: "افزودن ناظر ها",
        name: "nazerList",
      },
      {
        id: 2,
        title: "لیست رانندگان",
        name: "driverList",
      },
      {
        id: 3,
        title: "وضعیت رانندگان",
        name: "driverStatus",
      },
      {
        id: 4,
        title: "افزودن راننده",
        name: "Adddriver",
      },
      {
        id: 5,
        title: "تعیین سطح دسترسی",
        name: "Level",
      },
    ],
  },
  {
    id: 3,
    title: "حسابداری",
    children: [
      {
        id: 0,
        title: "لیست حساب رانندگان",
        name: "drivercart",
      },
      {
        id: 1,
        title: "تسویه حساب رانندگان",
        name: "drivertasvie",
      },
      {
        id: 2,
        title: "گزارش کارکرد رانندگان",
        name: "drivergozaresh",
      },
      {
        id: 3,
        title: "تراکنش های مالی",
        name: "mali",
      },
    ],
  },
  {
    id: 2,
    title: "تنظیمات",
    children: [
      {
        id: 0,
        title: "تنظیمات اپلیکیشن",
        name: "Appsettings",
      },
      {
        id: 1,
        title: "تنظیمات سیستم",
        name: "systemSettings",
      },
    ],
  },
];

export default RoleUser;
