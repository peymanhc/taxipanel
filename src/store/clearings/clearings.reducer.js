import * as actions from "./clearings.action";

const initialState = {
  data: null,
  error: "",
  msg: "",
  loading: false,
  sumClearing:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEARINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.CLEARINGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.CLEARINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.SUM_CLEARINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SUM_CLEARINGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.SUM_CLEARINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        sumClearing: action.data,
        error: "",
      };
    case actions.CLEARINGS_MSG:
      return {
        ...state,
        loading: false,
        msg:action.msg
      };
    default:
      return state;
  }
};

export default reducer;
