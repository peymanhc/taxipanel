import axios from "../../shared/Shared";

export const DECLARATION_LOADING = "DECLARATION LOADING";
export const DECLARATION_SUCCESS = "DECLARATION SUCCESS ";
export const DECLARATION_FAILED = "DECLARATION FAILED";

export const DeclarationSuccess = (data) => {
  return {
    type: DECLARATION_SUCCESS,
    data,
  };
};
export const DeclarationFailed = (error) => {
  return {
    type: DECLARATION_FAILED,
    error,
  };
};
export const DeclarationLoading = (error) => {
  return {
    type: DECLARATION_LOADING,
  };
};

export function GetDeclaration() {
  const request = axios.post(`declaration/getDeclaration`, { type: "0" });
  return (dispatch) => {
    dispatch(DeclarationLoading());
    request
      .then((response) => {
        dispatch(DeclarationSuccess(response.data));
      })
      .catch((error) => {
        dispatch(DeclarationFailed(error));
      });
  };
}
export function RemoveDeclaration(id) {
  const request = axios.post(`declaration/removeDeclaration`, { decId: id });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetDeclaration());
      })
      .catch((error) => {
        dispatch(DeclarationFailed(error));
      });
  };
}
export function AddDeclaration(title, description, type) {
  const request = axios.post(`declaration/addDeclaration`, {
    title: title,
    description: description,
    type: type,
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(GetDeclaration());
      })
      .catch((error) => {
        dispatch(DeclarationFailed(error));
      });
  };
}
