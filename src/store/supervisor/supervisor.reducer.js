import * as actions from "./supervisor.action";

const initialState = {
  data:null,
  error: "",
  msg:"",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SUPERVISOR_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SUPERVISOR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.SUPERVISOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.ADDUSER_MSG:
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
