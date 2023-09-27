import {
  Box,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  GetRequestList,
  RemoveRequest,
  RequestsListCount,
} from "../../store/requestList/requestList.action";
import Mytable from "../../components/myTable/Mytable";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  row: {
    "&:hover": {
      backgroundColor: "rgba(70, 66, 108,0.05)",
    },
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
}));
function RequestList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Requests = useSelector((state) => state.Requests);
  const addCommas = (num) =>
    num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    dispatch(GetRequestList());
    dispatch(RequestsListCount());
  }, []);
  const RemoveItem = (e, id) => {
    e.stopPropagation();
    dispatch(RemoveRequest(id));
  };
  return (
    <Box>
      <SearchBar search={true} btntext={"جستجو"} title={"لیست درخواست ها"} />
      <Mytable
        button={false}
        itemsCount={Requests?.count?.itemsCount}
        column={Headrow}
        length={Requests?.count?.itemsCount}
        ListData={GetRequestList}
        Filter={filter}
        rows={
          <>
            {Requests?.data?.data?.map((row, i) => {
              const status = row?.statusInfo.length;
              return (
                <tr style={{ cursor: "pointer" }}>
                  <td data-title="ردیف">{i + 1}</td>
                  <td data-title="کاربر گیرنده">
                    {row?.customerInfo?.customerDisplayName}
                  </td>
                  <td data-title="راننده">{row?.masterList?.length}</td>
                  <td data-title="نحوه پرداخت">
                    {row?.paymentInfo?.paymentTitle}
                  </td>
                  <td data-title="هزینه سفر">
                    {addCommas(row?.priceInfo?.totlaPrice)}
                  </td>
                  <td data-title="تاریخ ثبت">{row?.createDate}</td>
                  <td data-title="وضعیت سفارش">
                    {row?.statusInfo !== undefined &&
                      row?.statusInfo[status - 1]?.statusTitle}
                  </td>
                  <td data-title="">
                    <DeleteOutlineIcon
                      onClick={(e) => RemoveItem(e, row?.id)}
                      style={{ color: "#c62828", fontSize: 25 }}
                    />
                  </td>
                </tr>
              );
            })}
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
    title: "کاربر گیرنده",
  },
  {
    id: 3,
    title: "تعداد راننده",
  },
  {
    id: 4,
    title: "نحوه پرداخت",
  },
  {
    id: 5,
    title: "هزینه سفر",
  },
  {
    id: 6,
    title: "تاریخ ثبت",
  },
  {
    id: 7,
    title: "وضعیت سفارش",
  },
  {
    id: 8,
    title: "",
  },
];
const filter = [
  {
    id: 0,
    title: "همه درخواست ها",
  },
  {
    id: 1,
    title: "درخواست های فعال",
  },
  {
    id: 2,
    title: "درخواست های رد شده",
  },
];

export default RequestList;
