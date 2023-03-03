import { useState, useEffect,useCallback } from "react";
import "../../FeasibilityStudy/FeasibilityStudy.css";
import {
  Table,
  TableTopBar,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button, LabelBadge,
  Checkbox,CircularProgress,
  Pagination, Dialog, TypoDisplay, DialogButton,TypoBody,Elevation
} from "@element/react-components";
import {
  GET_REQUEST,
  POST_REQUEST,
} from "../../../../Components/Utilities/RestEndPoint";
import { useHistory } from "react-router-dom";
import LoadingIcon from "../../../Utilities/LoadingIcon";

export default function ExportSOCData(props) {
  const [loadingMask, setLoadingMask] = useState(false);
  const [FarmerDetailData, setFarmerDetailData] = useState([]);
  const [projectID, setProjectID] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const history = useHistory();
  const [errorData, setErrorData] = useState();
  const handleOnItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  }, []);
  const getDateFormat = (dateValue) => {
    var dateObj = new Date(dateValue);
    var year = dateObj.getUTCFullYear();
    return year;
  };

  const handleToClose = () => {
    setOpenModal(false);
    window.location.reload();
  };
  const handleClick = () => {
    setOpenModal(true);
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
  const flowType = "SOC Quantification";
  const handleSelectAllClick = (event, item) => {
    if (event) {
      const newSelected = item.map((n) => n.projectId);
      const sendAllData = item.map((n) => {
        return {
          projectName:n.projectName,
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
      projectName:item.projectName,
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

  useEffect(() => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getAllClosedSOCQuantificationProjects/${flowType}`
      );
      setFarmerDetailData(projectSelection);
    }
    fetchData();
  }, [projectID]);
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
        > <span>
                      <a onClick={() => history.push("/home")}>Home</a> {">"} Emissions & SOC Quantification Study {">"}Export Emissions & SOC Quantification Data
          </span>
        </TypoBody>
      </div>
    </Elevation><div className="trackingContent">
        <div>
          {/* {loadingMask ? <LoadingIcon /> : null} */}
          {selected.length > 0 && <LabelBadge
            label={selectedCount}
            labelType={"string"}
            themeColor={"primary"} />}
        </div>
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
            title="Trigger CFT"
            actions={<>
              <Button
                variant="outlined"
                onClick={() => history.push("/exportSOCDataStatus")}
                label={"CFT Status"}
                style={{ marginRight: "20px" }} />
              <Button
                  variant={requestData.length === 0?"outlined":"filled"}
                disabled={requestData.length === 0}
                onClick={() => handleClick()}
                label={"Send to CFT"} />
            </>} />}
        >
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}>
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 &&
                    selected.length < FarmerDetailData.length}
                  checked={FarmerDetailData.length > 0 &&
                    selected.length === FarmerDetailData.length}
                  onChange={(event) => handleSelectAllClick(event, FarmerDetailData)} />
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Project Name
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Project ID
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
                Crop Type
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Year
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {FarmerDetailData.length > 0 &&
              FarmerDetailData.slice(
                itemsPerPage * (currentPage - 1), itemsPerPage * (currentPage - 1) + itemsPerPage).map((item, index) => {
                  const isItemSelected = selected.indexOf(item.projectId) !== -1;

                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        className="wordWrapTableCell"

                        onClick={(event) => handleSelect(event, item)}
                      >
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                      <TableCell
                        className="wordWrapTableCell"

                      >
                        {item.projectName}
                      </TableCell>
                      <TableCell
                        className="wordWrapTableCell"

                      >
                        {item.projectId}
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
                          themeColor={item.cropName === "Corn" ? "primary" : "secondary"} />
                      </TableCell>
                      <TableCell className="wordWrapTableCell">
                        {getDateFormat(item.createdDate)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            {FarmerDetailData.length === 0 && (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {openModal && (
          <Dialog open={openModal} onClose={handleToClose} preventClose={true}>
            <div style={{ display: "flex" }}>
              <TypoDisplay level={6}> CFT Request Processing</TypoDisplay>
            </div>
            {loadingMask ? <><div style={{ marginTop: "4%" }}>
              <TypoBody>
                {" "}
                Request in Progress.
              </TypoBody>
            </div><div style={{ display: 'flex', justifyContent: 'center', overflowY: "hidden" }}>
                <CircularProgress />
              </div></> : errorData && errorData !== "" ? (
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
              ) : <><div style={{ marginTop: "4%" }}>
                <TypoBody>
                  {" "}
                  Request Submitted Successfully.
                </TypoBody>
              </div><div style={{ marginTop: "4%", textAlignLast: "right" }}>

                <DialogButton
                  onClick={handleToClose}
                  color="primary"
                  variant="outlined"
                >
                  Ok
                </DialogButton>
              </div></>}
          </Dialog>
        )}
      </div></>
  );
}
