import axios from "../../shared/Shared";
export const CLIENT_LOADING = "CLIENT";
export const CLIENT_SUCCESS = "CLIENT SUCCESS ";
export const CLIENT_FAILED = "CLIENT FAILED";
export const ROLE_LOADING = "ROLE";
export const ROLE_SUCCESS = "ROLE SUCCESS ";
export const ROLE_FAILED = "ROLE FAILED";
export const CLIENT_MSG = "CLIENT MSG";

export const ClientSuccess = (data) => {
  return {
    type: CLIENT_SUCCESS,
    data,
  };
};
export const ClientFailed = (error) => {
  return {
    type: CLIENT_FAILED,
    error,
  };
};
export const ClientLoading = () => {
  return {
    type: CLIENT_LOADING,
  };
};
export const RoleSuccess = (data) => {
  return {
    type: ROLE_SUCCESS,
    data,
  };
};
export const RoleFailed = (error) => {
  return {
    type: ROLE_FAILED,
    error,
  };
};
export const RoleLoading = () => {
  return {
    type: ROLE_LOADING,
  };
};
export const ClientMessage = (msg) => {
  return {
    type: CLIENT_MSG,
    msg: msg,
  };
};
export function GetClientList() {
  const request = axios.get(`user/getAllUser`);
  return (dispatch) => {
    dispatch(ClientLoading());
    request
      .then((response) => {
        dispatch(ClientSuccess(response.data));
      })
      .catch((error) => {
        dispatch(ClientFailed(error));
      });
  };
}
export function GetRole() {
  const request = axios.get(`role/getRole`);
  return (dispatch) => {
    dispatch(RoleLoading());
    request
      .then((response) => {
        dispatch(RoleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(RoleFailed(error));
      });
  };
}
export function RemoveUser(ent_id, ent_userId) {
  const request = axios.post(`user/removeUser`, {
    ent_id: ent_id,
    ent_userId: ent_userId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(ClientMessage(response.data));
        dispatch(GetClientList());
      })
      .catch((error) => {
        dispatch(ClientMessage(error));
      });
  };
}
export function AddUserAdmin(
  mobile,
  password,
  name,
  parent_code,
  active,
  address,
  fToken,
  role
) {
  const request = axios.post(`user/register`, {
    mobile: mobile,
    password: password,
    displayName: name,
    parent_code: parent_code,
    active: active,
    address: address,
    fToken: fToken,
    role: role,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(ClientMessage(response));
      })
      .catch((error) => {
        dispatch(ClientMessage(error));
      });
  };
}
