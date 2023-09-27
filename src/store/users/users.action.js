import axios from "../../shared/Shared";
export const USERS_LOADING = "USERS";
export const USERS_SUCCESS = "USERS SUCCESS ";
export const USERS_FAILED = "USERS FAILED";
export const ADDUSER_MSG = "ADDUSER_MSG";
export const USER = "USER";
export const CHILD_USER = "CHILD_USER";

export const UsersSuccess = (data) => {
  return {
    type: USERS_SUCCESS,
    data,
  };
};
export const AddUserMsg = (data) => {
  return {
    type: ADDUSER_MSG,
    data,
  };
};
export const UsersFailed = (error) => {
  return {
    type: USERS_FAILED,
    error,
  };
};
export const UserChild = (data) => {
  return {
    type: USER,
    data,
  };
};
export const MasterChild = (data) => {
  return {
    type: CHILD_USER,
    data,
  };
};
export const UsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
export function SearchUsers(search) {
  const request = axios.post(`user/searchUser`, {
    ent_text: search,
  });
  return (dispatch) => {
    dispatch(UsersLoading());
    request
      .then((response) => {
        dispatch(UsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(UsersFailed(error));
      });
  };
}
export function AddUser(name, mobile, password) {
  const request = axios.post(`user/register`, {
    displayName: name,
    mobile: mobile,
    password: password,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(SearchUsers("0"));
        dispatch(AddUserMsg(response));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function getUserInfo(userId) {
  const request = axios.post(`user/getUserInfo`, {
    userId: userId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(UserChild(response.data));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function ChildMaster(pcode) {
  const request = axios.post(`user/getChildUser`, {
    pcode: pcode,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(MasterChild(response.data));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function CustomerOrders(customerId) {
  const request = axios.post(`order/getCustomerOrders`, {
    customerId: customerId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(MasterChild(response.data));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
