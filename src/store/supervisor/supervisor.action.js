import axios from "../../shared/Shared";
export const SUPERVISOR_LOADING = "SUPERVISOR";
export const SUPERVISOR_SUCCESS = "SUPERVISOR SUCCESS ";
export const SUPERVISOR_FAILED = "SUPERVISOR FAILED";
export const ADDUSER_MSG = "ADDUSER_MSG";

export const SupervisorSuccess = (data) => {
  return {
    type: SUPERVISOR_SUCCESS,
    data,
  };
};
export const AddUserMsg = (data) => {
  return {
    type: ADDUSER_MSG,
    data,
  };
};
export const SupervisorFailed = (error) => {
  return {
    type: SUPERVISOR_FAILED,
    error,
  };
};
export const SupervisorLoading = () => {
  return {
    type: SUPERVISOR_LOADING,
  };
};
export function GetSupervisorList() {
  const request = axios.get(`user/getAllSupervisor`);
  return (dispatch) => {
    dispatch(SupervisorLoading());
    request
      .then((response) => {
        dispatch(SupervisorSuccess(response.data));
      })
      .catch((error) => {
        dispatch(SupervisorFailed(error));
      });
  };
}
export function AddSupervisor(name, mobile, password, active) {
  const request = axios.post(`user/supervisorRegister`, {
    displayName: name,
    mobile: mobile,
    password: password,
    active: active,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetSupervisorList());
        dispatch(AddUserMsg(response));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function removeSupervisor(ent_id, ent_userId) {
  const request = axios.post(`user/removeSupervisor`, {
    id: ent_id,
    sopervisorId: ent_userId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(AddUserMsg(response.data));
        dispatch(GetSupervisorList());
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
