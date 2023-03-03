import { useState, useEffect } from "react";
import axios from "axios";
import "../../FeasibilityStudy/FeasibilityStudy.css";
import {
  Select,
  SelectOption,
  Button,
  TypoDisplay,
  Dialog,
  TypoBody,
  DialogButton,Elevation
} from "@element/react-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { FeasibilityStudyJSON } from "../../CommonComponents/DefaultDataJSON/FeasibilityStudyJSON";
import { GET_REQUEST } from "../../../Utilities/RestEndPoint";

export default function ExportFeasibilityStudy(props) {
  const [exportData, setExportData] = useState([]);
  const [machine, setMachine] = useState();
  const [projectExportData, setProjectExportData] = useState([]);
  const [farmExportData, setFarmExportData] = useState([]);
  const [projectID, setProjectID] = useState();
  const [farmerID, setFarmerID] = useState();
  const [farmer, setFarmer] = useState();
  const [farmerName, setFarmerName] = useState();
  const [download, setDownload] = useState(false);
  const [downloadQuestion, setDownloadQuestion] = useState(false);
  const [openModalExtraction, setOpenModalExtraction] = useState(false);
  let token=window.localStorage.getItem('jwt');
  const ITEM_HEIGHT = 58;
  useEffect(() => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getAllExportFeasibilityStudyDetails`
      );
      setExportData(projectSelection);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function downloadApi() {
      try {
        // It doesn't matter whether this api responds with the Content-Disposition header or not
        const response = await axios.get(
          `https://backend-carboncloud.emea-dev.int.bayer.com/api/excelExportMachineUse/${projectID}/${farmerID}/${farmer}/${farmerName}`,
          {
            responseType: "blob", // this is important!
            headers: {  'Authorization': `Bearer ${token}` },
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Machine_Data_${farmerName}.xlsx`); //this is the name with which the file will be downloaded
        link.click();
        // no need to append link as child to body.
        setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
        setDownload(false);
      } catch (e) {
        setOpenModalExtraction(true);
      } //error handling }
    }

    if (download) {
      downloadApi();
    }
  }, [download]);
  useEffect(() => {
    async function downloadQuestionApi() {
      try {
        // It doesn't matter whether this api responds with the Content-Disposition header or not
        const response = await axios.get(
          `https://backend-carboncloud.emea-dev.int.bayer.com/api/excelExportQuestionnaire/${projectID}/${farmerID}/${farmer}/${farmerName}`,
          {
            responseType: "blob", // this is important!
            headers: {  'Authorization': `Bearer ${token}` },
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Questionnaire_Data_${farmerName}.xlsx`); //this is the name with which the file will be downloaded
        link.click();
        // no need to append link as child to body.
        setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
        setDownloadQuestion(false);
      } catch (e) {
        setOpenModalExtraction(true);
      } //error handling }
    }

    if (downloadQuestion) {
      downloadQuestionApi();
    }
  }, [downloadQuestion]);

  const data = [{ ...FeasibilityStudyJSON.companyDetails }];
  const handleDropdownChange = async (ev, name) => {
    if (name === "ProjectID") {
      
      setFarmer("");
      let projectIDSave=ev.value
      let projectIdName= projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave;
      setProjectID(projectIdName);
      let farmerSelection = await GET_REQUEST(
        `getAllFarmerAndFarmsDetails?projectId=${projectIdName}`
      );
      setProjectExportData(farmerSelection);
    } else if (name === "FarmerID") {
      setFarmerID(ev.value);
      setFarmer("");
      let selectedFarm = await GET_REQUEST(
        `getFarmsDetails?projectId=${projectID}&farmerId=${ev.value}`
      );
      setFarmExportData(selectedFarm);
    } else if (name === "Farm") {
      let farmerNameSelected = farmExportData.filter(
        (item, index) => item.farmId === ev.value
      );
      setFarmerName(farmerNameSelected[0].farmName);
      setFarmer(ev.value);
    }
  };

  const farmDisable = !(projectID?.length >= 0 && farmerID?.length >= 0);
  const farmerIdDisable = !(projectID?.length >= 0);
  const exportDisable = !(
    projectID?.length >= 0 &&
    farmerID?.length >= 0 &&
    farmer?.length >= 0
  );
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
            <a onClick={() => history.push("/home")}>Home</a> {">"} Feasibility Study {">"}Export Feasibility Data
          </span>
        </TypoBody>
      </div>
    </Elevation><div className="creationContent">
        <div className="backBox">
          <TypoDisplay level={6} className="project">
            Export Feasibility Study Data
          </TypoDisplay>
          <div style={{ marginTop: "3%" }}>
            <Select
              label={"Project ID"}
              variant="outlined"
              value={projectID}
              onChange={(ev) => handleDropdownChange(ev, "ProjectID")}
            >
              {exportData.length > 0 ? (
                exportData &&
                exportData?.map((item) => {
                  return <SelectOption value={item}>{item}</SelectOption>;
                })
              ) : (
                <SelectOption value="No Record Found">
                  No Record Found
                </SelectOption>
              )}
            </Select>
          </div>
          <div style={{ marginTop: "3%" }}>
            <Select
              label={"Farmer ID"}
              variant="outlined"
              disabled={farmerIdDisable}
              value={farmerID}
              onChange={(ev) => handleDropdownChange(ev, "FarmerID")}
            >
              {Array.isArray(projectExportData) &&
                projectExportData?.map((item, index) => {
                  return (
                    <SelectOption key={index} value={item.farmerId}>
                      {item.farmerId}
                    </SelectOption>
                  );
                })}
            </Select>
          </div>
          <div style={{ marginTop: "3%" }}>
            <Select
              label={"Farm"}
              variant="outlined"
              disabled={farmDisable}
              value={farmer}
              onChange={(evt) => handleDropdownChange(evt, "Farm")}
            >
              {Array.isArray(farmExportData) &&
                farmExportData?.map((item, index) => {
                  return (
                    <SelectOption key={index} value={item.farmId}>
                      {item.farmName}
                    </SelectOption>
                  );
                })}
            </Select>
          </div>
          <br />
          <div className="parentInput">
            <div className="childInputExport">
              <Button
                variant="filled"
                fullWidth
                themeColor='primary'
                disabled={exportDisable}
                onClick={() => setDownload(true)}
              >
                {" "}
                Machine Data Export
              </Button>
            </div>
            <div className="childInputExport">
              {" "}
              <Button
                variant="outlined"
                fullWidth
                disabled={exportDisable}
                onClick={() => setDownloadQuestion(true)}
              >
                Questionnaire Data Export
              </Button>
            </div>
            {openModalExtraction && (
              <Dialog open={openModalExtraction}>
                <div style={{ display: "flex" }}>
                  <CheckCircleOutlineIcon
                    sx={{ color: "green", marginRight: "1%" }} />
                  <TypoDisplay level={6}>Failure</TypoDisplay>
                </div>
                <div style={{ marginTop: "4%" }}>
                  <TypoBody>No records Found</TypoBody>
                </div>

                <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                  <DialogButton
                    onClick={() => setOpenModalExtraction(false)}
                    color="primary"
                    variant="outlined"
                  >OK</DialogButton>
                </div>
              </Dialog>
            )}
          </div>
        </div>
      </div></>
  );
}
