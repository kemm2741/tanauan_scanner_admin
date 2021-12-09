import React, { useState, useEffect } from "react";

// ! Baseurl
import { baseURL } from "../utils/baseURL";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import axios
import axios from "axios";

// Material Table
import MaterialTable from "material-table";

// SweetAlert
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(3),
  },
}));

const Admins = () => {
  const initialState = {
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  const [admin, setAdmin] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);

  const classes = useStyles();
  const [columns, setColumns] = useState([
    {
      title: "Username",
      field: "userName",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
    },
  ]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructuring Data
    const { userName, email, phoneNumber, password } = admin;

    // Check if all fields are filled
    if (!userName && !email && !phoneNumber && !password) {
      return Swal.fire(
        "Error",
        "Please fill the form with valid data",
        "error"
      );
    }

    if (!userName) {
      return Swal.fire("Error", "Please enter username", "error");
    }

    if (!email) {
      return Swal.fire("Error", "Please enter email", "error");
    }

    if (!phoneNumber) {
      return Swal.fire("Error", "Please enter phoneNumber", "error");
    }

    if (password.length < 6) {
      return Swal.fire("Error", "Atleast 6 charcters long", "error");
    }

    // Post Request to Create Admin
    try {
      await axios.post(`${baseURL}/admin`, {
        userName,
        email,
        phoneNumber,
        password,
      });
      Swal.fire("Success", "New admin was created", "success");
      setDatas([...datas, admin]);
    } catch (error) {
      Swal.fire("Error", `${error.response.data.msg}`, "error");
    }

    // Reset State
    setAdmin(initialState);
  };

  // Fetch Admin
  const fetchAdmin = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${baseURL}/admin`);
      setDatas(data.admins);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Grid container>
          <Card className={classes.formContainer}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Admin Form
              </Typography>
              <Typography paragraph color="textSecondary" gutterBottom>
                Fill up to add new admin.
              </Typography>
            </CardContent>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    value={admin.userName}
                    name="userName"
                    label="Username"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    value={admin.email}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    value={admin.phoneNumber}
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    value={admin.password}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={12} item>
                  <Button
                    className={classes.formButton}
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8} lg={8}>
        <MaterialTable
          isLoading={isLoading}
          data={datas}
          title="Admins"
          columns={columns}
          data={datas}
          options={{
            sorting: true,
            exportButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Admins;
