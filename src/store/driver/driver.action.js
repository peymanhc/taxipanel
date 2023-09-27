import axios from "../../shared/Shared";
export const DRIVER_LOADING = "DRIVER";
export const DRIVER_SUCCESS = "DRIVER SUCCESS ";
export const DRIVER_FAILED = "DRIVER FAILED";
export const MASTER_SUM_TRAVEL_LOADING = "MASTER_SUM_TRAVEL";
export const MASTER_SUM_TRAVEL_SUCCESS = "MASTER_SUM_TRAVEL SUCCESS ";
export const MASTER_SUM_TRAVEL_FAILED = "MASTER_SUM_TRAVEL FAILED";
export const DRIVERSINFO_SUCCESS = "DRIVERSINFO SUCCESS ";
export const DRIVERSINFO_FAILED = "DRIVERSINFO FAILED";
export const MASTERDETAIL_SUCCESS = "MASTERDETAIL SUCCESS ";
export const ADDUSER_MSG = "ADDUSER_MSG";

export const DriverSuccess = (data) => {
  return {
    type: DRIVER_SUCCESS,
    data,
  };
};
export const AddUserMsg = (data) => {
  return {
    type: ADDUSER_MSG,
    data,
  };
};
export const DriverFailed = (error) => {
  return {
    type: DRIVER_FAILED,
    error,
  };
};
export const DriverLoading = () => {
  return {
    type: DRIVER_LOADING,
  };
};
export const DriverInfoFailed = (error) => {
  return {
    type: DRIVERSINFO_FAILED,
    error,
  };
};
export const DriverInfoSuccess = (data) => {
  return {
    type: DRIVERSINFO_SUCCESS,
    data,
  };
};
export const MasterdetailSuccess = (data) => {
  return {
    type: MASTERDETAIL_SUCCESS,
    data,
  };
};
export const MasterSumTravelLoading = (data) => {
  return {
    type: MASTER_SUM_TRAVEL_LOADING,
  };
};
export const MasterSumTravelSuccess = (data) => {
  return {
    type: MASTER_SUM_TRAVEL_SUCCESS,
    data,
  };
};
export const MasterSumTravelFailed = (error) => {
  return {
    type: MASTER_SUM_TRAVEL_FAILED,
    error,
  };
};
export function GetDriverList() {
  const request = axios.get(`master/getMasters`);
  return (dispatch) => {
    dispatch(DriverLoading());
    request
      .then((response) => {
        dispatch(DriverSuccess(response.data));
      })
      .catch((error) => {
        dispatch(DriverFailed(error));
      });
  };
}
export function GetMasterInfoWorked() {
  const request = axios.post(`master/getMasterInfoWorked`, { serviceId: "0" });
  return (dispatch) => {
    dispatch(DriverLoading());
    request
      .then((response) => {
        dispatch(DriverInfoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(DriverInfoFailed(error));
      });
  };
}
export function GetMasterSumTravel(masterId) {
  const request = axios.post(`order/masterSumTravel`, { masterId: masterId });
  return (dispatch) => {
    dispatch(MasterSumTravelLoading());
    request
      .then((response) => {
        dispatch(MasterSumTravelSuccess(response.data));
      })
      .catch((error) => {
        dispatch(MasterSumTravelFailed(error));
      });
  };
}
export function AddDriver(data, service, cartType, oilType, dates, pictures) {
  const request = axios.post(`master/addMaster`, {
    displayName: data.name,
    mobile: data.mobile,
    phone: data.phone,
    serviceId: service,
    birthday: dates.birthday,
    nid: data.codemeli,
    pass: data.password,
    address: data.address,
    description: data.description,
    active: data.active,
    carName: data.carname,
    carColor: data.carColor,
    carDate: dates.carDate,
    carType: cartType,
    oilType: oilType,
    iranPelak: data.iran,
    plaktree: data.seadad,
    plaktwo: data.doadad,
    plakCharacter: data.harf,
    bimeEnd: dates.bimeEnd,
    certificateEnd: dates.certificateEnd,
    parentCode: data.parentCode,
    picProfile: pictures.picProfile,
    picCertificate: pictures.picCertificate,
    picCarKart: pictures.picCarKart,
    picBime: pictures.picBime,
    picAvarez: pictures.picAvarez,
    picTaxiCertificate: "picTaxiCertificate",
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetDriverList());
        dispatch(AddUserMsg(response));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function MasterDetailInfo(masterId) {
  const request = axios.post(`master/getMaster`, {
    masterId: masterId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(MasterdetailSuccess(response.data));
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
export function removeDriver(masterId) {
  const request = axios.post(`master/removeMaster`, {
    masterId: masterId,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(AddUserMsg(response.data));
        dispatch(GetDriverList());
      })
      .catch((error) => {
        dispatch(AddUserMsg(error));
      });
  };
}
