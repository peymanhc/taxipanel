import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  LinearProgress,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import SearchBar from "../../components/searchbar/SearchBar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ProfileImage from "../../resurces/profileimage.png";
import {
  AddUserAdmin,
  GetClientList,
  GetRole,
  RemoveUser,
} from "../../store/clientList/clientList.action";
import SimpleModal from "../../components/simpleModal/SimpleModal";
import InputText from "../../components/InputText/InputText";
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
  "@global": {
    ".MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(22px,-5px) scale(0.7) !important",
    },
    ".MuiSelect-icon": {
      left: 10,
      right: "unset",
    },
    ".MuiMenuItem-root": {
      direction: "rtl",
      padding: "5px 10px",
      fontWeight: 700,
      fontSize: 14,
      color: "#607d8b",
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
  profile: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    border: "1px solid #262545",
  },
  err: {
    textAlign: "center",
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
}));
function UsersList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const Client = useSelector((state) => state.Client);
  const Auth = useSelector((state) => state.Auth);
  const [loading, setloading] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [role, setrole] = useState("ادمین");
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const RemoveService = (e, id) => {
    e.stopPropagation();
    dispatch(RemoveUser(Auth?.profile?.data[0]?.id, id));
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 700);
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const handleOpenModal = () => {
    setOpenmodal(true);
  };
  useEffect(() => {
    dispatch(GetClientList());
    dispatch(GetRole());
  }, []);
  const handleAddUser = (data) => {
    dispatch(
      AddUserAdmin(
        data.mobile,
        data.password,
        data.name,
        data.moaref,
        data.active.toString(),
        data.address,
        Auth?.profile?.data[0]?.id,
        role
      )
    );
  };
  const goToDetail = (serviceId) => {
    history.push(`/MasterDetail/${serviceId}`);
  };
  return (
    <Box>
      <SimpleModal
        open={openmodal}
        onClose={handleCloseModal}
        body={
          <React.Fragment>
            <Box className={classes.modalTitle}>افزودن کاربر</Box>
            <Grid dir="rtl" container style={{ padding: "15px" }}>
              <Grid item xs={12}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <img
                    className={classes.profile}
                    src={ProfileImage}
                    alt="profile"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <InputText
                    inputRef={register}
                    type="text"
                    name={"name"}
                    label={"نام و نام خانوادگی"}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <InputText
                    inputRef={register}
                    type="text"
                    name={"mobile"}
                    label={"موبایل"}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <InputText
                    inputRef={register}
                    type="text"
                    name={"password"}
                    label={"رمز عبور"}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <InputText
                    inputRef={register}
                    type="text"
                    name={"confrimPassword"}
                    label={"تکرار رمز عبور"}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <InputText
                    inputRef={register}
                    type="text"
                    name={"moaref"}
                    label={"کد معرف"}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      دسترسی
                    </InputLabel>
                    <Select
                      value={role}
                      onChange={(event) => setrole(event.target.value)}
                      variant="outlined"
                    >
                      {Client?.roles?.data?.map((item, i) => {
                        return (
                          <MenuItem value={item?.title}>{item?.title}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  padding="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <InputText
                    inputRef={register}
                    multiline={true}
                    type="text"
                    name={"address"}
                    label={"آدرس"}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box padding="10px">
                  <FormControlLabel
                    style={{ margin: 0 }}
                    inputRef={register}
                    name="active"
                    control={<Checkbox size="small" />}
                    label={
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: 13,
                          color: "#546e7a",
                        }}
                      >
                        کاربر فعال شود ؟
                      </span>
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box padding="10px">
                  <Button
                    onClick={handleSubmit(handleAddUser)}
                    className={classes.SubmitButton}
                  >
                    ثبت
                  </Button>
                </Box>
                <Typography className={classes.err}>
                  {Client?.msg?.data?.message}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />

      <SearchBar
        error={Client?.msg?.message}
        search={true}
        btntext={"جستجو"}
        title={"لیست کاربران"}
      />
      <Mytable
        addbtn={handleOpenModal}
        column={Headrow}
        length={Client?.data?.data?.length}
        rows={
          <>
            {Client?.data?.data?.map((row, i) => (
              <tr
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => goToDetail(row.id)}
              >
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="نام کاربر"> {row?.displayName}</td>
                <td data-title="موبایل"> {row?.mobile}</td>
                <td data-title="نوع کاربری"> {row?.role}</td>
                <td data-title="تاریخ عضویت"> {row?.createDate}</td>
                <td data-title="وضعیت">
                  {" "}
                  {row.active ? (
                    <Typography
                      className={classes.tablecell}
                      style={{ color: "green" }}
                    >
                      فعال
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.tablecell}
                      style={{ color: "red" }}
                    >
                      غیر فعال
                    </Typography>
                  )}
                </td>
                <td style={{ display: "block" }} data-title="">
                  <IconButton onClick={(e) => RemoveService(e, row?.id)}>
                    <DeleteOutlineIcon style={{ color: "#c62828" }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </>
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
    title: "نام کاربر",
  },
  {
    id: 3,
    title: "موبایل",
  },
  {
    id: 4,
    title: "نوع کاربری",
  },
  {
    id: 5,
    title: "تاریخ عضویت",
  },
  {
    id: 6,
    title: "وضعیت",
  },
  {
    id: 9,
    title: "",
  },
];

export default UsersList;
