import axios from "../../shared/Shared";
export const USERS_CONFIG_LOADING = "USERS CONFIG";
export const USERS_CONFIG_SUCCESS = "USERS CONFIG SUCCESS ";
export const USERS_CONFIG_FAILED = "USERS CONFIG FAILED";
export const UPLOADIMAGE_SUCCESS = "UPLOADIMAGE_SUCCESS ";
export const UPLOADIMAGE_LOADING = "UPLOADIMAGE_LOADING ";
export const UPLOADIMAGE_FAILED = "UPLOADIMAGE_FAILED";
export const MSG_RES = "MSG_RES";

export const UsersSuccess = (data) => {
  return {
    type: USERS_CONFIG_SUCCESS,
    data,
  };
};
export const UsersFailed = (error) => {
  return {
    type: USERS_CONFIG_FAILED,
    error,
  };
};
export const UploadImageSuccess = (data) => {
  return {
    type: UPLOADIMAGE_SUCCESS,
    data,
  };
};
export const UploadImageFailed = (error) => {
  return {
    type: UPLOADIMAGE_FAILED,
    error,
  };
};
export const UploadImageLoading = () => {
  return {
    type: UPLOADIMAGE_LOADING,
  };
};
export const UsersLoading = (error) => {
  return {
    type: USERS_CONFIG_LOADING,
  };
};
export const ConfigMSG = (msg) => {
  return {
    type: MSG_RES,
    msg: msg,
  };
};

export function GetUsers() {
  const Token = localStorage.getItem("token");
  const request = axios.get(`config/appConfiguration`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
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
export function SendNoti(title, info, content, token) {
  const request = axios.post(`user/sendNotification`, {
    ent_title: title,
    ent_info: info,
    ent_content: content,
    ent_token_user: token,
  });
  return (dispatch) => {
    dispatch(UsersLoading());
    request
      .then((response) => {
        dispatch(UsersFailed(response.data));
      })
      .catch((error) => {
        dispatch(UsersFailed(error));
      });
  };
}
export function UploadImage(image) {
  const data = new FormData();
  data.append("image", image !== undefined ? image[0] : "");
  data.append("image", image !== undefined ? image[0].name : "");
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const request = axios.post("config/imageUpload", data, config);
  return (dispatch) => {
    dispatch(UploadImageLoading())
    request
      .then((response) => {
        dispatch(UploadImageSuccess(response));
      })
      .catch((err) => {
        dispatch(UploadImageFailed(err));
      });
  };
}
export function AddConfig(
  aboutus,
  contact,
  versionCustomer,
  mandetoryCustomer,
  versionDriver,
  mandetoryDriver,
  telegramLink,
  instaLink,
  aparatLink,
  youtubeLink
) {
  const request = axios.post(`config/addConfig`, {
    aboutUs: aboutus,
    callNumber: contact,
    versionCustomer: versionCustomer,
    mandetoryCustomer: mandetoryCustomer,
    versionDriver: versionDriver,
    mandetoryDriver: mandetoryDriver,
    telegramLink: telegramLink,
    instaLink: instaLink,
    aparatLink: aparatLink,
    youtubeLink: youtubeLink,
  });
  return (dispatch) => {
    dispatch(UsersLoading());
    request
      .then((response) => {
        dispatch(GetUsers());
        dispatch(ConfigMSG(response));
      })
      .catch((error) => {
        dispatch(ConfigMSG(error));
      });
  };
}
