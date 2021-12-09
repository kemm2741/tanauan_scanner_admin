import React, { useState, useEffect } from "react";

// Base URL
import { baseURL } from "../../utils/baseURL";

import axios from "axios";

import MaterialTable from "material-table";

// Import
import NestedBranchHelper from "../helper/NestedBranchHelper";

const BranchHelper = ({ id }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Branch", field: "branchName", filtering: true },
    { title: "Phone Number", field: "branchNumber", filtering: true },
    { title: "Email", field: "branchEmail", filtering: false },
    { title: "Description", field: "branchDescription", filtering: false },
    { title: "Latitude", field: "latitude", filtering: false },
    { title: "Longitude", field: "longitude", filtering: false },
    {
      editable: false,
      title: "Date Registered",
      field: "date",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy",
      },
      export: false,
    },
  ]);

  const fetchBranchTimein = async () => {
    try {
      const { data } = await axios.post(
        `${baseURL}/timein/get-branch-time-in-information`,
        { branch_Id: id }
      );
      setData(data.timeinUser);

      console.log(data.timeinUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBranchTimein();
  }, []);

  return (
    <div style={{ padding: "50px 40px", backgroundColor: "#ebe9e9" }}>
      <MaterialTable
        title={"Time in date"}
        columns={[{ title: "Date", field: "date" }]}
        data={data}
        detailPanel={(rowData) => {
          return <NestedBranchHelper rowData={rowData} />;
        }}
        options={{ sorting: true, exportButton: true, search: true }}
      />
    </div>
  );
};

export default BranchHelper;
