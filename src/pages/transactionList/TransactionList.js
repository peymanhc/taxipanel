import {
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import { GetClearings } from "../../store/clearings/clearings.action";
import Mytable from "../../components/myTable/Mytable";

function TransactionList() {
  const dispatch = useDispatch();
  const Clearings = useSelector((state) => state.Clearings);
  const addCommas = num => num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    dispatch(GetClearings());
  }, []);
  return (
    <Box>
      <SearchBar
        search={true}
        btntext={"جستجو"}
        error={Clearings?.msg?.data?.message}
        title={"لیست حساب رانندگان"}
      />
       <Mytable
        button={false}
        column={Headrow}
        Filter2={true}
        length={Clearings?.data?.data?.length}
        rows={
          <>
            {Clearings?.data?.data?.map((row, i) => (
              <tr key={i}>
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="راننده">   {row?.userInfo?.userName}</td>
                <td data-title="تاریخ">    {row?.createDate}</td>
                <td data-title="مبلغ">   {addCommas(row?.price)} تومان</td>
                <td data-title="نوع" style={{color: row?.type ? "green" : "red"}} >  {row?.type ? "بستانکار" : "بدهکار"}</td>
                <td data-title="توضیح">   {row?.description}</td>
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
    id: 3,
    title: "راننده",
  },
  {
    id: 4,
    title: "تاریخ",
  },
  {
    id: 5,
    title: "مبلغ",
  },
  {
    id: 6,
    title: "نوع",
  },
  {
    id: 7,
    title: "توضیح",
  },
];

export default TransactionList;
