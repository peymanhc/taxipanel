import * as actions from "./declaration.action";

const initialState = {
  data: null,
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DECLARATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.DECLARATION_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: "",
      };
    case actions.DECLARATION_FAILED:
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