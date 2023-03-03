import { useState, useEffect,useCallback } from "react";
import { MenuItem } from "@mui/material";
import {
  Table,
  TableTopBar,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  TypoDisplay,
  TableRow,
  Button,
  Dialog,
  TypoBody,
  DialogButton,
  Pagination,
  Icon,Elevation,
} from "@element/react-components";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GET_REQUEST, DELETE_REQUEST } from "../../Utilities/RestEndPoint";
import Select from "@mui/material/Select";

export default function FarmerDetails(props) {
  const history = useHistory();
  const [FarmerDetailData, setFarmerDetailData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [deletedData, setDeletedData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectData, setSelectData] = useState("");
  let groupValue=props?.accounts[0].idTokenClaims?.groups?.includes("532927d4-a1fd-4d48-bdda-e4d1882c5847");
  const handleChange = (e) => setSearchTerm(e.target.value);
 
  const handleDropdownChange = (event) => {
    setSelectData(event.target.value);
  };

  const handleOnItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  }, []);
  const handleToClose = () => {
    setOpenModal(false);
  };
  const dataDelete = "projectMonitoring";
  const deletePost = (farmerId) => {
    let newFarmerDetailData = FarmerDetailData.filter(function (item) {
      return item.farmerId !== farmerId;
    });
    async function updateStatus() {
      const projectMonitoring = await DELETE_REQUEST("farmer", farmerId);

      if (projectMonitoring.operationResult === "SUCCESS") {
        setOpenModalSuccess(true);

        setFarmerDetailData(newFarmerDetailData);
      }
      setOpenModal(false);
    }
    updateStatus();
  };

  useEffect(() => {
    async function fetchData() {
      let farmerDetails = await GET_REQUEST("getAllFarmersDetails");
      setFarmerDetailData(farmerDetails);
      setSearchResults(farmerDetails);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      if (selectData === "farmerCountry") {
        const results = searchResults.filter((o) =>
          o.farmerCountry.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFarmerDetailData(results);
      } else if (selectData === "farmerLastName") {
        const results = searchResults.filter((o) =>
          o.farmerLastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFarmerDetailData(results);
      } else if (selectData === "farmerEmail") {
        const results = searchResults.filter((o) =>
          o.farmerEmail.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFarmerDetailData(results);
      } else if (selectData === "farmerId") {
        const results = searchResults.filter((o) =>
          o.farmerId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFarmerDetailData(results);
      } else if (selectData === "createdBy") {
        const results = searchResults.filter((o) =>
          o?.createdBy?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
        setFarmerDetailData(results);
      }
    } else {
      setFarmerDetailData(searchResults);
    }
  }, [searchTerm]);

  const redirectFunction = async (farmerId) => {
    let farmerDetailsSave = await GET_REQUEST(`getFarmerDetails/${farmerId}`);

    if (farmerDetailsSave) {
      history.push({
        pathname: "/farmerConfiguration",
        state: { detail: farmerDetailsSave },
      });
    }
  };
  return (
    <><Elevation elevation="2">
      <div
        style={{ zIndex: "1", left: "0", backgroundColor: "#F5F5F5", marginTop: "70px", height: "50px", position: "fixed", border: "1px solid #F5F5F5", width: "100%", }}
      >
        <TypoBody
          level={1}
          style={{
            fontSize: "14px",
            width: "100%",
            height: "30px",
            position: "relative",
            top: "32%",
            marginLeft: "2%",
            left: 0,
          }}
        > <span>
            <a onClick={() => history.push("/home")}>Home</a> {">"} Project
            Administration {">"}Farmer Details
          </span>
        </TypoBody>
      </div>
    </Elevation><div className="trackingContent">
        <Table
          trailingContent={<Pagination
            controlled
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={FarmerDetailData.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleOnItemsPerPageChange}
            itemsPerPageOptions={[5, 10, 25, 50, 100]} />}
          leadingContent={<TableTopBar
            title="Farmer Details"
            actions={<>
              <input
                type="text"
                disabled={selectData === ""}
                value={searchTerm}
                placeholder="Search..."
                onChange={handleChange} />
              <Select
                id="demo-simple-select"
                value={selectData}
                displayEmpty
                renderValue={selectData !== ""
                  ? undefined
                  : () => <div>Select Filter</div>}
                onChange={handleDropdownChange}
                style={{
                  height: "32px",
                  width: "126px",
                }}
              >
                <MenuItem value="farmerId">Farmer ID</MenuItem>
                <MenuItem value="farmerLastName">FarmerLastName</MenuItem>
                <MenuItem value="farmerEmail">FarmerEmail</MenuItem>
                <MenuItem value="farmerCountry">FarmerCountry</MenuItem>

                <MenuItem value="createdBy">CreatedBy</MenuItem>
              </Select>
            </>} />}
        >
          {" "}
          <TableHeader>
            <TableHeaderRow>
              {" "}
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Farmer ID
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Name
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Email
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCellView"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Country
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Created By
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCellView"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                View
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Action
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>

            {FarmerDetailData.length > 0 &&
              FarmerDetailData.slice(
                itemsPerPage * (currentPage - 1), itemsPerPage * (currentPage - 1) + itemsPerPage
              ).map((item, index) => (

                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="wordWrapTableCell"

                  >
                    {item.farmerId}
                  </TableCell>
                  <TableCell className="wordWrapTableCell">
                    {item.farmerFirstName} {item.farmerLastName}
                  </TableCell>
                  <TableCell className="wordWrapTableCell">
                    {item.farmerEmail}
                  </TableCell>
                  <TableCell className="wordWrapTableCellView">
                    {item.farmerCountry}
                  </TableCell>
                  <TableCell className="wordWrapTableCell">
                    {item.createdBy}
                  </TableCell>
                  <TableCell className="wordWrapTableCellView">
                    <VisibilityIcon
                      onClick={() => {
                        redirectFunction(item.farmerId);
                      } }
                    ></VisibilityIcon>
                  </TableCell>
                  <TableCell className="wordWrapTableCell">
                    <Button
                      variant="outlined"
                      label="Remove"
                      // disabled={groupValue === false ? true : false}
                      style={{
                        marginLeft: "4px",
                        borderRadius: "4px",
                        color: "#0464C4",
                      }}
                      onClick={() => {
                        setOpenModal(true);
                        setDeletedData(item.farmerId);
                      } } />
                  </TableCell>
                </TableRow>
              ))}
            {FarmerDetailData.length === 0 && (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            )}{" "}
            {openModal && (
              <Dialog open={openModal} onClosed={handleToClose}>
                <div style={{ display: "flex" }}>
                  <Icon icon="warning" style={{ color: "yellow", }} />
                  <TypoDisplay level={6}>Alert</TypoDisplay>
                </div>
                <div style={{ marginTop: "4%" }}>
                  <TypoBody>Remove Selected Farmer from Database?</TypoBody>
                </div>

                <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                  {" "}
                  <DialogButton
                    onClick={handleToClose}
                    color="primary"
                    variant="outlined"
                  >
                    Cancel
                  </DialogButton>
                  <DialogButton
                    onClick={() => deletePost(deletedData)}
                    color="primary"
                    id="Final"
                    variant="outlined"
                  >
                    Remove
                  </DialogButton>
                </div>
              </Dialog>
            )}
          </TableBody>
          {openModalSuccess && (
            <Dialog
              open={openModalSuccess}
              onClosed={() => setOpenModalSuccess(false)}

            >
              <div style={{ display: "flex" }}>
                <Icon icon="done" style={{ color: "green" }} />
                <TypoDisplay level={6}> SUCCESS</TypoDisplay>
              </div>
              <div style={{ marginTop: "4%" }}>
                <TypoBody>Farmer Successfuly Removed</TypoBody>
              </div>
              <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                <DialogButton
                  onClick={() => setOpenModalSuccess(false)}
                  color="primary"
                  variant="outlined"
                >
                  Ok
                </DialogButton>
              </div>
            </Dialog>
          )}
        </Table>
      </div></>
  );
}
