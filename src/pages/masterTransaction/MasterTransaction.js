import { Box, Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import PaymentIcon from "@material-ui/icons/Payment";
import {
  GetCleaningList,
  SetCleaningCash,
} from "../../store/cleaning/cleaning.action";
import InputText from "../../components/InputText/InputText";
import SimpleModal from "../../components/simpleModal/SimpleModal";
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
  modalTitle: {
    backgroundColor: "#46426c",
    color: "white",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "center",
    padding: "5px",
  },
  row: {
    "&:hover": {
      backgroundColor: "rgba(70, 66, 108,0.05)",
      cursor: "pointer",
    },
  },
  submit: {
    backgroundColor: "#46426c",
    color: "white",
    width: "100%",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#46426c",
    },
  },
}));
function MasterTransaction() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [modal, setmodal] = useState();
  const [masterid, setmasterid] = useState("");
  const Auth = useSelector((state) => state.Auth);
  const Cleaning = useSelector((state) => state.Cleaning);
  useEffect(() => {
    dispatch(GetCleaningList(Auth?.profile?.data[0]?.id));
  }, []);
  const handleCloseModal = () => {
    setmodal(false);
  };
  const handleOpenModal = (index) => {
    setmodal(true);
    setmasterid(index);
  };
  const SetCashSubmit = (data) => {
    dispatch(SetCleaningCash(data.price, data.description, masterid));
    setTimeout(() => {
      dispatch(GetCleaningList(Auth?.profile?.data[0]?.id));
    }, 700);
    setmodal(false);
  };
  return (
    <Box>
      <SearchBar
        search={true}
        btntext={"جستجو"}
        error={Cleaning?.msg?.data?.message}
        title={"تسویه حساب رانندگان"}
      />
      <Mytable
        button={false}
        itemsCount={Cleaning?.data?.data?.length}
        column={Headrow}
        length={Cleaning?.data?.data?.length}
        ListData={GetCleaningList}
        rows={
          <>
            {Cleaning?.data?.data?.map((row, i) => {
              return (
                <tr>
                  <td data-title="ردیف">{i + 1}</td>
                  <td data-title="راننده"> {row?.userInfo[0]?.userName}</td>
                  <td data-title="بدهکار"> {row?.debtPrice}</td>
                  <td data-title="بستانکار"> {row?.creditPrice}</td>
                  <td data-title="تسویه">
                    <PaymentIcon
                      onClick={(e) => handleOpenModal(row._id)}
                      style={{
                        color: "green",
                        fontSize: 25,
                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </>
        }
      />
      <SimpleModal
        open={modal}
        onClose={handleCloseModal}
        body={
          <React.Fragment>
            <Box className={classes.modalTitle}>افزایش اعتبار</Box>
            <Box
              padding="10px 35px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box width="100%" padding="10px">
                <InputText
                  inputRef={register}
                  type="text"
                  name={"price"}
                  label={"مبلغ"}
                />
              </Box>
              <Box width="100%" padding="10px">
                <InputText
                  inputRef={register}
                  type="text"
                  name={"description"}
                  label={"توضیح"}
                />
              </Box>
              <Box width="100%" padding="10px">
                <Button
                  onClick={handleSubmit(SetCashSubmit)}
                  className={classes.submit}
                >
                  ثبت تراکنش
                </Button>
              </Box>
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
    id: 3,
    title: "راننده",
  },
  {
    id: 4,
    title: "بدهکار",
  },
  {
    id: 5,
    title: "بستانکار",
  },
  {
    id: 6,
    title: "تسویه",
  },
];

export default MasterTransaction;
