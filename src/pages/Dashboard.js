import React, { useState, useEffect } from "react";

// ! Import Base URL
import { baseURL } from "../utils/baseURL";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

// Count UP
import CountUp from "react-countup";

// Import Axios
import axios from "axios";

// React Icons
import { RiAdminLine } from "react-icons/ri";
import {
  AiOutlineUser,
  AiOutlineBranches,
  AiOutlineSchedule,
} from "react-icons/ai";
import { GiLoveInjection } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(1),
    textTransform: "capitalize",
  },
  dataNumber: {
    fontSize: "20px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [adminData, setAdminData] = useState({
    isLoading: false,
    adminArray: [],
  });

  const [userData, setUserData] = useState({
    isLoading: false,
    userArray: [],
  });

  const [vaccineData, setVaccineData] = useState({
    isLoading: false,
    vaccineArray: [],
  });

  const [branchData, setBranchData] = useState({
    isLoading: false,
    branchArray: [],
  });

  const [mostUsedVaccine, setMostUsedVaccine] = useState({
    isLoading: false,
    branchName: "",
  });

  const [scheduleData, setScheduleData] = useState({
    isLoading: false,
    scheduleArray: [],
  });

  // Fetch Admin length
  const fetchAdmin = async () => {
    try {
      setAdminData({
        ...adminData,
        isLoading: true,
      });
      const { data } = await axios.get(`${baseURL}/admin`);
      setAdminData({
        ...adminData,
        adminArray: data.admins,
        isLoading: false,
      });
    } catch (error) {
      alert(error.response.data.msg);
      setAdminData({
        ...adminData,
        isLoading: false,
      });
    }
  };
  // Fetch Users length
  const fetchUsers = async () => {
    try {
      setUserData({
        ...userData,
        isLoading: true,
      });
      const { data } = await axios.get(`${baseURL}/user`);
      setUserData({
        ...userData,
        userArray: data.users,
        isLoading: false,
      });
    } catch (error) {
      alert(error.response.data.msg);
      setUserData({
        ...userData,
        isLoading: false,
      });
    }
  };
  // Fetch Vaccine length
  const fetchVaccines = async () => {
    try {
      setVaccineData({
        ...vaccineData,
        isLoading: true,
      });
      const { data } = await axios.get(`${baseURL}/vaccine`);

      setVaccineData({
        ...vaccineData,
        vaccineArray: data.vaccines,
        isLoading: false,
      });
    } catch (error) {
      alert(error.response.data.msg);
      setVaccineData({
        ...vaccineData,
        isLoading: false,
      });
    }
  };

  // Fetch Branch length
  const fetchBranch = async () => {
    try {
      setBranchData({
        ...branchData,
        isLoading: true,
      });
      const { data } = await axios.get(`${baseURL}/branch`);

      console.log(data);

      setBranchData({
        ...branchData,
        branchArray: data.branch,
        isLoading: false,
      });
    } catch (error) {
      alert(error.response.data.msg);
      setBranchData({
        ...branchData,
        isLoading: false,
      });
    }
  };

  // Fetch Most Used Vaccine
  const fetchMostUsedVaccine = async () => {
    try {
      setMostUsedVaccine({
        ...mostUsedVaccine,
        isLoading: true,
      });
      const { data } = await axios.get(`${baseURL}/vaccine/mostUsedVaccine`);
      setMostUsedVaccine({
        ...mostUsedVaccine,
        branchName: data.vaccineName,
        isLoading: false,
      });
    } catch (error) {
      alert(error.response.data.msg);
      setMostUsedVaccine({
        ...mostUsedVaccine,
        isLoading: false,
      });
    }
  };

  // Fetch All Schedule
  const fetchSchedule = async () => {
    try {
      setScheduleData({
        ...scheduleData,
        isLoading: true,
      });
      const { data } = await axios.get(`${baseURL}/schedule`);
      setScheduleData({
        scheduleArray: data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      setScheduleData({
        ...scheduleData,
        isLoading: false,
      });
    }
  };

  // Call All Functions
  const callFunctions = () => {
    fetchAdmin();
    fetchUsers();
    fetchVaccines();
    fetchBranch();
    fetchMostUsedVaccine();
    fetchSchedule();
  };

  useEffect(() => {
    callFunctions();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid xs={12} md={6} lg={4} item align="center">
          <Paper className={classes.paper}>
            <Grid container>
              <Grid lg={6} item>
                <Typography variant="h5" className={classes.title}>
                  Admins
                </Typography>

                {adminData.isLoading ? (
                  <CircularProgress />
                ) : (
                  <CountUp
                    className={classes.dataNumber}
                    start={0}
                    end={adminData.adminArray.length}
                    duration={1.5}
                    separator=","
                  />
                )}
              </Grid>
              <Grid lg={6} item>
                <RiAdminLine size={50} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} md={6} lg={4} item align="center">
          <Paper className={classes.paper}>
            <Grid container>
              <Grid lg={6} item>
                <Typography className={classes.title} variant="h5">
                  Registered Users
                </Typography>
                {userData.isLoading ? (
                  <CircularProgress />
                ) : (
                  <CountUp
                    className={classes.dataNumber}
                    start={0}
                    end={userData.userArray.length}
                    duration={1.5}
                    separator=","
                  />
                )}
              </Grid>
              <Grid lg={6} item>
                <AiOutlineUser size={50} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} md={6} lg={4} item align="center">
          <Paper className={classes.paper}>
            <Grid container>
              <Grid lg={6} item>
                <Typography className={classes.title} variant="h5">
                  Vaccine Types
                </Typography>
                {vaccineData.isLoading ? (
                  <CircularProgress />
                ) : (
                  <CountUp
                    className={classes.dataNumber}
                    start={0}
                    end={vaccineData.vaccineArray.length}
                    duration={1.5}
                    separator=","
                  />
                )}
              </Grid>
              <Grid lg={6} item>
                <GiLoveInjection size={50} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4} align="center">
        <Grid xs={12} md={6} lg={4} item>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid lg={6} item>
                <Typography variant="h5" className={classes.title}>
                  Registered Branches
                </Typography>
                {branchData.isLoading ? (
                  <CircularProgress />
                ) : (
                  <CountUp
                    className={classes.dataNumber}
                    start={0}
                    end={branchData.branchArray.length}
                    duration={1.5}
                    separator=","
                  />
                )}
              </Grid>
              <Grid lg={6} item>
                <AiOutlineBranches size={50} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} md={6} lg={4} item>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid lg={6} item>
                <Typography className={classes.title} variant="h5">
                  Most Used Vaccine
                </Typography>
                {mostUsedVaccine.isLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography className={classes.title} paragraph>
                    {mostUsedVaccine.branchName
                      ? mostUsedVaccine.branchName
                      : "No Vaccine is used"}
                  </Typography>
                )}
              </Grid>
              <Grid lg={6} item>
                <AiOutlineUser size={50} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} md={6} lg={4} item align="center">
          <Paper className={classes.paper}>
            <Grid container>
              <Grid lg={6} item>
                <Typography variant="h5" className={classes.title}>
                  Schedule
                </Typography>

                {scheduleData.isLoading ? (
                  <CircularProgress />
                ) : (
                  <CountUp
                    className={classes.dataNumber}
                    start={0}
                    end={scheduleData.scheduleArray.length}
                    duration={1.5}
                    separator=","
                  />
                )}
              </Grid>
              <Grid lg={6} item>
                <AiOutlineSchedule size={50} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
