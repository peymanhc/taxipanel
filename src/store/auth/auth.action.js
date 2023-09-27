import axios from "../../shared/Shared";

export const USER_LOGIN = "USER LOGIN";
export const USER_LOADING = "USER LOADING";
export const CHECK_SESSION = "CHECK SESSION";
export const USER_FAIL = "USER FAIL";
export const LOGOUT = "LOGOUT";
export const CHANGE_PASS_MSG = "CHANGE_PASS_MSG";

export const LoginSuccess = (data) => {
  return {
    type: USER_LOGIN,
    data,
  };
};
export const LoginFailed = (error) => {
  return {
    type: USER_FAIL,
    error,
  };
};
export const Profile = (data) => {
  return {
    type: CHECK_SESSION,
    data,
  };
};
export const ChangePass = (data) => {
  return {
    type: CHANGE_PASS_MSG,
    data,
  };
};
export const getProfileLoading = () => {
  return {
    type: USER_LOADING,
  };
};
export function CheckSession() {
  const Token = localStorage.getItem("token");
  const request = axios.post(`user/checkSession`, {
    token: Token,
  });
  return (dispatch) => {
    dispatch(getProfileLoading());
    request
      .then((response) => {
        dispatch(Profile(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function DoLogin(mobile, password) {
  const request = axios.post(`user/userLogin`, {
    mobile: mobile,
    password: password,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(LoginSuccess(response.data));
        console.log(response.data)
        localStorage.setItem("token", response.data.data.webToken);
        dispatch(CheckSession());
      })
      .catch((error) => {
        dispatch(LoginFailed(error.message));
        console.log(error);
      });
  };
}
export function ResetPassword(mobile, password) {
  const request = axios.post(`user/forgetPassword`, {
    ent_mobile: mobile,
    ent_newpass: password,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(ChangePass(response.data));
      })
      .catch((error) => {
        dispatch(ChangePass(error));
      });
  };
}
export function DoLogout() {
  localStorage.removeItem("token");
  window.location.replace("/LoginPage");
}
