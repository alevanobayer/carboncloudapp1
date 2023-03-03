import { useState, useEffect, useReducer } from "react";
import {
  Icon,
  TypoDisplay,
  DialogButton,
  TypoBody,
  Dialog,
  Button,Elevation
} from "@element/react-components";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../../../WorkFlows/FeasibilityStudy/FeasibilityStudy.css";
import { FeasibilityStudyJSON } from "../../CommonComponents/DefaultDataJSON/FeasibilityStudyJSON";
import { GET_REQUEST, POST_REQUEST } from "../../../Utilities/RestEndPoint";
import "./extraction.css";
import ProjectDetailsExtraction from "./ProjectDetailsExtraction";
import ExtractionAnalysis from "./ExtratctionAnalysis";
import ExtractionUpload from "./ExtractionUpload";
const steps = ["Project Details", "Analysis Data", "Upload File"];
export default function FeasibilityPDFDataExtraction(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [exportData, setExportData] = useState([]);
  const [projectID, setProjectID] = useState();
  const [projectIDData, setProjectIDData] = useState();
  const [fileUploadResponse, setFileUploadResponse] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [openModalExtraction, setOpenModalExtraction] = useState(false);

  const ACTION_TYPES = {
    UPDATE_EXTRACTION: "update_extraction",
  };
  function reducer(state, action) {
    switch (action.type) {
      case ACTION_TYPES["UPDATE_EXTRACTION"]:
        return { ...action.payload };
      default:
        throw new Error();
    }
  }
  const [defaultFeasibilityStudyState, dispatch] = useReducer(
    reducer,
    JSON.parse(JSON.stringify(FeasibilityStudyJSON))
  );
  // useEffect(() => {
  //   console.log(fileUploadResponse, "From machine use");
  // }, [fileUploadResponse]);

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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ProjectDetailsExtraction
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            exportData={exportData}
            projectID={projectID}
            setProjectID={setProjectID}
            projectIDData={projectIDData}
            setProjectIDData={setProjectIDData}
            handleChange={handleChange}
            updateExtractionHandler={updateExtractionHandler}
          />
        );
      case 1:
        return (
          <ExtractionAnalysis
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <ExtractionUpload
            defaultFeasibilityStudyState={defaultFeasibilityStudyState}
            fileUploadResponse={fileUploadResponse}
            setFileUploadResponse={setFileUploadResponse}
            uploadedFileName={uploadedFileName}
            setUploadedFileName={setUploadedFileName}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  useEffect(() => {
    async function fetchData() {
      let projectSelection = await GET_REQUEST(
        `getAllExportFeasibilityStudyDetails`
      );
      setExportData(projectSelection);
    }
    fetchData();
  }, []);
  const updateExtractionHandler = (ExtractionObj) => {
    const data = {
      ...defaultFeasibilityStudyState,
      ExtractionDetails: ExtractionObj,
    };
    dispatch({ payload: { ...data }, type: "update_extraction" });
  };

  let handleChange = (i, e, name) => {
    let newExtractionDetailsArray = [
      ...defaultFeasibilityStudyState.ExtractionDetails.pdfExtractionData,
    ];
    if (name === "Year") {
      newExtractionDetailsArray[i][name] = e.value;
    } else {
      newExtractionDetailsArray[i][name] = e.target.value;
    }

    const data = {
      ...defaultFeasibilityStudyState.ExtractionDetails,
      pdfExtractionData: newExtractionDetailsArray,
    };
    updateExtractionHandler(data);
  };
  const finalData = {
    projectId: projectID,
    isUploadedPdfFile:
      defaultFeasibilityStudyState?.ExtractionDetails?.isUploadedPdfFile,
    uploadLoc: fileUploadResponse.key,
    actualFileName: uploadedFileName,
    pdfExtractionData:
      defaultFeasibilityStudyState?.ExtractionDetails?.pdfExtractionData[0],
  };
  const extractionDataSave = () => {
    async function extractionDataApiCall() {
      let responseData = await POST_REQUEST("pdfExtraction-create", finalData);
      if (responseData.statusCode === 201|| responseData.statusCode===103) {
        setOpenModalExtraction(true);
      }
    }
    extractionDataApiCall();
  };

  const isEmpty =
    defaultFeasibilityStudyState.ExtractionDetails.pdfExtractionData[0];
  //  const isEmpty = !Object.values(defaultFeasibilityStudyState.ExtractionDetails.pdfExtractionData[0]).some(x =>  x!=="");
  const DisableButon =
    uploadedFileName === "" ||
    projectID === "" ||
    isEmpty.Quantification === "" ||
    isEmpty["Quantification/ha"] === "" ||
    isEmpty.Region === "" ||
    isEmpty.Sequestration === "" ||
    isEmpty.Supplier === "" ||
    isEmpty["SOC Quantification/ha"] === "" ||
    isEmpty["Number of Grower"] === "" ||
    isEmpty.Reduction === "" ||
    isEmpty.Hectares === "" ||
    isEmpty["Absolute Potential"] === "" ||
    isEmpty["Potential Reduction"] === "" ||
    isEmpty.Interventions === "";
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
            <a onClick={() => history.push("/home")}>Home</a> {">"} Feasibility Study {">"}Feasibility PDF Extraction
          </span>
        </TypoBody>
      </div>
    </Elevation><div className="stepperContent">
        <div className="stepperBox">
          <div style={{ display: "flex", marginLeft: "3%" }}>
            <div>
              <TypoDisplay level={6} className="projectStepper">
                Feasibility Analysis Input
              </TypoDisplay>
            </div>
          </div>{" "}
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
          {getStepContent(activeStep)}
          <div style={{ display: "flex", marginBottom: "4%" }}>
            {activeStep !== 2 ? (
              <div>
                {" "}
                <Button
                  variant="filled"
                  style={{ width: "147px" }}
                  //  disabled={DisableButon()}
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
                style={{ width: "147px" }}
                disabled={DisableButon}
                onClick={extractionDataSave}
              >
                save
              </Button>
            )}

            <div style={{ marginLeft: "3%" }}>
              {" "}
              <Button variant="text" onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        </div>
        {openModalExtraction && (
          <Dialog
            open={openModalExtraction}

            onClosed={() => window.location.reload()}
          >
            <div style={{ display: "flex" }}>
              <Icon icon="check_circle_outline" style={{ color: "green" }} />
              <TypoDisplay level={6}>Success</TypoDisplay>
            </div>
            <div style={{ marginTop: "4%" }}>
              <TypoBody>Data successfully extracted and stored</TypoBody>
            </div>
            <div style={{ marginTop: "4%", textAlignLast: "right" }}>
              <DialogButton
                onClick={() => window.location.reload()}
                color="primary"
                variant="outlined"
              >
                OK
              </DialogButton>
            </div>
          </Dialog>
        )}
      </div></>
  );
}
