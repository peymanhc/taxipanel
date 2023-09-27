import axios from "../../shared/Shared";

export const SERVICES_LOADING = "SERVICES LOADING";
export const SERVICES_SUCCESS = "SERVICES SUCCESS ";
export const SERVICES_FAILED = "SERVICES FAILED";

export const ServicesSuccess = (data) => {
  return {
    type: SERVICES_SUCCESS,
    data,
  };
};
export const ServicesFailed = (error) => {
  return {
    type: SERVICES_FAILED,
    error,
  };
};
export const ServicesLoading = (error) => {
  return {
    type: SERVICES_LOADING,
  };
};

export function GetServices() {
  const Token = localStorage.getItem("token");
  const request = axios.get(`service/getServices`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  return (dispatch) => {
    dispatch(ServicesLoading());
    request
      .then((response) => {
        dispatch(ServicesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(ServicesFailed(error));
      });
  };
}
export function PostServices(data, pictures, citydata) {
  const request = axios.post(`service/addService`, {
    title: data.title,
    description: data.description,
    priceLess: data.priceLess,
    priceKil: data.priceKil,
    priceMin: data.priceMin,
    priceInter: data.priceInter,
    codeService: data.codeService,
    cityId: citydata,
    image: pictures,
    is_active: data.is_active,
    komision: data.komision,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(ServicesFailed(response));
      })
      .catch((error) => {
        dispatch(ServicesFailed(error));
      });
  };
}
export function UpdateServices(data, citydata, id) {
  const request = axios.post(`service/updateService`, {
    title: data.title,
    description: data.description,
    priceLess: data.priceLess,
    priceKil: data.priceKil,
    priceMin: data.priceMin,
    priceInter: data.priceInter,
    codeService: data.codeService,
    image: data.pic, 
    is_active: data.is_active,
    komision: data.komision,
    cityId: citydata,
    id: id,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(ServicesFailed(response));
      })
      .catch((error) => {
        dispatch(ServicesFailed(error));
      });
  };
}
export function RemoveServices(id) {
  const request = axios.post(`service/removeService`, {
    serviceId: id,
  });
  return (dispatch) => {
    request
      .then((response) => {
        console.log(response);
        dispatch(GetServices());
      })
      .catch((error) => {
        console.log("err");
      });
  };
}
