import React, { useState, useEffect } from "react";

// Swal
import Swal from "sweetalert2";

// ! Base URL
// import { baseURL } from "../../utils/baseURL";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Badge } from "@material-ui/core";

// Import axios
import axios from "axios";

// Use History
import { useHistory } from "react-router-dom";

// Material UI Date Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "500px",
    margin: "0 auto",
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: "-50px",
      width: "420px",
      marginBottom: "20px",
    },
  },
  formTitle: {
    fontSize: "30px",
  },

  formButton: {
    padding: "10px",
  },
  subscribeButton: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  loadingContainer: {
    width: "200px",
    height: "40vh",
    marginInline: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    marginInline: "auto",
    width: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 3, 2),
  },
  qrDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  qrButton: {
    marginTop: "30px",
  },
  qrCodeText: { textAlign: "center" },
}));

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date); // create a date object directly from dob1 argument
  let age_now = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};

const AddRhuUser = () => {
  const classes = useStyles();
  const history = useHistory();

  const initalState = {
    lastname: "",
    firstname: "",
    middlename: "",
    sex: "",
    password: "",
    contact: "",
    email: "",
    address: "",
    civilStatus: "",
    profile: "",
  };

  //   Const Barangays
  const [userData, setUserData] = useState(initalState);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //   handleOnChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  //  File On Change
  const fileOnChange = (e) => {
    const { files, name } = e.target;
    for (let file of files) {
      setUserData({
        ...userData,
        [name]: file,
      });
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      lastname,
      firstname,
      middlename,
      sex,
      password,
      contact,
      email,
      address,
      civilStatus,
      profile,
    } = userData;

    if (lastname === "") {
      Swal.fire("Error", "Please enter last name", "error");
    }

    if (firstname === "") {
      Swal.fire("Error", "Please enter first name", "error");
    }

    if (middlename === "") {
      Swal.fire("Error", "Please enter middle name", "error");
    }

    if (sex === "") {
      Swal.fire("Error", "Please enter contact", "error");
    }

    if (password === "") {
      Swal.fire("Error", "Please enter contact", "error");
    }

    if (contact === "") {
      Swal.fire("Error", "Please enter contact", "error");
    }
    if (email === "") {
      Swal.fire("Error", "Please enter contact email", "error");
    }

    if (address === "") {
      Swal.fire("Error", "Please enter contact brgy", "error");
    }

    if (civilStatus === "") {
      Swal.fire("Error", "Please enter civil status", "error");
    }

    if (profile === "") {
      Swal.fire("Error", "Please enter profile", "error");
    }

    if (calculateAge(new Date(selectedDate)) <= 20) {
      Swal.fire("Error", "You must be 21 to be a vaccinator", "error");
    }

    console.log(userData);

    // Success No Error
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("lastname", lastname);
      form.append("firstname", firstname);
      form.append("middlename", middlename);
      form.append("sex", sex);
      form.append("password", password);
      form.append("contact", contact);
      form.append("email", email);
      form.append("address", address);
      form.append("civilStatus", civilStatus);
      form.append("profile", profile);
      form.append("birthday", selectedDate);

      const { data } = await axios.post(
        "https://tanuan-backend.herokuapp.com/api/rhu/create-rhu-facilitator",
        form
      );

      console.log(data);

      history.push("/rhuUser");

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setUserData(initalState);
  };

  return (
    <Grid justifyContent="center" container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Card className={classes.formContainer}>
            <CardContent>
              <Typography
                align="center"
                className={classes.formTitle}
                gutterBottom
                variant="h4"
              >
                Add Rhu User
              </Typography>
            </CardContent>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    name="lastname"
                    value={userData.lastname}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleOnChange}
                    name="firstname"
                    value={userData.firstname}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleOnChange}
                    name="middlename"
                    value={userData.middlename}
                    label=" Middle Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleOnChange}
                    name="sex"
                    value={userData.sex}
                    label="Sex"
                    variant="outlined"
                    fullWidth
                    select
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        variant="outlined"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    name="password"
                    value={userData.password}
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    name="contact"
                    value={userData.contact}
                    label="Contact"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    name="email"
                    value={userData.email}
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={12} item>
                  <TextField
                    onChange={handleOnChange}
                    name="address"
                    value={userData.address}
                    label="Address"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleOnChange}
                    name="civilStatus"
                    value={userData.civilStatus}
                    label="Civil Status"
                    variant="outlined"
                    fullWidth
                    select
                  >
                    <MenuItem value="single"> Single </MenuItem>
                    <MenuItem value="widowed"> Widowed </MenuItem>
                    <MenuItem value="married"> Married </MenuItem>
                  </TextField>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <input
                    onChange={fileOnChange}
                    type="file"
                    name="profile"
                    accept="image/*"
                  />
                  <label for="files">Profile Image </label>
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
        </>
      )}
    </Grid>
  );
};

export default AddRhuUser;
