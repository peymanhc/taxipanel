import axios from "../../shared/Shared";
export const REQUEST_LIST_LOADING = "REQUEST_LIST CONFIG";
export const REQUEST_LIST_SUCCESS = "REQUEST_LIST CONFIG SUCCESS ";
export const REQUEST_LIST_FAILED = "REQUEST_LIST CONFIG FAILED";
export const REQUEST_LIST_COUNT = "REQUEST_LIST_COUNT";

export const RequestListSuccess = (data) => {
  return {
    type: REQUEST_LIST_SUCCESS,
    data,
  };
};
export const RequestListFailed = (error) => {
  return {
    type: REQUEST_LIST_FAILED,
    error,
  };
};
export const RequestListLoading = (error) => {
  return {
    type: REQUEST_LIST_LOADING,
  };
};
export const ListCount = (data) => {
  return {
    type: REQUEST_LIST_COUNT,
    data,
  };
};

export function GetRequestList(page) {
  const request = axios.post(`request/getRequest`, {
    page: page,
    limit: 10,
  });
  return (dispatch) => {
    dispatch(RequestListLoading());
    request
      .then((response) => {
        dispatch(RequestListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(RequestListFailed(error));
      });
  };
}
export function RequestsListCount() {
  const request = axios.post(`request/getRequest`);
  return (dispatch) => {
    dispatch(RequestListLoading());
    request
      .then((response) => {
        dispatch(ListCount(response.data));
      })
      .catch((error) => {
        dispatch(RequestListFailed(error));
      });
  };
}
export function RemoveRequest(id) {
  const request = axios.post(`request/removeRequest`, {
    reqId: id,
  });
  return (dispatch) => {
    dispatch(RequestListLoading());
    request
      .then((response) => {
        dispatch(GetRequestList(1));
        dispatch(RequestsListCount());
      })
      .catch((error) => {
        dispatch(RequestListFailed(error));
      });
  };
}
