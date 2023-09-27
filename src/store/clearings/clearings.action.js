import axios from "../../shared/Shared";
export const CLEARINGS_LOADING = "CLEARINGS LOADING";
export const CLEARINGS_SUCCESS = "CLEARINGS SUCCESS ";
export const CLEARINGS_FAILED = "CLEARINGS FAILED";
export const SUM_CLEARINGS_LOADING = "SUM_CLEARINGS LOADING";
export const SUM_CLEARINGS_SUCCESS = "SUM_CLEARINGS SUCCESS ";
export const SUM_CLEARINGS_FAILED = "SUM_CLEARINGS FAILED";
export const CLEARINGS_MSG = "CLEANING_MSG";

export const ClearingsSuccess = (data) => {
  return {
    type: CLEARINGS_SUCCESS,
    data,
  };
};
export const ClearingsFailed = (error) => {
  return {
    type: CLEARINGS_FAILED,
    error,
  };
};
export const ClearingsLoading = () => {
  return {
    type: SUM_CLEARINGS_LOADING,
  };
};
export const SumClearingsSuccess = (data) => {
  return {
    type: SUM_CLEARINGS_SUCCESS,
    data,
  };
};
export const SumClearingsFailed = (error) => {
  return {
    type: SUM_CLEARINGS_FAILED,
    error,
  };
};
export const SumClearingsLoading = () => {
  return {
    type: CLEARINGS_LOADING,
  };
};
export const CleaningMsg = (msg) => {
  return {
    type: CLEARINGS_MSG,
    msg: msg,
  };
};

export function GetClearings() {
  const request = axios.get(`clearing/getClearings`);
  return (dispatch) => {
    dispatch(ClearingsLoading());
    request
      .then((response) => {
        dispatch(ClearingsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(ClearingsFailed(error));
      });
  };
}
export function GetClearingTravel(masterId) {
  const request = axios.post(`order/sumTravel`, { masterId: masterId });
  return (dispatch) => {
    dispatch(SumClearingsLoading());
    request
      .then((response) => {
        dispatch(SumClearingsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(SumClearingsFailed(error));
      });
  };
}
