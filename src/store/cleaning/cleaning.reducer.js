import * as actions from "./cleaning.action";

const initialState = {
  data: null,
  error: "",
  msg: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEANING_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.CLEANING_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.CLEANING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.CLEANING_MSG:
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
