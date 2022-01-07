import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

// Material Table
import MaterialTable from "material-table";

// Import axios
import axios from "axios";

// React Icons
import { GrRevert } from "react-icons/gr";

const ArchievedUser = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Archieved Users
  const fetchArchievedUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://tanuan-backend.herokuapp.com/api/user/get-archived-user"
      );
      setData(data.users);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArchievedUser();
  }, []);

  return (
    <div>
      <MaterialTable
        title="Archieved User QR Codes"
        isLoading={isLoading}
        data={data}
        actions={[
          {
            icon: () => <GrRevert size={24} />,
            tooltip: "Save User",
            onClick: (event, rowData) => {
              Swal.fire({
                title: "Are you sure you want to active the user?",
                // text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Activate Account",
              }).then((result) => {
                if (result.isConfirmed) {
                  axios
                    .post(
                      "https://tanuan-backend.herokuapp.com/api/user/recovered-user",
                      {
                        user_id: rowData._id,
                      }
                    )
                    .then(({ data }) => {
                      console.log(data);
                      fetchArchievedUser();
                      Swal.fire("Success", `User is now activated!`, "success");
                    })
                    .catch((err) => {
                      console.log(err);
                      fetchArchievedUser();
                      Swal.fire(
                        "Success",
                        `${err.response.data.msg}`,
                        "success"
                      );
                    });
                }
              });
            },
          },
        ]}
        options={{
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 10,
        }}
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
            title: "Category",
            field: "category",
          },
        ]}
      />
    </div>
  );
};

export default ArchievedUser;
