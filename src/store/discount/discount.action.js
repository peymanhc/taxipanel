import axios from "../../shared/Shared";
export const DISCOUNT_LOADING = "DISCOUNT_LOADING";
export const DISCOUNT_SUCCESS = "DISCOUNT_SUCCESS";
export const DISCOUNT_FAILED = "DISCOUNT_FAILED";
export const DISCOUNT_MSG = "DISCOUNT_MSG";

export const GetDiscountSuccess = (data) => {
  return {
    type: DISCOUNT_SUCCESS,
    data,
  };
};
export const GetDiscountFailed = (error) => {
  return {
    type: DISCOUNT_FAILED,
    error,
  };
};
export const GetDiscountLoading = () => {
  return {
    type: DISCOUNT_LOADING,
  };
};
export const DiscountMsg = (data) => {
  return {
    type: DISCOUNT_MSG,
    data: data,
  };
};

export function GetDiscountList() {
  const request = axios.get(`discount/getDiscounts`, {});
  return (dispatch) => {
    dispatch(GetDiscountLoading());
    request
      .then((response) => {
        dispatch(GetDiscountSuccess(response.data));
      })
      .catch((error) => {
        dispatch(GetDiscountFailed(error));
      });
  };
}

export function RemoveDiscount(discountId) {
  const request = axios.post(`discount/removeDiscount`, {
    discountId: discountId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetDiscountLoading());
        dispatch(GetDiscountList());
        dispatch(DiscountMsg(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function AddDiscount(
  discountCode,
  maximumPrice,
  percentCode,
  expireAt,
  serviceId,
  userMobile
) {
  const request = axios.post(`discount/addDiscount`, {
    discountCode: discountCode,
    maximumPrice: maximumPrice,
    percentCode: percentCode,
    expireAt: expireAt,
    serviceId: serviceId,
    userMobile: userMobile,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetDiscountLoading());
        dispatch(GetDiscountList());
        dispatch(DiscountMsg(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
