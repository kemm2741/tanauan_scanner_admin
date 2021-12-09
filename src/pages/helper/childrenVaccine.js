import React, { useState } from "react";

// ! Base URL
import { baseURL } from "../../utils/baseURL";

import axios from "axios";

// Material Table
import MaterialTable from "material-table";

const VaccineHelper = ({ id, title, usersArray }) => {
  const [users, setUsers] = useState(usersArray);

  // console.log(users);

  return (
    <div style={{ padding: "50px 40px", backgroundColor: "#ebe9e9" }}>
      <MaterialTable
        // title={`Users' from Barangay ${usersArray.barangayName}`}
        title={`Vaccinated children with ${title}`}
        columns={[
          { title: "Name", field: "firstName" },
          { title: "Middle Name", field: "middleName" },
          { title: "Last Name", field: "lastName" },
          {
            title: "Gender",
            field: "gender",
            lookup: { Male: "Male", Female: "Female" },
          },
          { title: "Age", field: "age" },
        ]}
        data={users}
        options={{
          search: true,
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: (newData, oldData) =>
            new Promise((resolve, reject) => {
              axios
                .put(`${baseURL}/children/addVaccinatedChild/${id}`, newData)
                .then(({ data }) => {
                  const reversedChild = [
                    ...data.child.vaccinatedUser,
                  ].reverse();

                  setTimeout(() => {
                    setUsers(reversedChild);
                    resolve();
                  }, 1000);
                })
                .catch((err) => {
                  console.log(err);
                  resolve();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log(oldData);
              axios
                .put(`${baseURL}/children/updateVaccinatedChild/${id}`, {
                  _id: oldData._id,
                  ...newData,
                })
                .then(({ data }) => {
                  console.log(data);
                  // console.log(`Child updated successfully`);
                  // console.log(data.child);
                  setTimeout(() => {
                    const dataUpdate = [...users];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setUsers([...dataUpdate]);
                    resolve();
                  }, 1000);
                })
                .catch((err) => {
                  console.log(err);
                  resolve();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              axios
                .put(`${baseURL}/children/deleteVaccinatedChild/${id}`, oldData)
                .then((response) => {
                  console.log("Deleted Successfully");
                });

              setTimeout(() => {
                const dataDelete = [...users];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setUsers([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default VaccineHelper;
