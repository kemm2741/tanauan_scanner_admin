import React, { useState, useEffect, useContext } from "react";

// ! Base URL
import { baseURL } from "../../utils/baseURL";

// React Router Dom
import { useHistory } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

// Sweet Alert
import Swal from "sweetalert2";
import Alert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Material UI Icon
import { AiOutlineQrcode } from "react-icons/ai";

// Actions
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    width: "100%",
    maxWidth: "500px",
    marginInline: "auto",
    marginTop: "-20px",
  },
  qrLogo: {
    fontSize: "150px",
    margin: 0,
    padding: 0,
  },
  formInput: {
    height: "50px",
    marginBottom: "20px",
  },
  formText: {
    marginBottom: "5px",
  },
  formBtn: {
    padding: "20px 0",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: "40px",
    outline: "none",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    backgroundColor: "#0A66C2",
    cursor: "pointer",
    marginTop: "5px",
  },
  qrDiv: {
    display: "flex",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    marginInline: "auto",
    marginTop: "20px",
    padding: " 30px 20px 40px 20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  errorAlert: {
    marginBottom: theme.spacing(2),
  },
  loadingContainer: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
  },
  loginTitle: {
    marginBottom: "10px",
    marginTop: "5px",
  },
  forgotPasswordContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
}));

const Login = () => {
  let history = useHistory();

  const authContext = useContext(AuthContext);

  const { isAuthenticatedLogin, isLoading, errorLogin, login } = authContext;

  const classes = useStyles();
  const initialState = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginData.email === "" && loginData.password === "") {
      return Swal.fire(
        "Error Login",
        "Please provide valid email and password",
        "error"
      );
    }

    if (loginData.email === "") {
      return Swal.fire("Error Login", "Email must not be empty!", "error");
    }

    if (loginData.password === "") {
      return Swal.fire("Error Login", "Password must not be empty", "error");
    }

    // No Error Input Login
    login(loginData);

    // Reset Input
    setLoginData(initialState);
  };

  useEffect(() => {
    if (isAuthenticatedLogin) {
      Swal.fire("Success Login", "Welcome to DashBoard", "success");
      history.push("/");
    }
  }, [isAuthenticatedLogin]);

  return (
    <div className={classes.loginContainer}>
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={classes.qrDiv}>
            <AiOutlineQrcode className={classes.qrLogo} />
          </div>
          <div>
            <Typography
              className={classes.loginTitle}
              variant="h4"
              align="center"
            >
              Tanauan QR Code Scanner
            </Typography>
            <Typography color="textSecondary" paragraph align="center">
              Fast, Hassle Free, Easy To Create, Tanauan QR Code
            </Typography>
          </div>
          <form className={classes.formContainer} noValidate autoComplete="off">
            <div className={classes.formText}>
              <Typography variant="h4">Sign in</Typography>
              <Typography color="textSecondary" paragraph>
                Sign in as Admin at Tanauan QR Code Scanner
              </Typography>
            </div>
            {errorLogin && (
              <Alert className={classes.errorAlert} severity="error">
                {errorLogin}
              </Alert>
            )}
            <TextField
              className={classes.formInput}
              onChange={handleOnChange}
              name="email"
              type="email"
              label="Admin Email"
              value={loginData.email}
              variant="outlined"
            />
            <TextField
              className={classes.formInput}
              onChange={handleOnChange}
              name="password"
              type="password"
              value={loginData.password}
              label="Password"
              variant="outlined"
            />
            <input
              onClick={handleLogin}
              className={classes.formBtn}
              type="submit"
              value="Login"
            />

            <Grid
              onClick={async () => {
                const { value: email } = await Swal.fire({
                  title: "Input email address",
                  input: "email",
                  inputLabel: "Your email address",
                  inputPlaceholder: "Enter your email address",
                });

                if (email) {
                  Swal.fire(`Entered email: ${email}`);
                }
              }}
              className={classes.forgotPasswordContainer}
              item
            >
              <Link href="#" variant="body2">
                {"Reset Password?"}
              </Link>
            </Grid>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
