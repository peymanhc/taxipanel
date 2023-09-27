import axios from "../../shared/Shared";
export const CLEANING_LIST_LOADING = "CLEANING_LIST LOADING";
export const CLEANING_LIST_SUCCESS = "CLEANING_LIST SUCCESS ";
export const CLEANING_LIST_FAILED = "CLEANING_LIST FAILED";
export const CLEANING_MSG = "CLEANING_MSG";

export const CleaningListSuccess = (data) => {
  return {
    type: CLEANING_LIST_SUCCESS,
    data,
  };
};
export const CleaningListFailed = (error) => {
  return {
    type: CLEANING_LIST_FAILED,
    error,
  };
};
export const CleaningListLoading = () => {
  return {
    type: CLEANING_LIST_LOADING,
  };
};
export const CleaningMsg = (msg) => {
  return {
    type: CLEANING_MSG,
    msg: msg,
  };
};

export function GetCleaningList(masterId) {
  const request = axios.post(`clearing/getSumClearing`, {
    masterId: masterId,
  });
  return (dispatch) => {
    dispatch(CleaningListLoading());
    request
      .then((response) => {
        dispatch(CleaningListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(CleaningListFailed(error));
      });
  };
}
export function SetCleaningCash(price, description, masterId) {
  const request = axios.post(`clearing/setClearing`, {
    price: price,
    description: description,
    masterId: masterId,
    type: "false",
  });
  return (dispatch) => {
    dispatch(CleaningListLoading());
    request
      .then((response) => {
        dispatch(CleaningMsg(response));
      })
      .catch((error) => {
        dispatch(CleaningMsg(error));
      });
  };
}
