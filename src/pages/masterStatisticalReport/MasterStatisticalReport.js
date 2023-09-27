import {
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import {
  GetClearings,
  GetClearingTravel,
} from "../../store/clearings/clearings.action";
import Mytable from "../../components/myTable/Mytable";

function MasterStatisticalReport() {
  const dispatch = useDispatch();
  const Clearings = useSelector((state) => state.Clearings);
  const Auth = useSelector((state) => state.Auth);
  const addCommas = num => num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    dispatch(GetClearingTravel(Auth?.profile?.data[0].id));
  }, []);
  return (
    <Box>
      <SearchBar
        search={true}
        btntext={"جستجو"}
        error={Clearings?.msg?.data?.message}
        title={" گزارش کارکرد رانندگان"}
      />
             <Mytable
        button={false}
        column={Headrow}
        Filter2={true}
        length={Clearings?.sumClearing?.data?.length}
        rows={
          <>
            {Clearings?.sumClearing?.data?.map((row, i) => (
              <tr key={i}>
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="راننده">{row?.masterInfo[0]?.masterDisplayName}</td>
                <td data-title="تعداد کل سفر ها">{row?.countTravel}</td>
                <td data-title="مبلغ کل سفر ها">{addCommas(row?.totalAmount)} تومان</td>
                <td data-title="میزان درامد" >{addCommas(row?.totalIncome)} تومان</td>
                <td data-title="زمان طی شده">{addCommas(row?.totalTimeElapsed)} دقیقه</td>
                <td data-title="مسافت طی شده">{(row?.distanceTraveled / 1000).toFixed(1)} کیلومتر</td>
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
    title: "تعداد کل سفر ها",
  },
  {
    id: 5,
    title: "مبلغ کل سفر ها",
  },
  {
    id: 6,
    title: "میزان درامد",
  },
  {
    id: 7,
    title: "زمان طی شده",
  },
  {
    id: 8,
    title: "مسافت طی شده",
  },
];

export default MasterStatisticalReport;
