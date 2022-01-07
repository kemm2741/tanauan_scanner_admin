import React, { useState, useEffect } from "react";

// ! Import Base URL
import { baseURL } from "../utils/baseURL";

// Import moment
import moment from "moment";

// Count UP
import CountUp from "react-countup";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// Import axios
import axios from "axios";

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
import VaccineHelper from "./helper/childrenVaccine";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  composedChart: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const ChildrenVaccination = () => {
  const classes = useStyles();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);

  const [columns, setColumns] = useState([
    { title: "Name", field: "vaccineName" },
    { title: "Vaccine Use", field: "vaccineUse" },
    {
      title: "Scheduled Date",
      type: "date",
      field: "schedule",
      filtering: false,
      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
    // {
    //   title: "Date Vaccine Registered",
    //   field: "date",
    //   editable: "never",
    //   type: "date",
    //   dateSetting: {
    //     format: "dd/MM/yyyy",
    //   },
    // },
  ]);

  // Fetch Available Vaccine Data
  const fetchVaccine = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURL}/children`);
      setDatas(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccine();
  }, []);

  return (
    <Container maxWidth="xl">
      <MaterialTable
        isLoading={isLoading}
        title="Children Immunization Table"
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
              id={rowData._id}
              title={rowData.vaccineName}
              usersArray={rowData.vaccinatedUser}
            />
          );
        }}
        // editable={{
        //   onRowAdd: (newData) =>
        //     new Promise((resolve, reject) => {
        //       axios.post(`${baseURL}/children`, newData).then(({ data }) => {
        //         setTimeout(() => {
        //           setDatas([data.savedVaccine, ...datas]);
        //           resolve();
        //         }, 1000);
        //       });
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       axios
        //         .put(`${baseURL}/children/${oldData._id}`, {
        //           vaccineName: newData.vaccineName,
        //           vaccineUse: newData.vaccineUse,
        //           barangay: newData.barangay,
        //           schedule: newData.schedule,
        //         })
        //         .then(({ data }) => {
        //           console.log("Vaccine Updated Successfully");

        //           console.log(data.updatedVacine);
        //         });

        //       setTimeout(() => {
        //         const dataUpdate = [...datas];
        //         const index = oldData.tableData.id;
        //         dataUpdate[index] = newData;
        //         setDatas([...dataUpdate]);

        //         resolve();
        //       }, 1000);
        //     }),
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve, reject) => {
        //       axios
        //         .delete(`${baseURL}/children/${oldData._id}`)
        //         .then((response) => {
        //           console.log("Deleted Successfully");
        //         });

        //       setTimeout(() => {
        //         const dataDelete = [...datas];
        //         const index = oldData.tableData.id;
        //         dataDelete.splice(index, 1);
        //         setDatas([...dataDelete]);
        //         resolve();
        //       }, 1000);
        //     }),
        // }}
      />
    </Container>
  );
};

export default ChildrenVaccination;
