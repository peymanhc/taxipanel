import axios from "../../shared/Shared";

export const CITIES_LOADING = "CITIES LOADING";
export const CITIES_SUCCESS = "CITIES SUCCESS ";
export const CITIES_FAILED = "CITIES FAILED";

export const CitiesSuccess = (data) => {
  return {
    type: CITIES_SUCCESS,
    data,
  };
};
export const CitiesFailed = (error) => {
  return {
    type: CITIES_FAILED,
    error,
  };
};
export const CitiesLoading = (error) => {
  return {
    type: CITIES_LOADING,
  };
};

export function GetCities() {
  const request = axios.get(`city/getCity`);
  return (dispatch) => {
    dispatch(CitiesLoading());
    request
      .then((response) => {
        dispatch(CitiesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(CitiesFailed(error));
      });
  };
}
export function RemoveCity(id) {
  const request = axios.post(`city/removeCity`, { cityId: id });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetCities());
      })
      .catch((error) => {
        dispatch(CitiesFailed(error));
      });
  };
}
export function AddCity(name, lat, lng) {
  const request = axios.post(`city/addCity`, {
    name: name,
    latitude: lat,
    longitude: lng,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetCities());
      })
      .catch((error) => {
        dispatch(CitiesFailed(error));
      });
  };
}
