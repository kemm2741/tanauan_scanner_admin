import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

// ! Import Base URL
import { baseURL } from "../utils/baseURL";

// Import axios
import axios from "axios";

// Count UP
import CountUp from "react-countup";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Material UI Select
import MenuItem from "@material-ui/core/MenuItem";

// Material UI Modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Material Table
import MaterialTable from "material-table";

// Vaccine Helper Component
import VaccineHelper from "./helper/VaccineHelper";

const useStyles = makeStyles((theme) => ({
  paperGrid: {
    padding: theme.spacing(4),
  },
  composedChart: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Vaccine = () => {
  const classes = useStyles();

  const initialState = {
    vaccineName: "",
    vaccineStock: 0,
    maxDose: 0,
    DaysPriorFor2ndDose: 30,
    MonthPriorForBoosterShot: 0,
  };

  //
  const [vaccineData, setVaccineData] = useState(initialState);

  // Chart Data
  const [chartData, setChartData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Name", field: "vaccineName" },
    {
      title: "Stock",
      field: "vaccineStock",
      type: "numeric",
    },
    {
      title: "Vaccinated Users",
      field: "vaccinated",
      type: "numeric",
      editable: false,
    },
    {
      title: "Maximum Dose",
      field: "maxDose",
      type: "numeric",
      editable: false,
    },
    {
      title: "Date Registered",
      field: "date",
      editable: "never",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
  ]);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVaccineData({
      ...vaccineData,
      [name]: value,
    });
  };

  // Modal Settings
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setVaccineData(initialState);
  };

  // Fetch Available Vaccine Data
  const fetchVaccine = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${baseURL}/vaccine`);
      // setDatas(data);
      setDatas(data.vaccines);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Set Chart Data Function
  const setChartDataFunction = (datas) => {
    let obj = {};
    for (let datax of datas) {
      obj[datax.vaccineName] = obj[datax.vaccineName] || [];

      obj[datax.vaccineName].push(datax);
    }
    Object.keys(obj).forEach((key) => {
      obj[key] = obj[key].reduce((accum, item) => accum + item.vaccineStock, 0);
    });
    const toArray = Object.keys(obj).map((key) => {
      return { vaccineName: key, vaccineStock: obj[key] };
    });
    setChartData(toArray);
  };

  useEffect(() => {
    fetchVaccine();
  }, []);

  useEffect(() => {
    setChartDataFunction(datas);
  }, [datas]);

  // ERROR CHECKING FUNCTIONS
  const errorChecker = () => {
    const { vaccineName, vaccineStock, maxDose, DaysPriorFor2ndDose } =
      vaccineData;

    if (vaccineName === "") {
      Swal.fire("Error", `Please input vaccine name`, "error");
      return handleCloseModal();
    }

    if (vaccineStock <= 0) {
      Swal.fire("Error", `Vaccine Stock must not be empty`, "error");
      return handleCloseModal();
    }

    if (maxDose <= 0) {
      Swal.fire("Error", `Max dose must be set`, "error");
      return handleCloseModal();
    }

    if (DaysPriorFor2ndDose <= 0) {
      Swal.fire("Error", `Days prior for second does must be set`, "error");
      return handleCloseModal();
    }
  };

  // Submit Data POST Request
  const handleClick = async (e) => {
    e.preventDefault();

    errorChecker();

    try {
      const { data } = await axios.post(`${baseURL}/vaccine`, vaccineData);
      setDatas([data.savedVaccine, ...datas]);

      Swal.fire("Success", `Vaccine Added`, "success");
    } catch (error) {
      Swal.fire("Error", `${error.response.data.msg}`, "error");
    }

    handleCloseModal();
    setVaccineData(initialState);
  };

  // Submit Data PUT Request
  const handleUpdate = async (e) => {
    e.preventDefault();

    const {
      vaccineName,
      vaccineStock,
      maxDose,
      DaysPriorFor2ndDose,
      MonthPriorForBoosterShot,
      _id,
    } = vaccineData;

    try {
      const { data } = await axios.put(`${baseURL}/vaccine/${_id}`, {
        vaccineName,
        vaccineStock,
        maxDose,
        DaysPriorFor2ndDose,
        MonthPriorForBoosterShot,
      });

      fetchVaccine();

      Swal.fire("Success", `Vaccine Added`, "success");
    } catch (error) {
      Swal.fire("Error", `${error.response.data.msg}`, "error");
    }

    handleCloseModal();
    setVaccineData(initialState);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Container component="main" maxWidth="md">
            <div className={classes.paperModal}>
              {vaccineData?._id ? (
                <Typography component="h1" variant="h5">
                  Update Vaccine Form
                </Typography>
              ) : (
                <Typography component="h1" variant="h5">
                  Create Vaccine Form
                </Typography>
              )}
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      value={vaccineData.vaccineName}
                      onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Vaccine Name"
                      name="vaccineName"
                    />
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <TextField
                      value={vaccineData.vaccineStock}
                      onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="number"
                      label="Vaccine Stock"
                      name="vaccineStock"
                    />
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <TextField
                      value={vaccineData.maxDose}
                      onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Maximum Dose"
                      name="maxDose"
                      select
                    >
                      <MenuItem value="1"> 1st Dose </MenuItem>
                      <MenuItem value="2"> 2nd Dose </MenuItem>
                    </TextField>
                  </Grid>

                  {vaccineData.maxDose > 1 && (
                    <Grid xs={12} sm={6} item>
                      <TextField
                        value={vaccineData.DaysPriorFor2ndDose}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        label="Days Prior For 2nd Dose"
                        name="DaysPriorFor2ndDose"
                      />
                    </Grid>
                  )}

                  {vaccineData?._id ? (
                    <>
                      <Button
                        onClick={handleUpdate}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Update
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleClick}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Create
                      </Button>
                    </>
                  )}
                </Grid>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>

      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {chartData.map((data) => (
            <Grid key={data._id} xs={12} md={6} lg={3} item>
              <Paper className={classes.paperGrid}>
                <Typography className={classes.vaccineTitle} variant="h5">
                  {data.vaccineName}
                </Typography>
                <CountUp
                  start={0}
                  end={data.vaccineStock}
                  duration={3}
                  separator=","
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <ResponsiveContainer
          className={classes.composedChart}
          width="100%"
          height={400}
        >
          <ComposedChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="vaccineName" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vaccineStock" barSize={20} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>

        <MaterialTable
          isLoading={isLoading}
          title="Tanauan Vaccine Data"
          columns={columns}
          data={datas}
          options={{
            sorting: true,
            exportButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          detailPanel={(rowData) => {
            return (
              <VaccineHelper
                title={rowData.vaccineName}
                usersArray={rowData.vaccinatedUser}
              />
            );
          }}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                axios
                  .delete(`${baseURL}/vaccine/${oldData._id}`)
                  .then(({ data }) => {
                    setTimeout(() => {
                      const dataDelete = [...datas];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setDatas([...dataDelete]);

                      Swal.fire("Success", `${data.msg}`, "success");

                      resolve();
                    }, 1000);
                  })
                  .catch((err) => {
                    console.log(err);
                    resolve();
                  });
              }),
          }}
        />
      </Container>
    </>
  );
};

export default Vaccine;
