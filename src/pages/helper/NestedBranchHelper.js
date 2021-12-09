import React, { useState } from "react";

import axios from "axios";

import MaterialTable from "material-table";

const NestedBranchHelper = ({ rowData }) => {
  const [data, setData] = useState(rowData.value);

  console.log(rowData);

  return (
    <div style={{ padding: "40px 30px", backgroundColor: "#ebe9e9" }}>
      <MaterialTable
        title="Tme in users"
        columns={[
          {
            title: "First Name",
            field: "user.name",
          },
          {
            title: "Middle Name",
            field: "user.middleName",
          },
          {
            title: "Last Name",
            field: "user.lastName",
          },
          {
            title: "Is Vaccinated",
            field: "user.isVaccinated.Vaccinated",
          },
          {
            title: "Vaccine Name",
            field: "user.isVaccinated.vaccine",
          },

          {
            title: "Date",
            field: "date",
            field: "date",
            type: "date",
            dateSetting: {
              format: "dd/MM/yyyy",
            },
            export: false,
          },
        ]}
        data={data}
        options={{ sorting: true, exportButton: true, search: true }}
      />{" "}
    </div>
  );
};

export default NestedBranchHelper;
