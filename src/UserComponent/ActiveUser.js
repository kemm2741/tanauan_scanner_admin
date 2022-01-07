import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

import MaterialTable from "material-table";

// Import axios
import axios from "axios";

const ActiveUser = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Active Users
  const fetchActiveUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://tanuan-backend.herokuapp.com/api/user"
      );
      setData(data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUser();
  }, []);

  return (
    <div>
      <MaterialTable
        title="Active Registered QR Codes"
        data={data}
        isLoading={isLoading}
        options={{
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 10,
        }}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              Swal.fire({
                title: "Are you sure?",
                text: "you want delete the user",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  axios
                    .delete(
                      `https://tanuan-backend.herokuapp.com/api/user/${rowData._id}`
                    )
                    .then(({ data }) => {
                      Swal.fire("Success", `User is now archived!`, "success");
                      fetchActiveUser();
                    })
                    .catch((err) => {
                      Swal.fire("Error", `${err.response.data.msg}`, "error");
                      fetchActiveUser();
                    });
                }
              });
            },
          },
        ]}
        columns={[
          {
            title: "Name",
            field: "name",
          },
          {
            title: "Middle Name",
            field: "middleName",
          },
          {
            title: "Last Name",
            field: "lastName",
          },
          {
            title: "Age",
            field: "age",
          },
          {
            title: "Contact",
            field: "phoneNumber",
          },
          {
            title: "Gender",
            field: "sex",
          },
          {
            title: "Email",
            field: "email",
          },

          {
            title: "Birthday",
            field: "birthday",
            type: "date",
            dateSetting: {
              format: "dd/MM/yyyy",
            },
          },
          {
            title: "Barangay",
            field: "barangay.barangayName",
          },
          {
            title: "Zone",
            field: "zone",
          },
          {
            title: "Vaccine Name",
            field: "isVaccinated.vaccine",
          },
          {
            title: "Is Vaccinataed",
            field: "isVaccinated.Vaccinated",
          },

          {
            title: "Category",
            field: "category",
          },
        ]}
      />
    </div>
  );
};

export default ActiveUser;
