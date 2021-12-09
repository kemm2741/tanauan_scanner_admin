import React, { useState } from "react";

// Material Table
import MaterialTable from "material-table";

const toCapitalized = (myString) => {
  return myString
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

const NestedBarangayHelper = ({ vaccineDetails }) => {
  console.log(vaccineDetails);

  const [data, setDatas] = useState(vaccineDetails);

  // const [allData, setAllData] = useState([
  //   {
  //     vaccinatorName: toCapitalized(
  //       `${vaccinator.firstname}  ${vaccinator.middlename} ${vaccinator.lastname}`
  //     ),
  //     vaccinatorImage: vaccinator.profile.url,
  //     vaccineName: vaccine.vaccineName,
  //     dose,
  //     date,
  //   },
  // ]);

  return (
    <div style={{ padding: "50px 40px", backgroundColor: "#ebe9e9" }}>
      <MaterialTable
        title={`User vaccine details`}
        options={{ sorting: true, exportButton: true, search: true }}
        columns={[
          {
            title: "Dose",
            field: "dose",
          },

          {
            title: "Vaccine Name",
            field: "vaccine.vaccineName",
          },

          {
            title: "Vaccinator Profile",
            field: "vaccinatorImage",
            render: (item) => {
              return (
                <img
                  src={item.vaccinator.profile.url}
                  alt=""
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              );
            },
          },

          {
            title: "Vaccinator Name",
            field: "vaccinator.firstname",
          },

          {
            title: "Date Vaccinated",
            field: "date",
            type: "date",
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default NestedBarangayHelper;
