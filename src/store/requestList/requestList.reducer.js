import * as actions from "./requestList.action";

const initialState = {
  data: null,
  count: null,
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.REQUEST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.REQUEST_LIST_COUNT:
      return {
        ...state,
        loading: false,
        count: action.data,
      };
    case actions.REQUEST_LIST_FAILED:
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
