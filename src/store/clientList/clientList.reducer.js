import * as actions from "./clientList.action";

const initialState = {
  data: null,
  roles:null,
  error: "",
  msg: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLIENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.CLIENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.ROLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.data,
        error: "",
      };
    case actions.ROLE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.CLIENT_MSG:
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
