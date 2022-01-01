import React, { useState, useEffect } from "react";

// ! Import Base URL
import { baseURL } from "../utils/baseURL";

import html2canvas from "html2canvas";

// Moment
import moment from "moment";

// QR Code Generator
import QRCode from "qrcode.react";

// Material Table
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

// React Icons
import { AiOutlineQrcode } from "react-icons/ai";

// SweetAlert
import Swal from "sweetalert2";

// Import aaxios
import axios from "axios";

// Branch Helper
import BranchHelper from "./helper/BranchHelper";

// Mock Up Data
import bracnhesMockData from "../mock/branches";

const useStyles = makeStyles((theme) => ({
  branchTable: {
    marginTop: theme.spacing(1),
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #111",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  qrDiv: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
  },
  barChart: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  vaccinatedUsersTable: {
    marginTop: theme.spacing(5),
  },
  qrcodeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1.5),
    border: "2px #111 solid",
  },
  qrCodeVaccinator: {
    marginTop: "5px",
    textAlign: "center",
    fontWeight: "bold",
  },
  qrButton: {
    marginTop: "10px",
  },
}));

const Branches = () => {
  const classes = useStyles();
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

  // Const States
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // Fetch Branch
  const fetchBranch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${baseURL}/branch`);
      setData(data.branch);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Branch QR Code
  const [qrCode, setQrCode] = useState("");
  const downloadQrcode = () => {
    html2canvas(document.querySelector("#react-qrcode-logo-div")).then(
      (canvas) => {
        const link = document.createElement("a");
        link.download = `${qrCode.branchName}-tanauan-branch.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    );
    setOpenModal(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <div className={classes.qrDiv}>
              <div
                className={classes.qrcodeContainer}
                id="react-qrcode-logo-div"
              >
                <QRCode
                  value={qrCode ? qrCode._id : "no-data-found"}
                  size={170}
                />
                <label className={classes.qrCodeVaccinator}>
                  {qrCode ? `${qrCode.branchName} Branch` : "No Data Found"}
                </label>
              </div>
            </div>

            <Button
              className={classes.qrButton}
              onClick={downloadQrcode}
              variant="contained"
              color="primary"
              fullWidth
            >
              Download
            </Button>
          </div>
        </Fade>
      </Modal>

      <div className={classes.branchTable}>
        <MaterialTable
          isLoading={isLoading}
          title="Tanauan Registered Branches"
          columns={columns}
          data={data}
          detailPanel={(rowData) => {
            return <BranchHelper data={rowData} id={rowData._id} />;
          }}
          actions={[
            {
              icon: () => <AiOutlineQrcode />,
              tooltip: "Download QR Code",
              onClick: (event, rowData) => {
                console.log(rowData);
                handleOpenModal();
                const { _id, branchName } = rowData;
                const qrData = {
                  _id,
                  branchName,
                };
                setQrCode(qrData);
              },
            },
          ]}
          options={{
            sorting: true,
            exportButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,
            pageSize: 10,
          }}
          onFilterChange={(filters) => {
            if (filters.length === 0) {
              fetchBranch();
              return;
            }

            const filteredItems = data.filter((dataItem) => {
              return (
                moment(dataItem.date).format("YYYY-MM-DD").trim() ===
                moment(filters[0].value).format("YYYY-MM-DD").trim()
              );
            });

            setData(filteredItems);
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                axios
                  .post(`${baseURL}/branch`, {
                    branchName: newData.branchName,
                    branchNumber: newData.branchNumber,
                    branchEmail: newData.branchEmail,
                    branchDescription: newData.branchDescription,
                    latitude: newData.latitude.trim(),
                    longitude: newData.longitude.trim(),
                  })
                  .then((response) => {
                    setTimeout(() => {
                      fetchBranch();
                      Swal.fire("Success", "New Branch Added!", "success");
                      resolve();
                    }, 1000);
                  })
                  .catch((error) => {
                    Swal.fire("Error", `${error.response.data.msg}`, "error");
                    resolve();
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                axios
                  .put(`${baseURL}/branch/${oldData._id}`, {
                    branchName: newData.branchName,
                    branchNumber: newData.branchNumber,
                    branchEmail: newData.branchEmail,
                    branchDescription: newData.branchDescription,
                    latitude: newData.latitude,
                    longitude: newData.longitude,
                  })
                  .then((response) => {
                    setTimeout(() => {
                      fetchBranch();
                      Swal.fire(
                        "Success",
                        "Branch Updated Successfully",
                        "success"
                      );
                      resolve();
                    }, 1000);
                  })
                  .catch((error) => {
                    Swal.fire("Error", `${error.response.data.msg}`, "error");
                    resolve();
                  });
              }),
            // onRowDelete: (oldData) =>
            //   new Promise((resolve, reject) => {
            //     axios
            //       .delete(`${baseURL}/branch/${oldData._id}`)
            //       .then((response) => {
            //         setTimeout(() => {
            //           fetchBranch();
            //           Swal.fire("Success", `${response.data.msg}`, "success");
            //           resolve();
            //         }, 1000);
            //       })
            //       .catch((error) => {
            //         Swal.fire("Error", `${error.response.data.msg}`, "error");
            //         resolve();
            //       });
            //   }),
          }}
        />
      </div>
    </>
  );
};

export default Branches;
