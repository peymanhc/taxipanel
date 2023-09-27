import * as actions from "./service.action";

const initialState = {
  services: null,
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SERVICES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SERVICES_SUCCESS:
      return {
        loading: false,
        services: action.data,
        error: "",
      };
    case actions.SERVICES_FAILED:
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
