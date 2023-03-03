import { useState, useReducer, useEffect } from "react";
import {
  Icon,
  Button,
  TypoDisplay,
  Dialog,Tooltip,
  TypoBody,
  DialogButton,TypoSubtitle,Elevation
} from "@element/react-components";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import FarmerConsent from "../CommonComponents/FarmerConsent/FarmerConsent";
import BaselineProcess from "../CommonComponents/BaselineProcess";
import ProjectSelectionEmmision from "./ProjectSelectionEmmision/ProjectSelectionEmmsion";
import {
  GET_REQUEST,
  POST_REQUEST,
} from "../../../Components/Utilities/RestEndPoint";
import DialogBoxEmission from "../../../Components/Utilities/DialogEmission";
import { EmissionJSON } from "../CommonComponents/DefaultDataJSON/EmissionJSON";


const steps = ["Project Selection", "Farmer Consent", "Baseline Process"];

export default function EmissionStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [farmerIDData, setFarmerIDData] = useState([]);
  const [projectIDData, setProjectIDData] = useState([]);
  const [status, setStatus] = useState();
  const [survey, setSurvey] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalSurvey, setOpenModalSurvey] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [apiResponseMessage, setApiResponseMessage] = useState("");

  const [disableEmissionValues, setDisableEmissionValues] = useState();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [baseLineModal, setbaseLineModal] = useState(false);
  const [baseLine, setBaseLine] = useState();
  const flowType = "SOC Quantification";
  /*Start Handling State management Logic*/
  const ACTION_TYPES = {
    "UPDATE_FARMER-CONSENT-DATA": "update_farmer-consent-data",
    "UPDATE_COMPANY-DETAILS": "update_company-details",
    "UPDATE_BASELINE-SOIL-DATA": "update_baseline-soil-data",
    "UPDATE_BASELINE-FILE-DATA": "update_baseline-file-data",
  };
  function reducer(state, action) {
    switch (action.type) {
      case ACTION_TYPES["UPDATE_COMPANY-DETAILS"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_FARMER-CONSENT-DATA"]:
        return { ...action.payload };

      case ACTION_TYPES["UPDATE_BASELINE-SOIL-DATA"]:
        return { ...action.payload };

      case ACTION_TYPES["UPDATE_BASELINE-FILE-DATA"]:
        return { ...action.payload };
      default:
        throw new Error();
    }
  }
  let editEmissionData = props?.location?.state?.editEmission;
  const [disableFarmerValues, setDisableFarmerValues] = useState();
  const [defaultEmission, dispatch] = useReducer(
    reducer,
    JSON.parse(
      JSON.stringify(editEmissionData ? editEmissionData : EmissionJSON)
    )
  );
  const updateCompanyDetailsHandler = (companyDetailsObj) => {
    const data = { ...defaultEmission, companyDetails: companyDetailsObj };
    dispatch({ payload: { ...data }, type: "update_company-details" });
  };
  const updateFarmerConsentDetailsHandler = (farmerDetailObj) => {
    const data = { ...defaultEmission, farmerConsent: farmerDetailObj };
    dispatch({ payload: { ...data }, type: "update_farmer-consent-data" });
  };

  const updateBaselineHandler = (BaselineObj) => {
    const data = { ...defaultEmission, baselineSoil: BaselineObj };
    dispatch({ payload: { ...data }, type: "update_baseline-soil-data" });
  };
  const updateBaselineFileHandler = (BaselineObj) => {
    const data = { ...defaultEmission, baselineField: BaselineObj };
    dispatch({ payload: { ...data }, type: "update_baseline-file-data" });
  };
  const [loadingMask, setLoadingMask] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(
    defaultEmission?.farmerConsent?.actualFileName
  );
  const [fileUploadResponseFarmer, setFileUploadResponseFarmer] = useState(
    defaultEmission?.farmerConsent?.uploadLoc
  );
  const [uploadFieldFileName, setUploadFieldFileName] = useState(
    defaultEmission.baselineField?.actualFileName
  );
  const [uploadSoilFileName, setUploadSoilFileName] = useState(
    defaultEmission.baselineSoil?.actualFileName
  );
  const [fileUploadResponseField, setFileUploadResponseField] = useState(
    defaultEmission?.baselineField?.uploadLoc
  );
  const [fileUploadResponse, setFileUploadResponse] = useState(
    defaultEmission?.baselineSoil?.uploadLoc
  );
  useEffect(() => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getAllOpenProjects/${flowType}`
      );

      setProjectIDData(projectSelection.projects);
      if (editEmissionData) {
        setDisableEmissionValues(true);
      }
    }
    fetchData();
  }, [defaultEmission?.companyDetails?.farmerId]);
  let projectIDSave=defaultEmission.companyDetails.projectId;
  let farmerIDSave=defaultEmission.companyDetails.farmerId;
  const saveCompanyDetails = (isSaveClicked, saveType) => {
    const data = {
      projectName: projectIDSave.includes('-') ? projectIDSave.substring(0, projectIDSave.indexOf('-')) : projectIDSave,
      projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave,
      farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
      farmerName: farmerIDSave.includes('-') ? farmerIDSave.substring(0, farmerIDSave.indexOf('-')) : farmerIDSave,
      createdBy: props.accounts[0].name,
    };
    async function saveDataAPICall() {
      let responseData = await POST_REQUEST(
        "feasibilityStudyProjectSurvey-create",
        data
      );
      setSurvey(responseData);
      if (responseData.statusCode === 201) {
        saveType === "Next" && handleNext();
        setDisableEmissionValues(true);
        if (saveType !== "Next") {
          setOpenModalSave(true);
        }
        setApiResponseMessage(`${responseData.message}`);
      } else if (
        responseData.statusCode === 406 ||
        responseData.errorCode === 409
      ) {
        setOpenModal(true);
        setDisableEmissionValues(true);
        setApiResponseMessage(`${responseData.message}`);
      } else {
        setOpenModal(false);
        setApiResponseMessage(`${responseData.message}`);
      }
      setStatus(responseData);

    }
    if (!disableEmissionValues) {
      saveDataAPICall();

      saveType === "draft" && setOpenModal(true);
    }
    if (!isSaveClicked && disableEmissionValues) {
      handleNext();
    }
  };

  const saveData = () => {
    if (activeStep === 0) {
      saveCompanyDetails(true, "draft");
      if (survey.statusCode === 201) {
        setOpenModalSave(true);
      } else {
        setOpenModal(true);
      }
    } else if (activeStep === 1) {
      if (
        editEmissionData === undefined ||
        (editEmissionData &&
          editEmissionData?.farmerConsent?.actualFileName === "")
      ) {
        saveFarmerConsentData(true, "draft");
      }
    } else if (activeStep === 2) {
      baselineData("draft");
    }
  };
  const nextSaveData = () => {
    if (activeStep === 0) {
      saveCompanyDetails(false, "Next");
    } else if (activeStep === 1) {
    if (
      editEmissionData === undefined ||
      (editEmissionData && editEmissionData?.farmerConsent?.actualFileName === "")
    ) {
      saveFarmerConsentData(false, "Next");
    } }else if (activeStep === 2) {
      // baselineData(false,'Next')
    }
  };
  const saveFarmerConsentData = (isSaveClicked, saveType) => {
    const data = { 
    projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave,
    farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
      uploadLoc: editEmissionData
        ? editEmissionData?.farmerConsent?.uploadLoc
        : fileUploadResponseFarmer?.key,
      actualFileName: uploadedFileName,
      createdBy: props.accounts[0].name,
    };
    async function saveFarmerConsent() {
      let responseData = await POST_REQUEST("farmerConsent-create", data);
      setStatus(responseData);
      if (responseData.statusCode === 406) {
        setOpenModal(true);
        setApiResponseMessage(`${responseData.message}`);
        setDisableFarmerValues(true);
      } else if (responseData.statusCode === 201) {
        setDisableFarmerValues(true);
        if (saveType !== "Next") {
          setOpenModalSave(true);
        }
        if (editEmissionData) {
          saveType === "Next" && handleNext();
        } else if (uploadedFileName?.actualFileName !== "")
          saveType === "Next" && handleNext();
      }
    }
    if (!disableFarmerValues) {
      saveFarmerConsent();
    }
    if (!isSaveClicked && disableFarmerValues) {
      handleNext();
    }
  };

  const baselineData = (type = "") => {
    const data = {
      baselineField: {
        projectName: projectIDSave.includes('-') ? projectIDSave.substring(0, projectIDSave.indexOf('-')) : projectIDSave,
        projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave,
        farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
        farmerName: farmerIDSave.includes('-') ? farmerIDSave.substring(0, farmerIDSave.indexOf('-')) : farmerIDSave,

        uploadLoc: fileUploadResponseField.key
          ? fileUploadResponseField.key
          : fileUploadResponseField,
        actualFileName: defaultEmission.baselineField.actualFileName,
        createdBy: props.accounts[0].name,
        f2Status: type === "Completed" ? "Completed" : "Drafted",
        isUploadedCftData:
          defaultEmission.baselineField.actualFileName !== "" ? true : false,
      },
      baselineSoil: {
        projectName: projectIDSave.includes('-') ? projectIDSave.substring(0, projectIDSave.indexOf('-')) : projectIDSave,
        projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave,
        farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
        farmerName: farmerIDSave.includes('-') ? farmerIDSave.substring(0, farmerIDSave.indexOf('-')) : farmerIDSave,
        uploadLoc: fileUploadResponse.key
          ? fileUploadResponse.key
          : fileUploadResponse,
        actualFileName: defaultEmission.baselineSoil.actualFileName,
        createdBy: props.accounts[0].name,
        f2Status: type === "Completed" ? "Completed" : "Drafted",
        isUploadedSoilData:
          defaultEmission.baselineSoil.actualFileName !== "" ? true : false,
      },
    };
    setLoadingMask(true);
    async function saveBaseline() {
      let responseData = await POST_REQUEST("soilAndFieldsData-upload", data);
      setLoadingMask(false);
      setBaseLine(responseData);
      if (responseData.statusCode === 201 && type === "Completed") {
        setActiveStep(activeStep + 1);
        setOpenModalSurvey(false);
      } else if (responseData.statusCode === 201 && type !== "Completed") {
        setOpenModalSave(true);
      } else if (responseData.errorCode === 406 && type === "Completed") {
        setbaseLineModal(true);
      } else if (responseData.errorCode === 406 && type !== "Completed") {
        setbaseLineModal(true);
      }
    }
    saveBaseline();
  };
  const changeData = () => {
    setOpenModalSurvey(true);
  };
  const handleToClose = () => {
    setOpenModalSurvey(false);
  };
 

  const ButtonDisable = (type = "") => {
    if (activeStep === 0) {
      if (editEmissionData && type === "saveDraft") {
        return true;
      }
      const projectSelectionDisable = !(
        defaultEmission?.companyDetails?.projectId !== "" &&
        defaultEmission?.companyDetails?.farmerId !== ""
      );
      return projectSelectionDisable;
    } else if (activeStep === 1) {
      if (editEmissionData && type === "saveDraft") {
        return true;
      }
      const farmerDisable =
        defaultEmission.farmerConsent?.actualFileName === "";
      return farmerDisable;
    } else if (activeStep === 2) {
      const baselineDisable = !(
        defaultEmission.baselineSoil?.actualFileName !== "" &&
        defaultEmission.baselineField?.actualFileName !== ""
      );
      return baselineDisable;
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ProjectSelectionEmmision
            defaultEmission={defaultEmission}
            updateCompanyDetailsHandler={updateCompanyDetailsHandler}
            disableEmissionValues={disableEmissionValues}
            farmerIDData={farmerIDData}
            projectIDData={projectIDData}
            editEmissionData={editEmissionData}
            setFarmerIDData={setFarmerIDData}
            setHeaderInfo={setHeaderInfo}
          />
        );
      case 1:
        return (
          <FarmerConsent
            uploadedFileName={uploadedFileName}
            setUploadedFileName={setUploadedFileName}
            setFileUploadResponseFarmer={setFileUploadResponseFarmer}
            fileUploadResponseFarmer={fileUploadResponseFarmer}
            defaultEmission={defaultEmission}
            updateFarmerConsentDetailsHandler={
              updateFarmerConsentDetailsHandler
            }
            headerInfo={headerInfo}
            completed={completed}
            editEmissionData={editEmissionData}
          />
        );
      case 2:
        return (
          <BaselineProcess
            uploadSoilFileName={uploadSoilFileName}
            uploadFieldFileName={uploadFieldFileName}
            setUploadFieldFileName={setUploadFieldFileName}
            setUploadSoilFileName={setUploadSoilFileName}
            setFileUploadResponse={setFileUploadResponse}
            fileUploadResponse={fileUploadResponse}
            setFileUploadResponseField={setFileUploadResponseField}
            fileUploadResponseField={fileUploadResponseField}
            updateBaselineHandler={updateBaselineHandler}
            defaultEmission={defaultEmission}
            completed={completed}
            updateBaselineFileHandler={updateBaselineFileHandler}
            editEmissionData={editEmissionData}
            setLoadingMask={setLoadingMask}
            loadingMask={loadingMask}
            headerInfo={headerInfo}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleToCloseSave = () => {
    setOpenModalSave(false);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if (activeStep === 0) {
      nextSaveData();
    } else {
      nextSaveData();
      handleNext();
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
            <a onClick={() => history.push("/home")}>Home</a> {">"} Emissions & SOC Quantification Study {">"}New Emissions & SOC Quantification Study
          </span>
        </TypoBody>
      </div>
    </Elevation><div className="stepperContent">
        <div className="stepperBox">
          <div style={{ display: "flex", marginLeft: "3%", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div>
              <TypoDisplay level={6} className="projectStepper">
                New Emissions & SOC Quantification Study
              </TypoDisplay>
            </div>
            <div
              style={{
                width: "40%"
              }}
            >
              {" "}
              {defaultEmission?.companyDetails?.farmerId !== "" && (
                <>
                  {defaultEmission?.companyDetails?.projectId}&nbsp;,

                  {headerInfo.farmerFirstName}&nbsp;
                  {headerInfo.farmerLastName},

                  {headerInfo?.farms?.map((data, index) => {
                    return data?.fields?.map((item, i) => {
                      return (
                        item.fieldId +
                        `${index === data?.fields?.length ? "" : ", "}`
                      );
                    });
                  })}
                  <Tooltip style={{ position: "absolute" }}>
                    <Icon icon="info_outline" />
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          <Stepper
            nonLinear
            activeStep={activeStep}
            sx={{ marginRight: "2%", marginLeft: "-2%", marginTop: "5%" }}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={activeStep === 3 ? completed : completed[index]}
              >
                <StepLabel
                  style={{ cursor: "pointer" }}
                  onClick={handleStep(index)}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <div style={{ display: "flex", marginTop: "16%", marginLeft: "30%" }}>
                <Icon icon="done_all" iconSize="large" variant="filled-primary" />
                <div style={{ marginLeft: "3%", marginTop: "1px" }}>             <TypoSubtitle level={1}>
                  Study successfully Submitted. </TypoSubtitle>
                  <Button
                    variant="text"
                    onClick={() => window.location.reload()}
                  >
                    Start New Study
                  </Button>
                </div>

              </div>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div style={{ display: "flex", marginBottom: "8%" }}>
                  {activeStep !== 2 ? (
                    <div>
                      {" "}
                      <Button
                        variant="filled"
                        style={{ width: "147px" }}
                        disabled={ButtonDisable()}
                        onClick={handleComplete}
                        themeColor="primary"
                      >
                        Next
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      variant="filled"
                      id="comp"
                      disabled={ButtonDisable()}
                      onClick={changeData}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      SUBMIT
                    </Button>
                  )}


                  <div style={{ marginLeft: "3%" }}>
                    <Button
                      variant="outlined"
                      type="submit"
                      disabled={(activeStep === 0 || activeStep === 1) &&
                        ButtonDisable("saveDraft")}
                      onClick={saveData}
                    >
                      Save Draft
                    </Button>
                  </div>
                  {activeStep !== 0 && (
                    <div style={{ marginLeft: "3%" }}>
                      {" "}
                      <Button variant="text" onClick={handleBack}>
                        Back
                      </Button>
                    </div>
                  )}
                  {openModal && (
                    <DialogBoxEmission
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      status={status}
                      setStatus={setStatus}
                      apiResponseMessage={apiResponseMessage}
                      flowType={flowType}
                      defaultEmission={defaultEmission}
                      setDisableEmissionValues={setDisableEmissionValues} />
                  )}
                  {openModalSurvey && (
                    <Dialog open={openModalSurvey} onClose={handleToClose}>
                      <div style={{ display: "flex" }}>
                        <TypoDisplay level={6}> Confirmation</TypoDisplay>
                      </div>
                      <div style={{ marginTop: "4%" }}>
                        <TypoBody>
                          {" "}
                          Once Submitted,this survey can not be edited.Please
                          Confirm
                        </TypoBody>
                      </div>
                      <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                        <DialogButton
                          onClick={handleToClose}
                          color="primary"
                          variant="outlined"
                        >
                          Cancel
                        </DialogButton>
                        <DialogButton
                          onClick={() => baselineData("Completed")}
                          color="primary"
                          variant="outlined"
                        >
                          Confirm
                        </DialogButton>
                      </div>
                    </Dialog>
                  )}
                  {baseLineModal && (
                    <Dialog
                      open={baseLineModal}
                      onClose={() => setbaseLineModal(false)}
                    >
                      <div style={{ display: "flex" }}>
                        <TypoDisplay level={6}> Alert</TypoDisplay>
                      </div>
                      <div style={{ marginTop: "4%" }}>
                        <TypoBody> {baseLine.message}</TypoBody>
                      </div>
                      <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                        <DialogButton
                          onClick={() => setbaseLineModal(false)}
                          color="primary"
                          variant="outlined"
                        >
                          Ok
                        </DialogButton>
                      </div>
                    </Dialog>
                  )}

                  {openModalSave && (
                    <div>
                      <Dialog open={openModalSave} onClose={handleToCloseSave}>
                        <div style={{ display: "flex" }}>
                          <Icon icon="done" style={{ color: "green" }} />
                          <TypoDisplay level={6}> Saved</TypoDisplay>
                        </div>

                        <div style={{ marginTop: "4%" }}>
                          <TypoBody>
                            {" "}
                            Saved as Draft! Visit Feasibility Study Project List
                            to access/edit
                          </TypoBody>
                        </div>
                        <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                          <DialogButton
                            onClick={handleToCloseSave}
                            color="primary"
                            variant="outlined"
                          >
                            Ok
                          </DialogButton>
                        </div>
                      </Dialog>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        </div>
      </div></>
  );
}
