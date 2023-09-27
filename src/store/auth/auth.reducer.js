import * as actions from "./auth.action";

const initialState = {
  data: [],
  error: "",
  profile: null,
  loading: false,
  msg: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.USER_LOGIN:
      return {
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.CHECK_SESSION:
      return {
        ...state,
        loading: false,
        profile: action.data,
      };
    case actions.CHANGE_PASS_MSG:
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
