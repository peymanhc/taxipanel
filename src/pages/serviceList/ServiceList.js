import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import SearchBar from "../../components/searchbar/SearchBar";
import {
  GetServices,
  RemoveServices,
} from "../../store/services/service.action";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Mytable from "../../components/myTable/Mytable";

function ServiceList() {
  const dispatch = useDispatch();
  const Services = useSelector((state) => state.Services);
  const history = useHistory();

  const goToInfo = (serviceId) => {
    history.push(`/ServiceInfo/${serviceId}`);
  };
  const RemoveService = (e, id) => {
    e.stopPropagation();
    dispatch(RemoveServices(id));
  };
  useEffect(() => {
    dispatch(GetServices());
  }, []);
  const goToAddService = () => {
    history.push(`/AddService`);
  };
  const addCommas = num => num?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Box>
      <SearchBar search={true} btntext={"جستجو"} title={"لیست خدمات"} />
      <Mytable
        addbtn={goToAddService}
        column={Headrow}
        length={Services?.services?.data?.length}
        rows={
          <>
            {Services?.services?.data?.map((row, i) => (
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => goToInfo(row.id)}
              >
                <td data-title="ردیف">{i + 1}</td>
                <td data-title="نام خدمت"> {row?.infoService?.title}</td>
                <td data-title="شهر"> {row?.city?.cityName}</td>
                <td data-title="قیمت ورودی"> {addCommas(row?.price?.priceInter)}</td>
                <td data-title="قیمت دقیقه"> {addCommas(row?.price?.priceMin)}</td>
                <td data-title="قیمت کیلومتر"> {addCommas(row?.price?.priceKil)}</td>
                <td data-title="حداقل قیمت"> {addCommas(row?.price?.priceLess)}</td>
                <td data-title="فعال">
                  {row.active ? (
                    <CheckCircleOutlineIcon
                      style={{ color: "green", fontSize: 25 }}
                    />
                  ) : (
                    <ErrorOutlineIcon style={{ color: "red", fontSize: 25 }} />
                  )}
                </td>
                <td style={{ display: "block" }} data-title="">
                  <DeleteOutlineIcon
                    onClick={(e) => RemoveService(e, row?.id)}
                    style={{
                      color: "#c62828",
                      fontSize: 25,
                      cursor: "pointer",
                    }}
                  />
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
    title: "نام خدمت",
  },
  {
    id: 3,
    title: "شهر",
  },
  {
    id: 4,
    title: "قیمت ورودی",
  },
  {
    id: 5,
    title: "قیمت دقیقه",
  },
  {
    id: 6,
    title: "قیمت کیلومتر",
  },
  {
    id: 7,
    title: "حداقل قیمت",
  },
  {
    id: 8,
    title: "فعال",
  },
  {
    id: 9,
    title: "",
  },
];

export default ServiceList;
