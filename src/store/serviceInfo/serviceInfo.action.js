import axios from "../../shared/Shared";
export const SERVICE_INFO_LOADING = "SERVICE INFO";
export const SERVICE_INFO_SUCCESS = "SERVICE INFO SUCCESS ";
export const SERVICE_INFO_FAILED = "SERVICE INFO FAILED";

export const InfoSuccess = (data) => {
  return {
    type: SERVICE_INFO_SUCCESS,
    data,
  };
};
export const InfoFailed = (error) => {
  return {
    type: SERVICE_INFO_FAILED,
    error,
  };
};
export const InfoLoading = (error) => {
  return {
    type: SERVICE_INFO_LOADING,
  };
};

export function GetServiceInfo(serviceId) {
  const request = axios.post(`service/getService`, {
    serviceId: serviceId,
  });
  return (dispatch) => {
    dispatch(InfoLoading());
    request
      .then((response) => {
        dispatch(InfoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(InfoFailed(error));
      });
  };
}
