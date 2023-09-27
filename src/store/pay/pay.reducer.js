import * as actions from "./pay.action";

const initialState = {
  data: null,
  error: "",
  loading: false,
  alllist: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PAY_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: "",
      };
    case actions.PAY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.GETPAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.GETPAYMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.GETPAYMENT_All:
      return {
        ...state,
        loading: false,
        alllist: action.allpaylist,
      };
    case actions.GETPAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
