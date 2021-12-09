import React, { useReducer } from "react";

import { baseURL } from "../../utils/baseURL";

import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  LOAD_ADMIN_FAIL,
  LOG_OUT,
} from "../constants";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticatedLogin: false,
    admin: null,
    errorLogin: null,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadAdmin = async () => {
    setAuthToken(localStorage.token);

    try {
      dispatch({
        type: LOAD_ADMIN_REQUEST,
      });

      const { data } = await axios.get(`${baseURL}/login`);

      dispatch({
        type: LOAD_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({ type: LOAD_ADMIN_FAIL });
    }
  };

  const login = async (loginData) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const { data } = await axios.post(`${baseURL}/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      loadAdmin();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOG_OUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticatedLogin: state.isAuthenticatedLogin,
        isLoading: state.isLoading,
        admin: state.admin,
        errorLogin: state.errorLogin,
        loadAdmin,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
