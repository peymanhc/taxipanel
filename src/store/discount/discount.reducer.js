import * as actions from "./discount.action";

const initialState = {
  data: null,
  error: "",
  msg: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DISCOUNT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.DISCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.DISCOUNT_MSG:
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
