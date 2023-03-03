import React, { useState, useCallback, useEffect } from "react";
import {
  Select,
  SelectOption,
  Button,
  TypoDisplay,
  Textfield,Elevation,TypoBody
} from "@element/react-components";
import "./ProjectCreation.css";
// import { Button, MenuItem, Select } from "@mui/material";
import { FeasibilityStudyJSON } from "../CommonComponents/DefaultDataJSON/FeasibilityStudyJSON";
import { GET_REQUEST, POST_REQUEST } from "../../Utilities/RestEndPoint";
import LoadingIcon from "../../Utilities/LoadingIcon";
import DialogBox from "../../Utilities/DialogBox";
import { useHistory } from "react-router-dom";

export default function ProjectCreation(props) {
  const history = useHistory();
  const [flowType, setFlowType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cropName, setCropName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [companyDropDownList, setCompanyDropDownList] = useState([]);
  const [countryDropDownList, setCountryDropDownList] = useState([]);
  const [cropDropDownList, setCropDropDownList] = useState([]);
  const [flowTypeDropDownList, setFlowTypeDropDownList] = useState([]);
  const [validation, setValidation] = useState(true);
  const [loadingMask, setLoadingMask] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");
  const [apiResponseMessage, setApiResponseMessage] = useState("");
  const ITEM_HEIGHT = 58;
  const [value, setValue] = useState();
  const handleflowChange = useCallback((val) => {
    setFlowType(val.value);
  }, []);
  const handleCompanyChange = useCallback((val) => {
    setCompanyName(val.value);
  }, []);
  const handleCountryChange = useCallback((val) => {
    setCountryName(val.value);
  }, []);
  const handleCropChange = useCallback((val) => {
    setCropName(val.value);
  }, []);
  const projectNameValidation = (e) => {
   
  };
  const handleProjectName = useCallback((e) => {
    
    setProjectName(e.target.value)
    const regEx = /[-!$%^&*()_+|~=`@\\#{}\[\]:";'<>?,.\/]/g;

    if (regEx.test(e.target.value)) {
      setMessage("No special Character is allowed");
    } else {
      setMessage("");
    }

  }, [setProjectName]
  );
  const data = [{ ...FeasibilityStudyJSON.companyDetails }];

  useEffect(() => {
    async function fetchData() {
      let responseData = await GET_REQUEST("getAllProjectInitDetails");
      setCompanyDropDownList(responseData.companiesList);
      setCountryDropDownList(responseData.countriesList);
      setCropDropDownList(responseData.cropList);
      setFlowTypeDropDownList(responseData.flowTypeList);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (
      flowType === "" ||
      companyName === "" ||
      countryName === "" ||
      cropName === "" ||
      projectName === ""||message!=""
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [flowType, companyName, countryName, cropName, projectName]);

  const saveData = () => {
    setLoadingMask(true);
    const data = {
      flowType: flowType,
      companyName: companyName,
      countryName: countryName,
      cropName: cropName,
      projectName: projectName,
      createdBy: props.accounts[0].name,
      projStatus: "Open",
    };
    async function saveDataAPICall() {
      let responseData = await POST_REQUEST("project-create", data);
      if (responseData.statusCode == 201) {
        setApiResponseMessage(
          `The project ${responseData.projectId} has been created.`
        );
        setFlowType("");
        setCompanyName("");
        setCountryName("");
        setCropName("");
        setProjectName("");
      } else {
        setApiResponseMessage(`${responseData.message}`);
      }
      setLoadingMask(false);
      setStatus(responseData);
      setOpenModal(true);
    }
    saveDataAPICall();
    // setOpenModal(true);
  };

  const companyDropDownListSort = companyDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );
  const flowTypeDropDownListSort = flowTypeDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );
  const countryDropDownListSort = countryDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );
  const cropDropDownListSort = cropDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );

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
            Administration {">"}Create Projects
          </span>
        </TypoBody>
      </div>
    </Elevation><div className="creationContent">
        {/* {loadingMask ? <LoadingIcon /> : null} */}

        <div className="backBox">
          <TypoDisplay level={6} className="project">
            New Project
          </TypoDisplay>
          <Select
            variant="outlined"
            onChange={handleflowChange}
            value={flowType}
            label={"Flow Type"}
            className="dropDownInput"
          >
            {flowTypeDropDownListSort?.map((item, index) => {
              return (
                <SelectOption key={index} value={item}>
                  {item}
                </SelectOption>
              );
            })}
          </Select>
          <div style={{ marginTop: "3%" }}>
            {" "}
            <Select
              variant="outlined"
              onChange={handleCompanyChange}
              value={companyName}
              label={"Company Name"}
              className="dropDownInput"
            >
              {companyDropDownListSort?.map((item, index) => {
                return (
                  <SelectOption key={index} value={item}>
                    {item}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div style={{ marginTop: "3%" }}>
            {" "}
            <Select
              variant="outlined"
              onChange={handleCountryChange}
              value={countryName}
              label={"Country Name"}
              className="dropDownInput"
            >
              {countryDropDownListSort?.map((item, index) => {
                return (
                  <SelectOption key={index} value={item}>
                    {item}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div style={{ marginTop: "3%" }}>
            {" "}
            <Select
              variant="outlined"
              onChange={handleCropChange}
              value={cropName}
              label={"Crop"}
              className="dropDownInput"
            >
              {cropDropDownListSort?.map((item, index) => {
                return (
                  <SelectOption key={index} value={item}>
                    {item}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div style={{ marginTop: "3%" }}>
            <Textfield
              type="text"
              variant="outlined"
              label="Project Name"
              name="Project Name"
              fullWidth
              value={projectName}
              // onBlur={(e) => projectNameValidation(e)}
              onChange={(e) => handleProjectName(e, "Project Name")} />
          </div>
          {message && (
            <span style={{ color: "red", fontSize: "12px", marginLeft: "9px" }}>
              {message}
            </span>
          )}
          <div style={{ marginTop: "3%" }}>
            <Button
              variant="filled"
              disabled={validation}
              onClick={saveData}
              className="saveButton"
              label="save"
              fullWidth />
          </div>
          {openModal && (
            <DialogBox
              openModal={openModal}
              setOpenModal={setOpenModal}
              status={status}
              setStatus={setStatus}
              apiResponseMessage={apiResponseMessage} />
          )}
        </div>
      </div></>
  );
}
