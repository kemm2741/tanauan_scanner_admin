import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  LOAD_ADMIN_FAIL,
  LOG_OUT,
} from "../constants";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        admin: action.payload.admin,
        isAuthenticatedLogin: true,
        token: action.payload.token,
        errorLogin: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        token: null,
        isAuthenticatedLogin: false,
        admin: null,
        errorLogin: action.payload,
      };
    case LOAD_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        token: null,
        isAuthenticatedLogin: false,
        admin: null,
        errorLogin: null,
      };
    case LOAD_ADMIN_SUCCESS:
      return {
        ...state,
        isAuthenticatedLogin: true,
        isLoading: false,
        admin: action.payload,
        errorLogin: null,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticatedLogin: false,
        admin: null,
        errorLogin: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
