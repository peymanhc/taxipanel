import * as actions from "./sellList.action";

const initialState = {
  data: null,
  count: null,
  info:null,
  error: "",
  msg: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELL_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.LIST_COUNT:
      return {
        ...state,
        loading: false,
        count: action.data,
      };
    case actions.SELL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.SELL_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.SELL_LIST_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.data,
        error: "",
      };
    case actions.SELL_LIST_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.ADD_ORDER:
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
