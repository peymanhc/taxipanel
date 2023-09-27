import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useHistory } from "react-router";
import {
  GetDiscountList,
  RemoveDiscount,
} from "../../store/discount/discount.action";
import Mytable from "../../components/myTable/Mytable";

function DiscountCode() {
  const dispatch = useDispatch();
  const Discount = useSelector((state) => state.Discount);
  const addCommas = (num) =>
    num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    dispatch(GetDiscountList());
  }, []);
  const RemoveItem = (e, id) => {
    dispatch(RemoveDiscount(id));
  };
  return (
    <Box>
      <SearchBar
        error={Discount?.msg?.message}
        search={true}
        btntext={"جستجو"}
        title={"لیست کد های تخفیف"}
      />
      <Mytable
        button={false}
        itemsCount={Discount?.data?.itemsCount}
        column={Headrow}
        length={Discount?.data?.data?.length}
        rows={
          <>
            {Discount?.data?.data?.map((row, i) => {
              return (
                <tr style={{ cursor: "pointer" }}>
                  <td data-title="ردیف">{i + 1}</td>
                  <td data-title="نام خدمت">{row?.discountCode}</td>
                  <td data-title="موبایل کاربر">{row?.userMobile}</td>
                  <td data-title="سرویس">{row?.serviceInfo?.serviceTitle}</td>
                  <td data-title="حداکثر قیمت">
                    {addCommas(row?.maximumPrice)}
                  </td>
                  <td data-title="درصد">{row?.percentCode} %</td>
                  <td data-title="تاریخ ثبت">{row?.createDate}</td>
                  <td data-title="تاریخ انقضا">{row?.expireDate}</td>
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
    title: "نام خدمت",
  },
  {
    id: 3,
    title: "موبایل کاربر",
  },
  {
    id: 4,
    title: "سرویس",
  },
  {
    id: 5,
    title: "حداکثر قیمت",
  },
  {
    id: 6,
    title: "درصد",
  },
  {
    id: 7,
    title: "تاریخ ثبت",
  },
  {
    id: 7,
    title: "تاریخ انقضا",
  },
  {
    id: 8,
    title: "",
  },
];

export default DiscountCode;
