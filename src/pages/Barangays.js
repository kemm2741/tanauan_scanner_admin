import React, { useState, useEffect } from "react";

// ! Import Base URL
// import { baseURL } from "../utils/baseURL";

// Import Axios
import axios from "axios";

// Material Table
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Rechart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper Component
import BarangayHelper from "./helper/BarangayHelper";

const useStyles = makeStyles((theme) => ({
  lineChart: {
    marginBottom: theme.spacing(4),
  },
}));

const Barangays = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState([
    { title: "Barangay Name", field: "barangay.barangayName" },
    {
      title: "Users From This Barangay",
      field: "userRegisteredWithBarangay",
    },
  ]);

  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Barangay
  const fetchBarangay = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://tanuan-backend.herokuapp.com/api/barangay`
      );
      setDatas(data);

      console.log(data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBarangay();
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Typography variant="h5">Barangay Chart </Typography>
          <ResponsiveContainer
            className={classes.lineChart}
            width="100%"
            height={400}
          >
            <LineChart
              width={500}
              height={200}
              data={datas}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="barangay.barangayName" />
              <YAxis />
              <Tooltip />
              <Line
                connectNulls
                type="monotone"
                dataKey="userRegisteredWithBarangay"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      <MaterialTable
        isLoading={isLoading}
        data={datas}
        title="Tanauan Vaccines Data"
        columns={columns}
        data={datas}
        options={{
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 20,
        }}
        detailPanel={(rowData) => {
          return <BarangayHelper usersArray={rowData.barangay} />;
        }}
      />
    </>
  );
};

export default Barangays;
