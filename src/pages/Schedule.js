import React, { useState, useEffect } from "react";

// ! Import Base URL
import { baseURL } from "../utils/baseURL";

// Import axios
import axios from "axios";

// Momemnt
import moment from "moment";

// SweetAlert
import Swal from "sweetalert2";

// Material Table
import MaterialTable from "material-table";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Material UI Date
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// makeJSDateObject
import makeJSDateObject from "../utils/makeJSDateObject";

// Helper
import CustomDatePicker from "./helper/CustomDatePicker";

// Mock Data
import timeInMockData from "../mock/newMock";

const Schedule = () => {
  // Schedules Data fetched items || States
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);

  const [columns, setColumns] = useState([
    {
      title: "Scheduled Date",
      type: "date",
      field: "availableSchedule",
      filtering: false,
      render: (rowData) => (
        <Typography variant="p">
          {moment(rowData.availableSchedule).format("LL")}
        </Typography>
      ),
    },

    {
      title: "Vaccine Type",
      field: "vaccineType.vaccineName",
      type: "string",
      editable: false,
      render: (rowData) => (
        <Typography style={{ textTransform: "capitalize" }} variant="p">
          {rowData.vaccineType.vaccineName}
        </Typography>
      ),
    },

    {
      title: "Date Created",
      field: "date",
      type: "date",
      editable: "never",
      export: false,
    },
  ]);

  // Fetch Schedules
  const fetchSchedule = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${baseURL}/schedule`);
      setDatas(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12} lg={12}>
        <MaterialTable
          isLoading={isLoading}
          title="Vaccination Schedules"
          columns={columns}
          data={datas}
          options={{
            sorting: true,
            exportButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,
            pageSize: 10,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Schedule;
