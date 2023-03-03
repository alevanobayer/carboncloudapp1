import { useState, useEffect, useCallback } from "react";
import "../../FeasibilityStudy/FeasibilityStudy.css";
import {
  GET_REQUEST,
  POST_REQUEST,
} from "../../../../Components/Utilities/RestEndPoint";
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
  LabelBadge,
  Checkbox,
  Pagination,
  CircularProgress,
  Dialog,
  TypoDisplay,
  DialogButton,
  TypoBody,
  TabBar,
  Tab,
  Icon, Elevation,
  Modal,
} from "@element/react-components";
import JsonEditor from "jsoneditor";
import DialogCftDetail from "./DialogCftDetail";
import { useHistory } from "react-router-dom";
export default function ExportSOCDataStatus(props) {
  const [FarmerDetailData, setFarmerDetailData] = useState([]);
  const [loadingMask, setLoadingMask] = useState(false);
  const [projectID, setProjectID] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalData, setOpenModalData] = useState(false);
  const [cftDetailData, setCftDetailData] = useState([]);
  const [value, setValue] = useState("one");
  const history = useHistory();
  const [json, setJson] = useState();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isCft, setIsCft] = useState();
  const [openModalCft, setOpenModalCft] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const [errorData, setErrorData] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOnItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  }, []);
  const getDateFormat = (dateValue) => {
    var dateObj = new Date(dateValue);

    var year = dateObj.getUTCFullYear();
    return year;
  };

  const handleClick = () => {
    setOpenModalData(true);
    setLoadingMask(true);
    async function coolFarmToolCall() {
      let responseData = await POST_REQUEST(
        "cool-farm-tool-batch",
        requestData
      );
      if (responseData.message && responseData.message !== "") {
        setErrorData("Request Submitted Successfully.");
      }
      setLoadingMask(false);
    }

    coolFarmToolCall();
  };
  const cftBack = () => {
    history.push("/exportSOCData");
    window.location.reload();
  };
  const cftDetails = (projectId) => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getAllCFTIdDetails/${projectId}`
      );
      setCftDetailData(projectSelection);
      setProjectID(projectId);
    }
    setOpenModal(true);
    fetchData();
  };

  const handleSelectAllClick = (event, item) => {
    if (event) {
      const newSelected = item.map((n) => n.projectId);
      const sendAllData = item.map((n) => {
        return {
          projectName: n.projectName,
          projectId: n.projectId,
          companyName: n.companyName,
          countryName: n.countryName,
          cropName: n.cropName,
          createdDate: getDateFormat(n.createdDate),
          createdBy: props.accounts[0].name,
        };
      });
      setRequestData(sendAllData);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleSelect = (event, item) => {

    const selectedIndex = selected.indexOf(item.projectId);
    let newSelected = [];
    const sendData = {
      projectName: item.projectName,
      projectId: item.projectId,
      companyName: item.companyName,
      countryName: item.countryName,
      cropName: item.cropName,
      createdDate: getDateFormat(item.createdDate),
      createdBy: props.accounts[0].name,
    };
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item.projectId);
      requestData.push(sendData);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    if (selectedIndex !== -1) {
      requestData.splice(selectedIndex, 1);
    }
    setSelected(newSelected);
  };
  const handleStatusData = (status) => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getProjectsOnStatus?status=${status}`
      );
      setFarmerDetailData(projectSelection);
    }
    fetchData();
  };
  useEffect(() => {
    handleStatusData("All");
    // handleStatusData("Success");
    // handleStatusData("Failed");
  }, []);

  const handleToClose = () => {
    setOpenModalData(false);
    window.location.reload();
  };
  const handleClose = () => {
    setOpenModalCft(false);
    // window.location.reload();
  };
  const handleCloseCft = () => {
    setOpenModal(false);
    window.location.reload();
  };
  let selectedCount = `${selected.length}selected`;
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
        >             <a onClick={() => history.push("/home")}>Home</a> {">"} <span onClick={() => history.push("/exportSOCData")}>Emissions & SOC Quantification Study</span> {">"}<span onClick={() => history.push("/exportSOCData")}>Export Emissions & SOC Quantification Data</span>{">"}CFT Status
        </TypoBody>
      </div>
    </Elevation><div className="trackingContent">
        <div>
          {selected.length > 0 && (
            <LabelBadge
              label={selectedCount}
              labelType={"string"}
              themeColor={"primary"} />
          )}
        </div>
        <div>
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
              title="Project Status"
              actions={<>
                <TabBar
                  value={value}
                  onChange={handleChange}
                  activeTabIndex={0}
                >
                  <Tab value="one" onClick={() => handleStatusData("All")}>
                    ALL
                  </Tab>
                  <Tab
                    value="two"
                    onClick={() => handleStatusData("Success")}
                  >
                    SUCCESS
                  </Tab>
                  <Tab
                    value="three"
                    onClick={() => handleStatusData("Failed")}
                  >
                    FAILED
                  </Tab>
                </TabBar>
                <Button
                  variant={requestData.length === 0 ? "outlined" : "filled"}
                  disabled={requestData.length === 0}
                  onClick={() => handleClick()}
                  label={"Send to CFT"}
                  fullWidth={true} />
              </>} />}
          >
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  <Checkbox
                    color="primary"
                    disabled={FarmerDetailData.some(obj => obj.cftStatus === "InProgress")}
                    indeterminate={selected.length > 0 &&
                      selected.length < FarmerDetailData.length}
                    checked={FarmerDetailData.length > 0 &&
                      selected.length === FarmerDetailData.length}
                    onChange={(event) => handleSelectAllClick(event, FarmerDetailData)} />
                </TableHeaderCell>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Project Name
                </TableHeaderCell>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Project ID
                </TableHeaderCell>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Company{" "}
                </TableHeaderCell>

                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Country{" "}
                </TableHeaderCell>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Crop Type
                </TableHeaderCell>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Year
                </TableHeaderCell>
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  CFT Status
                </TableHeaderCell>
                {/* <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  Download Results
                </TableHeaderCell> */}
                <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  View
                </TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            {FarmerDetailData.length === 0 && (
              <TableCell>No data Found</TableCell>
            )}
            <TableBody>
              {FarmerDetailData.length > 0 &&
                FarmerDetailData.slice(
                  itemsPerPage * (currentPage - 1),
                  itemsPerPage * (currentPage - 1) + itemsPerPage
                ).map((item, index) => {
                  const isItemSelected = selected.indexOf(item.projectId) !== -1;

                  return (
                    <TableRow key={index}>
                      <TableCell
                        className="wordWrapTableCellView"
                        onClick={item.cftStatus === "InProgress" ? (e) => e.preventDefault() : (event) => handleSelect(event, item)}
                      >
                        <Checkbox color="primary" checked={isItemSelected} disabled={item.cftStatus === "InProgress"} />
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        {item.projectName}
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        {item.projectId}
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        {item.companyName}
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        {item.countryName}
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        <LabelBadge
                          label={item.cropName}
                          labelType={"string"}
                          themeColor={item.cropName === "Corn" ? "primary" : "secondary"} />
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        {getDateFormat(item.createdDate)}
                      </TableCell>
                      <TableCell className="wordWrapTableCellView">
                        {item.cftStatus}
                      </TableCell>
                      {/* <TableCell className="wordWrapTableCellView">
                      <Icon
                          icon="download"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            cftDownload(item.projectId);
                          } } />
                      </TableCell> */}
                      <TableCell className="wordWrapTableCellView">
                        <Icon
                          icon="remove_red_eye"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            cftDetails(item.projectId);
                          }} />{" "}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <Modal
                open={openModal}
                preventClose={true}
                onClose={() => handleCloseCft()}
                modalSize={"max"}
                title="Detailed CFT Status"
                headerActions={<div style={{ fontSize: "14px", }}>
                  {projectID}
                </div>}
              >
                <DialogCftDetail
                  cftDetailData={cftDetailData}
                  projectID={projectID}
                  json={json}
                  setJson={setJson}
                  onClose={() => handleClose()}
                  isCft={isCft}
                  setIsCft={setIsCft}
                  setOpenModalCft={setOpenModalCft} />
              </Modal>
              <Modal
                open={openModalCft}
                modalSize={"max"}
                preventClose={true}
                onClose={() => handleClose()}
                title=" CFT Input Update"
                headerActions={<div style={{ fontSize: "14px", }}>
                  {isCft}
                </div>}
              >
                <div style={{ marginTop: "4%"}}>
                  {JSON.stringify(json) === "{}" ? (
                    <span>Input data not found. Please trigger CFT again.</span>
                  ) : (
                    <pre>{JSON.stringify(json, null, 2)}</pre>
                  )}
                </div>
                {isDisplayed && (
                  <div>
                    <div
                      ref={(elem) => (editor = new JsonEditor(elem, { mode: "text" }, json))} />
                  </div>
                )}
                <div style={{ marginTop: "4%", textAlignLast: "right" }}></div>
              </Modal>
              {openModalData && (
                <Dialog open={openModalData} onClose={handleToClose} preventClose={true}>
                  <div style={{ display: "flex" }}>
                    <TypoDisplay level={6}> CFT Request Processing</TypoDisplay>
                  </div>

                  {loadingMask ? (
                    <>
                      <div style={{ marginTop: "4%" }}>
                        <TypoBody> Request in Progress.</TypoBody>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          overflowY: "hidden",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    </>
                  ) : errorData && errorData !== "" ? (
                    <>
                      <div style={{ marginTop: "4%" }}>
                        <TypoBody> {errorData}</TypoBody>
                      </div>
                      <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                        <DialogButton
                          onClick={handleToClose}
                          color="primary"
                          variant="outlined"
                        >
                          Ok
                        </DialogButton>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ marginTop: "4%" }}>
                        <TypoBody> Request Submitted Successfully.</TypoBody>
                      </div>
                      <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                        <DialogButton
                          onClick={handleToClose}
                          color="primary"
                          variant="outlined"
                        >
                          Ok
                        </DialogButton>
                      </div>
                    </>
                  )}
                </Dialog>
              )}
            </TableBody>
          </Table>
          <Button
            label="back"
            leadingIcon="arrow_back"
            variant="outlined"
            onClick={() => cftBack()}
            style={{
              marginTop: "3%",
              marginBottom: "3%",
              display: "flex",
              marginLeft: "91.6%",
              position: "relative",
            }} />
        </div>
      </div></>
  );
}
