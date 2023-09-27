import * as actions from "./users.action";

const initialState = {
  users: null,
  error: "",
  msg: "",
  loading: false,
  user: null,
  MasterChild:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.USER:
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    case actions.USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.data,
        error: "",
      };
    case actions.CHILD_USER:
      return {
        ...state,
        loading: false,
        MasterChild: action.data,
      };
    case actions.USERS_FAILED:
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
