import * as actions from "./city.action";

const initialState = {
  cities: null,
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CITIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.CITIES_SUCCESS:
      return {
        loading: false,
        cities: action.data,
        error: "",
      };
    case actions.CITIES_FAILED:
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
