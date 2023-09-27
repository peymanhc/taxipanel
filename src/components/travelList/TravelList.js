import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerOrders } from "../../store/users/users.action";
import { useParams } from "react-router";
import Mytable from "../myTable/Mytable";
import { Box } from "@material-ui/core";
const TravelList = () => {
  const Users = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const params = useParams();
  const addCommas = num => num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    dispatch(CustomerOrders(params.id));
  }, []);
  return (
    <Box>
      <Mytable
        button={false}
        column={Headrow}
        Filter2={true}
        length={Users?.MasterChild?.data?.length}
        rows={
          <>
            {Users?.MasterChild?.data?.map((row, i) => {
              const status = row?.statusInfo?.length;
              return (
                <tr key={i}>
                  <td data-title="ردیف">{i + 1}</td>
                  <td data-title="نوع سرویس">{row?.serviceInfo?.serviceTitle}</td>
                  <td data-title="راننده">
                    {row?.masterInfo?.masterDisplayName}
                  </td>
                  <td
                    data-title="قیمت کل"
                    style={{ color: row?.type ? "green" : "red" }}
                  >
                    {addCommas(row?.priceInfo?.price)} تومان
                  </td>
                  <td data-title="تاریخ ثبت صفارش"> {row?.createDate}</td>
                  <td data-title="نحوه پرداخت">
                    {row?.paymentInfo?.paymentTitle}
                  </td>
                  <td data-title="وضعیت سفارش">
                    {row?.statusInfo !== undefined &&
                      row?.statusInfo[status - 1]?.statusTitle}
                  </td>
                </tr>
              );
            })}
          </>
        }
      />
    </Box>
  );
};

const Headrow = [
  {
    id: 0,
    title: "ردیف",
  },
  {
    id: 1,
    title: "نوع سرویس",
  },
  {
    id: 2,
    title: "راننده",
  },
  {
    id: 3,
    title: "قیمت کل",
  },
  {
    id: 4,
    title: "تاریخ ثبت صفارش",
  },
  {
    id: 5,
    title: "نحوه پرداخت",
  },
  {
    id: 6,
    title: "وضعیت سفارش",
  },
];
export default TravelList;
