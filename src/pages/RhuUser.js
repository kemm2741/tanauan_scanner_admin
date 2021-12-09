import React, { useState, useEffect } from "react";

// ! Base URL
// import { baseURL } from "../../utils/baseURL";
import { useHistory } from "react-router-dom";

// Material Table
import MaterialTable from "material-table";

// Axios
import axios from "axios";

const RhuUser = () => {
  const history = useHistory();

  const [columns, setColumns] = useState([
    {
      title: "Last Name",
      field: "lastname",
    },
    {
      title: "First Name",
      field: "firstname",
    },
    {
      title: "Middle Name",
      field: "middlename",
    },
    {
      title: "Profile",
      field: "profile.url",
      editable: false,
      render: (rowData) => (
        <img
          src={rowData.profile.url}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Birth Day",
      field: "birthday",
      type: "date",
    },
    {
      title: "Sex",
      field: "sex",
    },
    {
      title: "Contact Number",
      field: "contact",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Address",
      field: "address",
    },
    {
      title: "Civil Status",
      field: "civilStatus",
    },
  ]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   Fecth RHu user
  const fetchRhu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://tanuan-backend.herokuapp.com/api/rhu/get-rhu-facilitator"
      );

      // console.log(data.RHU);
      setData(data.RHU);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRhu();
  }, []);

  return (
    <div>
      <MaterialTable
        isLoading={isLoading}
        title="Rhu Users"
        columns={columns}
        data={data}
        actions={[
          {
            icon: "add",
            tooltip: "Add Rhu User",
            isFreeAction: true,
            onClick: (event) => history.push("/addRhuUser"),
          },

          {
            icon: "edit",
            tooltip: "Edit Rhu User",
            onClick: (event, rowData) =>
              history.push(`/editRhuUser/${rowData._id}`),
          },
        ]}
        options={{
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 10,
          filtering: true,
        }}
        editable={
          {
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     axios
            //       .post(
            //         "https://tanuan-backend.herokuapp.com/api/rhu/update-rhu-facilitator",
            //         {
            //           _id: oldData._id,
            //           lastname: newData.lastname,
            //           firstname: newData.firstname,
            //           middlename: newData.middlename,
            //           birthday: newData.birthday,
            //           sex: newData.sex,
            //           contact: newData.contact,
            //           email: newData.email,
            //           civilStatus: newData.civilStatus,
            //           address: newData.address,
            //         }
            //       )
            //       .then((response) => {
            //         console.log(response);
            //         resolve();
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //         resolve();
            //       });
            //   }),
          }
        }
      />
    </div>
  );
};

export default RhuUser;
