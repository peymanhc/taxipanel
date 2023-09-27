import axios from "../../shared/Shared";
export const PAY_SUCCESS = "PAY_SUCCESS ";
export const PAY_FAILED = "PAY_FAILED";

export const GETPAYMENT_LOADING = "GETPAYMENT_LOADING ";
export const GETPAYMENT_FAILED = "GETPAYMENT_FAILED";
export const GETPAYMENT_SUCCESS = "GETPAYMENT_SUCCESS ";
export const GETPAYMENT_All = "GETPAYMENT_All ";

export const PaySuccess = (data) => {
  return {
    type: PAY_SUCCESS,
    data,
  };
};
export const PayFailed = (error) => {
  return {
    type: PAY_FAILED,
    error,
  };
};
export const PayListLoading = () => {
  return {
    type: GETPAYMENT_LOADING,
  };
};

export const PayListSuccess = (data) => {
  return {
    type: GETPAYMENT_SUCCESS,
    data,
  };
};
export const PayListFailed = (error) => {
  return {
    type: GETPAYMENT_FAILED,
    error,
  };
};
export const GetAllpayList = (allpaylist) => {
  return {
    type: GETPAYMENT_All,
    allpaylist,
  };
};
export function SmsSubmitPayment(userId, amount) {
  const request = axios.post(`pay/smsPay`, {
    userId: userId,
    amount: amount,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(PaySuccess(response.data));
        window.open(response.data?.data[0]?.linkPay);
      })
      .catch((error) => {
        dispatch(PayFailed(error));
      });
  };
}

export function GetPaymentsLists(page, limit) {
  const request = axios.post(`pay/getPeyments`, {
    page: page,
    limit: 10,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(PayListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(PayListFailed(error));
      });
  };
}
export function GetAllPayments(page) {
  const request = axios.post(`pay/getPeyments`, {
    page: page,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetAllpayList(response.data));
      })
      .catch((error) => {
        dispatch(PayListFailed(error));
      });
  };
}
