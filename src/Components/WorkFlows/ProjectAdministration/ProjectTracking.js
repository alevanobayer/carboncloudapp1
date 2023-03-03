import { useState, useEffect ,useCallback} from "react";
import { MenuItem, Select } from "@mui/material";
import {
  Table,
  TableTopBar,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Icon,
  IconButton,
  LabelBadge,
  Pagination,Elevation,TypoBody
} from "@element/react-components";
import { GET_REQUEST, PUT_REQUEST } from "../../Utilities/RestEndPoint";
import DialogBox from "../../Utilities/DialogBox";

export default function ProjectTracking(props) {
  const [monitoringData, setMonitoringData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState();
  const [confirm, setConfirm] = useState(false);
  const [changeItem, setChangeItem] = useState();
  const [changeTargetValue, setChangeTargetValue] = useState();
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectData, setSelectData] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  }, []);
  let groupValue = props?.accounts[0].idTokenClaims.groups.includes(
    "532927d4-a1fd-4d48-bdda-e4d1882c5847"
  );
  const handleChange = (e) => setSearchTerm(e.target.value);
  const refreshPage = () => {
    window.location.reload();
  };
  const handleFilterChange = (event) => {
    setSelectData(event.target.value);
  };
  const handleDropdownChange = (i, e, item) => {
    setOpenModal(true);
    setConfirm(false);
    setChangeItem(item);
    setChangeTargetValue(e);
  };

  useEffect(() => {
    if (confirm) {
      const payloadData = `${changeItem.projectId}/${changeTargetValue.target.value}`;
      let newMonitoringData = [...monitoringData];

      newMonitoringData.filter(
        (a) => a.projectId === changeItem.projectId
      )[0].projStatus = changeTargetValue.target.value;
      setMonitoringData(newMonitoringData);

      async function updateStatus() {
        const projectMonitoring = await PUT_REQUEST(
          "project-status",
          payloadData
        );
      }
      updateStatus();
    }
  }, [confirm]);


  useEffect(() => {
    async function fetchData() {
      let projectMonitoring = await GET_REQUEST("projects-monitor");
      setMonitoringData(projectMonitoring);
      setSearchResults(projectMonitoring);
    }
    fetchData();
  }, []);
 

  useEffect(() => {
    if (searchTerm.length > 0) {
      if (selectData === "flowType") {
        const results = searchResults.filter((o) =>
          o.flowType.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      } else if (selectData === "projectId") {
        const results = searchResults.filter((o) =>
          o.projectId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      } else if (selectData === "companyName") {
        const results = searchResults.filter((o) =>
          o.companyName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      } else if (selectData === "countryName") {
        const results = searchResults.filter((o) =>
          o.countryName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      } else if (selectData === "cropName") {
        const results = searchResults.filter((o) =>
          o.cropName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      } else if (selectData === "createdDate") {
        const results = searchResults.filter((o) =>
          o.createdDate.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      }
      else if (selectData === "projStatus") {
        const results = searchResults.filter((o) =>
          o.projStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMonitoringData(results);
      }
    } else {
      setMonitoringData(searchResults);
    }
  }, [searchTerm]);
  const sorting = (type) => {
    if (sortingOrder === "asc") {
      const sorted = [...monitoringData].sort((a, b) => {
        if (a[type] > b[type]) {
          return 1;
        } else {
          return -1;
        }
      });
      setMonitoringData(sorted);
      setSortingOrder("dsc");
    }
    if (sortingOrder === "dsc") {
      const sorted = [...monitoringData].sort((a, b) => {
        if (a[type] < b[type]) {
          return 1;
        } else {
          return -1;
        }
      });
      setMonitoringData(sorted);
      setSortingOrder("asc");
    }
  };
  const getDateFormat = (dateValue) => {
    var dateObj = new Date(dateValue);
    var year = dateObj.getUTCFullYear();
    return year;
  };
  return (
    <><Elevation elevation="2">
    <div
      style={{ zIndex: "1",left:"0", backgroundColor: "#F5F5F5", marginTop: "70px", height: "50px", position: "fixed", border: "1px solid #F5F5F5", width: "100%", }}
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
          Administration {">"}Track Projects
        </span>
      </TypoBody>
    </div>
  </Elevation>
      <div className="trackingContent">
        <Table
          leadingContent={
            <TableTopBar
              title="Project Details"
              actions={
                <>
                  <input
                    type="text"
                    disabled={selectData === ""}
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={handleChange}
                  />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectData}
                    displayEmpty
                    renderValue={
                      selectData !== ""
                        ? undefined
                        : () => <div>Select Filter</div>
                    }
                    onChange={handleFilterChange}
                    style={{
                      height: "32px",
                      width: "126px",
                    }}
                  >
                    <MenuItem value="flowType">Flow Type</MenuItem>
                    <MenuItem value="projectId">Project ID</MenuItem>
                    <MenuItem value="companyName">Company</MenuItem>
                    <MenuItem value="countryName">Country</MenuItem>
                    <MenuItem value="cropName">Crop</MenuItem>
                    <MenuItem value="createdDate">Year</MenuItem>
                    <MenuItem value="projStatus">Status</MenuItem>
                  </Select>
                  <Button
                    leadingIcon="refresh"
                    variant="outlined"
                    label="refresh"
                    style={{
                      marginLeft: "4px",
                      borderRadius: "4px",
                      // color: "#0464C4",
                    }}
                    onClick={refreshPage}
                  />
                </>
              }
            />
          }
          trailingContent={
            <Pagination
            controlled
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={monitoringData.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleOnItemsPerPageChange}
            itemsPerPageOptions={[5,10, 25, 50, 100]}
          />
          }
        >
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Project ID
                {sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    style={{ marginLeft: "-14px" }}
                    onClick={() => sorting("projectId")}
                  />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    style={{ marginLeft: "-14px" }}
                    onClick={() => sorting("projectId")}
                  />
                )}
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Flow Type
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Company
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Country
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Crop
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Year
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Status{sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    style={{ marginLeft: "-14px" }}
                    onClick={() => sorting("projStatus")}
                  />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    style={{ marginLeft: "-14px" }}
                    onClick={() => sorting("projStatus")}
                  />
                )}
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {monitoringData.length > 0 &&
              monitoringData
                .slice(itemsPerPage * (currentPage - 1),itemsPerPage * (currentPage - 1) + itemsPerPage)
                .map((item, index) => (
                  <TableRow
                    key={item.projectId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="wordWrapTableCell"
                      
                    >
                      {item.projectId}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.flowType}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.companyName}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.countryName}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      <LabelBadge
                        label={item.cropName}
                        labelType={"string"}
                        themeColor={
                          item.cropName === "Corn" ? "primary" : "secondary"
                        }
                      />
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {getDateFormat(item.createdDate)}
                    </TableCell>

                    <TableCell className="wordWrapTableCell">
                      <Select
                        name="projStatus"
                        style={{
                          height: "30px",
                          width: "90px",
                          backgroundColor: "#F5F5F5",
                        }}
                        value={item.projStatus === "Open" ? "Open" : "Closed"}
                        // disabled={groupValue === false ? true : false}
                        onChange={(e) => handleDropdownChange(index, e, item)}
                      >
                        {["Open", "Closed"]?.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}

            {monitoringData.length === 0 && (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            )}
            <TableRow></TableRow>
          </TableBody>
        </Table>
        {openModal && (
          <DialogBox
            openModal={openModal}
            setOpenModal={setOpenModal}
            status={status}
            confirm={confirm}
            setConfirm={setConfirm}
            setStatus={setStatus}
            confirmationAlert={true}
            confirmationAlertMsg="Status will be changed. Do you want to Change?"
          />
        )}
      </div>
    </>
  );
}
