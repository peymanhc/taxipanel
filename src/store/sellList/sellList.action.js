import axios from "../../shared/Shared";
export const LIST_COUNT = "LIST_COUNT";
export const SELL_LIST_LOADING = "SELL_LIST CONFIG";
export const SELL_LIST_SUCCESS = "SELL_LIST CONFIG SUCCESS ";
export const SELL_LIST_FAILED = "SELL_LIST CONFIG FAILED";
export const SELL_LIST_INFO_SUCCESS = "SELL_LIST_INFO CONFIG SUCCESS ";
export const SELL_LIST_INFO_FAILED = "SELL_LIST_INFO CONFIG FAILED";
export const ADD_ORDER = "ADD_ORDER";

export const ListCount = (data) => {
  return {
    type: LIST_COUNT,
    data,
  };
};
export const SellListSuccess = (data) => {
  return {
    type: SELL_LIST_SUCCESS,
    data,
  };
};
export const SellListFailed = (error) => {
  return {
    type: SELL_LIST_FAILED,
    error,
  };
};
export const SellListLoading = (error) => {
  return {
    type: SELL_LIST_LOADING,
  };
};
export const SellListInfoSuccess = (data) => {
  return {
    type: SELL_LIST_INFO_SUCCESS,
    data,
  };
};
export const SellListInfoFailed = (error) => {
  return {
    type: SELL_LIST_INFO_FAILED,
    error,
  };
};
export const AddOrder = (data) => {
  return {
    type: ADD_ORDER,
    data,
  };
};

export function GetSellList(page) {
  const request = axios.post(`order/getOrders`, {
    page: page,
    limit: 10,
  });
  return (dispatch) => {
    dispatch(SellListLoading());
    request
      .then((response) => {
        dispatch(SellListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(SellListFailed(error));
      });
  };
}
export function GetListCount() {
  const request = axios.post(`order/getOrders`);
  return (dispatch) => {
    dispatch(SellListLoading());
    request
      .then((response) => {
        dispatch(ListCount(response.data));
      })
      .catch((error) => {
        dispatch(SellListFailed(error));
      });
  };
}
export function RemoveOrder(id) {
  const request = axios.post(`order/removeOrder`, {
    orderId: id,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetSellList(1));
        dispatch(GetListCount());
      })
      .catch((error) => {
        dispatch(SellListFailed(error));
      });
  };
}
export function SubmitOrder(
  serviceId,
  customerId,
  firstlat,
  firstlong,
  address,
  lastlat,
  lastlong,
  lastAddress,
  stoptime
) {
  const request = axios.post(`request/submitRequest`, {
    serviceId: serviceId,
    customerId: customerId,
    originLat: firstlat,
    originLng: firstlong.toString(),
    originDes: address,
    destinationLat: lastlat,
    destinationLng: lastlong.toString(),
    destinationDes: lastAddress,
    stopTime: stoptime.toString(),
    reqTime: "0",
    description: "ثبت+شده+توسط+ادمین",
    discountCode: "0",
    paymentNumber: "1",
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(AddOrder(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function GetCustomerOrders(orderId) {
  const request = axios.post(`order/getOrderDetial`, {
    orderId: orderId,
  });
  return (dispatch) => {
    dispatch(SellListLoading());
    request
      .then((response) => {
        dispatch(SellListInfoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(SellListInfoFailed(error));
      });
  };
}
