import { useState, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./FeasibilityStepper.css";
import {
  Icon,
  Tooltip,
  Button,
  TypoDisplay,
  DialogButton,
  TypoBody,
  Dialog, TypoSubtitle, Elevation
} from "@element/react-components";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ProjectSelectionFeasibilty from "./ProjectSelectionFeasibility/ProjectSelectionFeasibilty";
import { FeasibilityStudyJSON } from "../../CommonComponents/DefaultDataJSON/FeasibilityStudyJSON";
import MachineUse from "./MachineUse";
import FeasibilityStudyFarmerConsent from "./FarmerConsent/FeasibilityStudyFarmerConsent";
import FeasibilityStudy from "../FeasibilityStudy/FeasibilityStudy";
import { GET_REQUEST, POST_REQUEST } from "../../../Utilities/RestEndPoint";
import DialogBox from "../../../Utilities/DialogBox";

const steps = [
  "Project Selection",
  "Farmer Consent",
  "Machine Use",
  "Feasibility Study",
];

export default function FeasibilityStudyStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [farmerIDData, setFarmerIDData] = useState([]);
  const [projectIDData, setProjectIDData] = useState([]);
  const [farmData, setFarmData] = useState([]);
  const flowType = "Feasibility Study";
  const [status, setStatus] = useState();
  const [survey, setSurvey] = useState();
  const [machineSave, setMachineSave] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalSurvey, setOpenModalSurvey] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [apiResponseMessage, setApiResponseMessage] = useState("");
  const [disableCompanyDetailsValues, setDisableCompanyDetailsValues] =
    useState();
  const [headerInfo, setHeaderInfo] = useState([]);
  const [disableFarmerValues, setDisableFarmerValues] = useState();
  const [validation, setValidation] = useState(true);
  const [machineUploadDisable, setMachineUploadDisable] = useState(false);
  const [machineModal, setMachineModal] = useState(false);

  /*Start Handling State management Logic*/
  const ACTION_TYPES = {
    "UPDATE_FARMER-CONSENT-DATA": "update_farmer-consent-data",
    "UPDATE_COMPANY-DETAILS": "update_company-details",
    "UPDATE_MACHINE-DETAILS": "update_machine-details",
    "UPDATE_FEASIBILITY-STUDY-DATA": "update_feasibility-study-data",
    "UPDATE_ENTIRE_FEASIBILITY-DATA": "update_entire_feasibility-data",
  };
  function reducer(state, action) {
    switch (action.type) {
      case ACTION_TYPES["UPDATE_COMPANY-DETAILS"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_FARMER-CONSENT-DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_MACHINE-DETAILS"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_FEASIBILITY-STUDY-DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_ENTIRE_FEASIBILITY-DATA"]:
        return { ...action.payload };
      default:
        throw new Error();
    }
  }
  let editData = props?.location?.state?.editdetail;
  if (editData && editData?.machinnarieDetails?.activities === "") {
    editData.machinnarieDetails.activities = [
      {
        Activity: "",
        Timing: "",
        Equipment: "",
        "Tractor Power(in hp)": "",
        "Area Of Activity(in ha)": "",
        "Operations Time(in h/ha)": "",
        "Fuel Consumption(in litre/hour)": "",
        "Number or Runs(per year)": "",
      },
    ];
  }
  if (editData && editData?.feasibilityStudyData?.questionsAndAnswers === "") {
    editData.feasibilityStudyData.questionsAndAnswers = [
      {
        1.1: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        1.2: "",
        isHaveSubQuestions: true,
        subQuestionsAndSubAnswers: [
          { recNo: 1, "1.2.1": "", "1.2.2": "", "1.2.3": "" },
        ],
      },
      {
        1.3: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        1.4: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        1.5: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        1.6: "",
        isHaveSubQuestions: true,
        subQuestionsAndSubAnswers: [
          { recNo: 1, "1.6.1": "", "1.6.2": "", "1.6.3": "", "1.6.4": "" },
        ],
      },
      {
        1.7: "",
        isHaveSubQuestions: true,
        subQuestionsAndSubAnswers: [
          { recNo: 1, "1.7.1": "", "1.7.2": "", "1.7.3": "", "1.7.4": "" },
        ],
      },
      {
        1.8: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        1.9: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        "1.10": "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        1.11: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        2.1: "",
        isHaveSubQuestions: true,
        subQuestionsAndSubAnswers: [
          { recNo: 1, "2.1.1": "", "2.1.2": "", "2.1.3": "", "2.1.4": "" },
        ],
      },
      {
        3.1: "",
        isHaveSubQuestions: true,
        subQuestionsAndSubAnswers: [
          { recNo: 1, "3.1.1": "", "3.1.2": "", "3.1.3": "" },
        ],
      },
      {
        4.1: "",
        isHaveSubQuestions: true,
        subQuestionsAndSubAnswers: [
          { recNo: 1, "4.1.1": "", "4.1.2": "", "4.1.3": "" },
        ],
      },
      {
        4.2: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        4.3: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        4.4: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        4.5: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        4.6: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
      {
        4.7: "",
        isHaveSubQuestions: false,
        subQuestionsAndSubAnswers: [],
      },
    ];
  }
  const [defaultFeasibilityStudyState, dispatch] = useReducer(
    reducer,
    JSON.parse(JSON.stringify(editData ? editData : FeasibilityStudyJSON))
  );

  const updateCompanyDetailsHandler = (companyDetailsObj) => {
    const data = {
      ...defaultFeasibilityStudyState,
      companyDetails: companyDetailsObj,
    };
    dispatch({ payload: { ...data }, type: "update_company-details" });
  };
  const updateFarmerConsentDetailsHandler = (farmerDetailObj) => {
    const data = {
      ...defaultFeasibilityStudyState,
      farmerConsent: farmerDetailObj,
    };
    dispatch({ payload: { ...data }, type: "update_farmer-consent-data" });
  };

  const updateMachineDetailsHandler = (machineDetailsObj) => {
    const data = {
      ...defaultFeasibilityStudyState,
      machinnarieDetails: machineDetailsObj,
    };
    dispatch({ payload: { ...data }, type: "update_machine-details" });
  };
  const updateFeasibilityStudyDetailsHandler = (feasibilityStudyObj) => {
    const data = {
      ...defaultFeasibilityStudyState,
      feasibilityStudyData: feasibilityStudyObj,
    };
    dispatch({ payload: { ...data }, type: "update_feasibility-study-data" });
  };
  const [uploadedFileName, setUploadedFileName] = useState(
    defaultFeasibilityStudyState?.farmerConsent?.actualFileName
  );
  const [fileUploadResponseFarmer, setFileUploadResponseFarmer] = useState(
    defaultFeasibilityStudyState?.farmerConsent?.uploadLoc
  );
  const [fileUploadResponse, setFileUploadResponse] = useState(
    defaultFeasibilityStudyState?.machinnarieDetails?.uploadLoc
  );
  const [uploadedFileNameMachine, setUploadedFileNameMachine] = useState(
    defaultFeasibilityStudyState?.machinnarieDetails?.actualFileName
  );
  let info = defaultFeasibilityStudyState?.companyDetails?.farmerId;
  // Project Selection
  useEffect(() => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getAllOpenProjects/${flowType}`
      );
      setProjectIDData(projectSelection.projects);

      // setFarmerIDData(projectSelection.farmers);
      
      if (editData) {
        setDisableCompanyDetailsValues(true);
      }
    }
    fetchData();
  }, [defaultFeasibilityStudyState?.companyDetails?.farmerId]);

  let projectIDSave = defaultFeasibilityStudyState.companyDetails.projectId;
  let farmerIDSave=defaultFeasibilityStudyState.companyDetails.farmerId;
  const saveCompanyDetails = (isSaveClicked, saveType) => {
    const data = {
      projectName: projectIDSave.includes('-') ? projectIDSave.substring(0, projectIDSave.indexOf('-')) : projectIDSave,
      projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-') + 1, projectIDSave.length) : projectIDSave,
      farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
      farmerName: farmerIDSave.includes('-') ? farmerIDSave.substring(0, farmerIDSave.indexOf('-')) : farmerIDSave,
      farmId: defaultFeasibilityStudyState.companyDetails.farmId,
      farmName: defaultFeasibilityStudyState.companyDetails.farmName,
      createdBy: props.accounts[0].name,
    };
    async function saveDataAPICall() {
      let responseData = await POST_REQUEST(
        "feasibilityStudyProjectSurvey-create",
        data
      );
      if (responseData.statusCode === 201) {
        saveType === "Next" && handleNext();
        setDisableCompanyDetailsValues(true);
        setApiResponseMessage(`${responseData.message}`);
      } else if (
        responseData.statusCode === 406 ||
        responseData.errorCode === 409
      ) {
        setOpenModal(true);
        setDisableCompanyDetailsValues(true);
        setApiResponseMessage(`${responseData.message}`);
      } else {
        setOpenModal(false);
        setApiResponseMessage(`${responseData.message}`);
      }
      setStatus(responseData);
    }
    if (!disableCompanyDetailsValues) {
      saveDataAPICall();

      saveType === "draft" && setOpenModal(true);
    }
    if (!isSaveClicked && disableCompanyDetailsValues) {
      handleNext();
    }
  };
  // machineDataSave
  const machineDataSave = (isSaveClicked, saveType) => {
    const finalData = {
      projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-') + 1, projectIDSave.length) : projectIDSave,
      farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
      farmId: defaultFeasibilityStudyState?.companyDetails?.farmId,
      farmName: defaultFeasibilityStudyState?.companyDetails?.farmName,
      createdBy: props.accounts[0].name,
      isUploadedMachineData:
        defaultFeasibilityStudyState?.machinnarieDetails?.isUploadedMachineData,
      uploadLoc:
        defaultFeasibilityStudyState?.machinnarieDetails
          ?.isUploadedMachineData === true
          ? fileUploadResponse.key
          : "",
      actualFileName:
        defaultFeasibilityStudyState?.machinnarieDetails
          ?.isUploadedMachineData === true
          ? uploadedFileNameMachine
          : "",
      activities:
        defaultFeasibilityStudyState?.machinnarieDetails
          ?.isUploadedMachineData === false
          ? defaultFeasibilityStudyState?.machinnarieDetails?.activities
          : [],
    };
    async function machineDataApiCall() {
      let responseDataMachine = await POST_REQUEST(
        "machineUseData-create",
        finalData
      );
      if (responseDataMachine.statusCode === 201 && saveType !== "draft") {
        setActiveStep(activeStep + 1);
      } else if (
        responseDataMachine.statusCode === 201 &&
        saveType === "draft"
      ) {
        setOpenModalSave(true);
      } else if (
        responseDataMachine.errorCode === 406 &&
        saveType !== "draft"
      ) {
        setMachineModal(true);
      } else if (
        responseDataMachine.errorCode === 406 &&
        saveType === "draft"
      ) {
        setMachineModal(true);
      }
      else {
        setMachineModal(true);
      }
      setMachineSave(responseDataMachine);
    }
    if (!isSaveClicked) {
      handleNext();
    }
    machineDataApiCall();
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
        editData === undefined ||
        (editData && editData.farmerConsent.actualFileName === "")
      ) {
        saveFarmerConsentData(true, "draft");
      }
    } else if (activeStep === 2) {
      machineDataSave(true, "draft");
      setMachineUploadDisable(false);

      if (
        !defaultFeasibilityStudyState?.machinnarieDetails?.isUploadedMachineData
      ) {
        setMachineUploadDisable(true);
      }
    } else if (activeStep === 3) {
      surveyCreate("draft");
      setOpenModalSave(true);
    }
  };
  const nextSaveData = () => {
    if (activeStep === 0) {
      saveCompanyDetails(false, "Next");
    } else if (activeStep === 1) {
      if (
        editData === undefined ||
        (editData && editData.farmerConsent.actualFileName === "")
      ) {
        saveFarmerConsentData(false, "Next");
      }
    } else if (activeStep === 2) {
      machineDataSave(false, "Next");
    } else if (activeStep === 3) {
    }
  };
  const saveFarmerConsentData = (isSaveClicked, saveType) => {
    const data = {
      projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-') + 1, projectIDSave.length) : projectIDSave,
      farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
      farmId: defaultFeasibilityStudyState.companyDetails.farmId,
      uploadLoc: editData
        ? editData?.farmerConsent?.uploadLoc
        : fileUploadResponseFarmer.key,
      actualFileName: uploadedFileName,
      createdBy: props.accounts[0].name,
    };
    async function saveFarmerConsent() {
      let responseData = await POST_REQUEST("farmerConsent-create", data);
      if (responseData.statusCode === 406) {
        setOpenModal(true);
        setApiResponseMessage(`${responseData.message}`);
        setDisableFarmerValues(true);
      } else if (responseData.statusCode === 201) {
        setDisableFarmerValues(true);
        if (saveType !== "Next") {
          setOpenModalSave(true);
        }
        if (editData) {
          saveType === "Next" && handleNext();
        } else if (uploadedFileName.actualFileName !== "")
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

  // survey Api Data
  const surveyCreate = (type = "") => {
    const data = {
      projectId: projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-') + 1, projectIDSave.length) : projectIDSave,
      farmerId: farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave,
      farmId: defaultFeasibilityStudyState.companyDetails.farmId,
      createdBy: props.accounts[0].name,
      surveyStatus: type === "Completed" ? "Completed" : "Drafted",
      questionsAndAnswers:
        defaultFeasibilityStudyState.feasibilityStudyData.questionsAndAnswers,
    };

    async function surveyCreateApiCall() {
      let responseData = await POST_REQUEST("questionnaire-create", data);
      if (responseData.statusCode === 201) {
        type === "Completed" && setActiveStep(activeStep + 1);
        setOpenModalSurvey(false);
      }
    }
    surveyCreateApiCall();
  };
  const ChangeData = () => {
    setOpenModalSurvey(true);
  };
  const handleToClose = () => {
    setOpenModalSurvey(false);
  };
  const handleToCloseSave = () => {
    setOpenModalSave(false);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ProjectSelectionFeasibilty
            editData={editData}
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            updateCompanyDetailsHandler={updateCompanyDetailsHandler}
            disableCompanyDetailsValues={disableCompanyDetailsValues}
            farmerIDData={farmerIDData}
            setFarmerIDData={setFarmerIDData}
            projectIDData={projectIDData}
            farmData={farmData}
            setFarmData={setFarmData}
            setHeaderInfo={setHeaderInfo}
          // projectIdFarmerData={projectIdFarmerData}
          />
        );
      case 1:
        return (
          <FeasibilityStudyFarmerConsent
            uploadedFileName={uploadedFileName}
            setUploadedFileName={setUploadedFileName}
            setFileUploadResponseFarmer={setFileUploadResponseFarmer}
            fileUploadResponseFarmer={fileUploadResponseFarmer}
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            updateFarmerConsentDetailsHandler={
              updateFarmerConsentDetailsHandler
            }
            completed={completed}
            editData={editData}
            disableFarmerValues={disableFarmerValues}
            headerInfo={headerInfo}
          />
        );
      case 2:
        return (
          <MachineUse
            updateMachineDetailsHandler={updateMachineDetailsHandler}
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            uploadedFileNameMachine={uploadedFileNameMachine}
            setUploadedFileNameMachine={setUploadedFileNameMachine}
            setFileUploadResponse={setFileUploadResponse}
            fileUploadResponse={fileUploadResponse}
            completed={completed}
            setMachineUploadDisable={setMachineUploadDisable}
            machineUploadDisable={machineUploadDisable}
            editData={editData}
          />
        );
      case 3:
        return (
          <FeasibilityStudy
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            updateFeasibilityStudyDetailsHandler={
              updateFeasibilityStudyDetailsHandler
            }
            completed={completed}
            editData={editData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const ButtonDisable = (type = "") => {
    if (activeStep === 0) {
      if (editData && type === "saveDraft") {
        return true;
      }
      const projectSelectionDisable = !(
        defaultFeasibilityStudyState?.companyDetails?.projectId !== "" &&
        defaultFeasibilityStudyState?.companyDetails?.farmerId !== "" &&
        defaultFeasibilityStudyState?.companyDetails?.farmId !== ""
      );
      return projectSelectionDisable;
    } else if (activeStep === 1) {
      if (editData && type === "saveDraft") {
        return true;
      }
      const farmerDisable =
        defaultFeasibilityStudyState.farmerConsent.actualFileName === "";
      return farmerDisable;
    } else if (activeStep === 2) {
      if (
        defaultFeasibilityStudyState?.machinnarieDetails
          .isUploadedMachineData === true
      ) {
        const machineDisable =
          defaultFeasibilityStudyState?.machinnarieDetails?.actualFileName ===
          "";
        return machineDisable;
      } else {
        if (
          defaultFeasibilityStudyState?.machinnarieDetails?.activities?.length >
          0
        ) {
          let countOfFarms = 0;
          defaultFeasibilityStudyState?.machinnarieDetails.activities.map(
            (element, index) => {
              for (const [key, value] of Object.entries(element)) {
                if (value === "") {
                  countOfFarms++;
                }
              }
            }
          );
          if (countOfFarms === 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  };
  function replaceHistory(e) {
    if (e) {
      e.preventDefault();

      delete e.returnValue;
    }

    history.replace({ ...history.location, state: undefined });
    window.location.reload();
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

  const history = useHistory();
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if (activeStep === 0 || activeStep === 2) {
      nextSaveData();
    } else {
      nextSaveData();
      handleNext();
    }
  };

  return (
    <>
      <Elevation elevation="2">
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
              <a onClick={() => history.push("/home")}>Home</a> {">"} Feasibility Study {">"}New Feasibility Study
            </span>
          </TypoBody>
        </div>
      </Elevation>
      <div className="stepperContent">
        <div className="stepperBox">
          <div style={{ display: "flex" }}>
            <div>
              <TypoDisplay level={6} className="projectStepper">
                New Feasibility Study
              </TypoDisplay>
            </div>
            <div
              style={{
                marginLeft: "47%",
                maxWidth: "28%",
                position: "relative",
              }}
            >
              {" "}
              {defaultFeasibilityStudyState?.companyDetails?.farmerId !==
                "" && (
                  <>
                    {defaultFeasibilityStudyState?.companyDetails?.projectId},
                    {headerInfo?.farms?.map((data, index) => {
                      return (
                        data.farmName +
                        `${index === headerInfo?.farms?.length - 1 ? "" : ","}`
                      );
                    })}
                    ,{headerInfo?.farmerFirstName} {headerInfo?.farmerLastName}
                    <Tooltip
                      style={{
                        position: "absolute",
                        marginLeft: "3%",
                      }}
                    >
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
                completed={activeStep === 4 ? completed : completed[index]}
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
          {activeStep === steps.length ? (
            <div style={{ display: "flex", marginTop: "16%", marginLeft: "30%" }}>
              <Icon icon="done_all" iconSize="large" variant="filled-primary" />
              <div style={{ marginLeft: "3%", marginTop: "1px" }}>             <TypoSubtitle level={1}>
                Study successfully Submitted. </TypoSubtitle>
                <Button
                  variant="text"
                  onClick={() => replaceHistory()}
                >
                  Start New Study
                </Button>
              </div>

            </div>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div style={{ display: "flex", marginBottom: "8%", position: "relative", marginTop: "3%" }}>
                {activeStep !== 3 ? (
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
                    // disabled={validation}
                    onClick={ChangeData}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Submit
                  </Button>
                )}

                <div style={{ marginLeft: "3%" }}>
                  {" "}
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={
                      (activeStep === 0 || activeStep === 1) &&
                      ButtonDisable("saveDraft")
                    }
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
                  <DialogBox
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    status={status}
                    setStatus={setStatus}
                    apiResponseMessage={apiResponseMessage}
                    flowType={flowType}
                    defaultFeasibilityStudyState={defaultFeasibilityStudyState}
                    setDisableCompanyDetailsValues={
                      setDisableCompanyDetailsValues
                    }
                  />
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
                        onClick={() => surveyCreate("Completed")}
                        color="primary"
                        variant="outlined"
                      >
                        Confirm
                      </DialogButton>
                    </div>
                  </Dialog>
                )}
                {machineModal && (
                  <Dialog
                    open={machineModal}
                    onClose={() => setMachineModal(false)}
                  >
                    <div style={{ display: "flex" }}>
                      <TypoDisplay level={6}> Alert</TypoDisplay>
                    </div>
                    <div style={{ marginTop: "4%" }}>
                      <TypoBody> {machineSave.message}</TypoBody>
                    </div>
                    <div style={{ marginTop: "4%", textAlignLast: "right" }}>
                      <DialogButton
                        onClick={() => setMachineModal(false)}
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
        </div>
      </div>
    </>
  );
}
