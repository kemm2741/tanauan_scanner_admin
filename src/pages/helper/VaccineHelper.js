import React, { useState } from "react";

// Material Table
import MaterialTable from "material-table";

const VaccineHelper = ({ title, usersArray }) => {
  const [data, setData] = useState(usersArray);

  console.log(data);

  return (
    <div style={{ padding: "50px 40px", backgroundColor: "#ebe9e9" }}>
      <MaterialTable
        title={`Users vaccinated with ${title}`}
        columns={[
          {
            title: "First Name",
            field: "user.user.name",
          },
          {
            title: "Middle Name",
            field: "user.user.middleName",
          },
          {
            title: "Last Name",
            field: "user.user.lastName",
          },
          {
            title: "Barangay",
            field: "user.user.barangay.barangayName",
          },
          {
            title: "Zone",
            field: "user.user.zone",
          },
          {
            title: "Age",
            field: "user.user.age",
          },
          {
            title: "Sex",
            field: "user.user.sex",
          },
          {
            title: "Contact Number",
            field: "user.user.phoneNumber",
          },
          {
            title: "First dose vaccinated schedule",
            field: "user.vaccinenated[0].date",
            type: "date",
            dateSetting: {
              format: "dd/MM/yyyy",
            },
          },
          {
            title: "Second dose vaccinated schedule",
            field: "user.vaccinenated[1].date",
            type: "date",
            initialEditValue: "Not yeat schedule",
            dateSetting: {
              format: "dd/MM/yyyy",
            },
          },
          {
            title: "Booster shot vaccinated schedule",
            field: "user.vaccinenated[2].date",
            type: "date",
            dateSetting: {
              format: "dd/MM/yyyy",
            },
          },
        ]}
        data={data}
        options={{ sorting: true, exportButton: true, search: true }}
      />
    </div>
  );
};

export default VaccineHelper;
