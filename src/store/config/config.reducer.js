import * as actions from "./config.action";

const initialState = {
  users:null,
  error: "",
  msg:"",
  loading: false,
  imageurl:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USERS_CONFIG_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.USERS_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.data,
        error: "",
      };
    case actions.USERS_CONFIG_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.MSG_RES:
      return {
        ...state,
        loading: false,
        msg: action.msg,
      };
    case actions.UPLOADIMAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
      case actions.UPLOADIMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          imageurl: action.data,
          error: "",
        };
      case actions.UPLOADIMAGE_FAILED:
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
