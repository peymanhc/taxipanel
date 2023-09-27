import * as actions from "./driver.action";

const initialState = {
  data: null,
  error: "",
  msg: "",
  loading: false,
  driverinfo: null,
  masterDetail: null,
  masterSumtravel: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DRIVER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.DRIVER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.MASTER_SUM_TRAVEL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.MASTER_SUM_TRAVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        masterSumtravel: action.data,
        error: "",
      };
    case actions.MASTER_SUM_TRAVEL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.DRIVERSINFO_SUCCESS:
      return {
        ...state,
        loading: false,
        driverinfo: action.data,
        error: "",
      };
    case actions.MASTERDETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        masterDetail: action.data,
        error: "",
      };
    case actions.DRIVERSINFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.ADDUSER_MSG:
      return {
        ...state,
        loading: false,
        msg: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
