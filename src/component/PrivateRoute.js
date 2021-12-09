import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// Context
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticatedLogin, isLoading } = authContext;

  // history.push("/")
  // <Redirect to="/" />
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticatedLogin && !isLoading ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
