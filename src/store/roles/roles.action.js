import axios from "../../shared/Shared";
export const ROLTES_LOADING = "ROLTES";
export const ROLTES_SUCCESS = "ROLTES SUCCESS ";
export const ROLTES_FAILED = "ROLTES FAILED";
export const ADDUSER_MSG = "ADDUSER_MSG";

export const RolesSuccess = (data) => {
  return {
    type: ROLTES_SUCCESS,
    data,
  };
};
export const AddUserMsg = (data) => {
  return {
    type: ADDUSER_MSG,
    data,
  };
};
export const RolesFailed = (error) => {
  return {
    type: ROLTES_FAILED,
    error,
  };
};
export const RolesLoading = () => {
  return {
    type: ROLTES_LOADING,
  };
};
export function GetRolesList() {
  const request = axios.get(`role/getRole`);
  return (dispatch) => {
    dispatch(RolesLoading());
    request
      .then((response) => {
        dispatch(RolesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(RolesFailed(error));
      });
  };
}
export function AddRoles(data) {
  const request = axios.post(`role/addRole`, {
    title: data.title,
    accessLevel: ["21"],
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetRolesList());
        dispatch(AddUserMsg(response));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function removeRoles(roleId) {
  const request = axios.post(`role/removeRole`, {
    roleId: roleId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(AddUserMsg(response.data));
        dispatch(GetRolesList());
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
