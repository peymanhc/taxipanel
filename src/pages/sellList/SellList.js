import {
  Box,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  GetListCount,
  GetSellList,
  RemoveOrder,
} from "../../store/sellList/sellList.action";
import { useHistory } from "react-router";
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
}));
function SellList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const Orders = useSelector((state) => state.Orders);
  const history = useHistory();
  useEffect(() => {
    dispatch(GetListCount());
  }, []);
  const goToInfo = (serviceId) => {
    history.push(`/sellDetail/${serviceId}`);
  };
  const RemoveItem = (e, id) => {
    e.stopPropagation();
    dispatch(RemoveOrder(id));
  };
  const addCommas = (num) =>
    num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Box>
      <SearchBar search={true} btntext={"جستجو"} title={"لیست سفارشات"} />
      <Mytable
        button={false}
        itemsCount={Orders?.count?.itemsCount}
        column={Headrow}
        length={Orders?.count?.itemsCount}
        ListData={GetSellList}
        Filter={filter}
        rows={
          <>
            {Orders?.data?.data?.map((row, i) => {
              const status = row?.statusInfo.length;
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={() => goToInfo(row.id)}
                >
                  <td data-title="ردیف">{i + 1}</td>
                  <td data-title="کاربر گیرنده">
                    {" "}
                    {row?.customerInfo?.customerDisplayName}
                  </td>
                  <td data-title="راننده">
                    {row?.masterInfo?.masterDisplayName}
                  </td>
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
    title: "راننده",
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
    title: "همه سفر ها",
  },
  {
    id: 1,
    title: "سفر های تایید شده",
  },
  {
    id: 2,
    title: "سفر های انصرافی",
  },
];

export default SellList;
