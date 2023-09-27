import * as actions from "./serviceInfo.action";

const initialState = {
  data: null,
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SERVICE_INFO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SERVICE_INFO_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.SERVICE_INFO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
