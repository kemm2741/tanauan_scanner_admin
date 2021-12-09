import React, { useState } from "react";

// Sweet Alert
import Swal from "sweetalert2";

// Material Table
import MaterialTable from "material-table";

// Nested Helper
import NestedBarangayHelper from "./NestedBarangay";

const BarangayHelper = ({ usersArray }) => {
  const [users, setUsers] = useState(usersArray.users);

  console.log(users);

  return (
    <div style={{ padding: "50px 40px", backgroundColor: "#ebe9e9" }}>
      <MaterialTable
        title={`Users' from Barangay ${usersArray.barangayName}`}
        columns={[
          { title: "Name", field: "name" },
          { title: "Middle Name", field: "middleName" },
          { title: "Last Name", field: "lastName" },
          { title: "Age", field: "age" },
          { title: "Gender", field: "sex" },
          { title: "Contact Number", field: "phoneNumber" },
          { title: "Vaccinated", field: "isVaccinated" },
          { title: "Zone", field: "zone" },
        ]}
        detailPanel={(rowData) => {
          if (rowData.vaccineType.length <= 0) {
            return (
              <div style={{ textAlign: "center", padding: "20px 10px" }}>
                <h3> No data, this user is not yet vaccinated </h3>
              </div>
            );
          } else {
            return (
              <NestedBarangayHelper vaccineDetails={rowData.vaccineType} />
            );
          }
        }}
        data={users}
        options={{ sorting: true, exportButton: true, search: true }}
      />
    </div>
  );
};

export default BarangayHelper;
