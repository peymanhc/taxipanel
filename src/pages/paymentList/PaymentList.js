import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mytable from "../../components/myTable/Mytable";
import SearchBar from "../../components/searchbar/SearchBar";
import { GetAllPayments, GetPaymentsLists } from "../../store/pay/pay.action";

function PaymentList() {
  const dispatch = useDispatch();
  const addCommas = (num) =>
    num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const Pay = useSelector((state) => state.Pay);
  useEffect(() => {
    dispatch(GetAllPayments());
  }, []);
  return (
    <Box>
      <SearchBar search={true} btntext={"جستجو"} title={"تراکنش های مالی"} />
      <Mytable
        button={false}
        itemsCount={Pay?.alllist?.itemsCount}
        column={Headrow}
        length={Pay?.alllist?.itemsCount}
        Filter={false}
        ListData={GetPaymentsLists}
        rows={
          <>
            {Pay?.data?.data?.map((row, i) => {
              return (
                <tr>
                  <td data-title="ردیف">{i + 1}</td>
                  <td data-title="مبلغ"> {addCommas(row?.amount)} تومان</td>
                  <td data-title="کاربر" style={{ color: "red" }}>
                    {" "}
                    {row?.id}
                  </td>
                  <td data-title="شناسه"> {row?.resNumber}</td>
                  <td
                    data-title="وضعیت"
                    style={{ color: row?.payment ? "green" : "red" }}
                  >
                    {" "}
                    {row?.payment ? "پرداخت شد" : "پرداخت نشده"}
                  </td>
                  <td data-title="توضیحات"> {row?.description}</td>
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
    id: 3,
    title: "مبلغ",
  },
  {
    id: 4,
    title: "کاربر",
  },
  {
    id: 5,
    title: "شناسه",
  },
  {
    id: 6,
    title: "وضعیت",
  },
  {
    id: 7,
    title: "توضیحات",
  },
];

export default PaymentList;
