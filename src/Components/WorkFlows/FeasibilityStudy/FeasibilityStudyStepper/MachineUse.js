import { useState, useEffect } from "react";
import {
  TypoDisplay,
  Textfield,
  Select,
  SelectOption,
  Button, Radio
} from "@element/react-components";
import "../../FeasibilityStudy/FeasibilityStudy.css";

import {
  MACHINE_ACTIVITY_DROPDOWN,
  MACHINE_TIMING,
} from "../../CommonComponents/CommonStaticData";
import { Accordion } from "react-bootstrap";
import UploadFile from "../../../Utilities/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";
import "./../../CommonComponents/Baseline.css";
export default function MachineUse(props) {
  const emptyMachineDetailsObj = {
    Activity: "",
    Timing: "",
    Equipment: "",
    "Tractor Power(in hp)": "",
    "Area Of Activity(in ha)": "",
    "Operations Time(in h/ha)": "",
    "Fuel Consumption(in litre/hour)": "",
    "Number or Runs(per year)": "",
  };
  if (
    props?.defaultFeasibilityStudyState &&
    props?.defaultFeasibilityStudyState?.machinnarieDetails?.activities === ""
  ) {
    props.defaultFeasibilityStudyState.machinnarieDetails.activities = [
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
  const [completedStep, setCompletedStep] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadDisable, setUploadDisable] = useState(false);
  const [fileUploadedStatusMachine, setFileUploadedStatusMachine] =
    useState(false);

  let addMachineActivityDetails = () => {
    let machineData = [
      ...props.defaultFeasibilityStudyState.machinnarieDetails.activities,
      { ...emptyMachineDetailsObj },
    ];
    const data = {
      ...props.defaultFeasibilityStudyState.machinnarieDetails,
      activities: machineData,
    };
    props.updateMachineDetailsHandler(data);
  };
  let removeMachineActivityDetails = (i) => {
    let newMachineActivityDetailsArray = [
      ...props.defaultFeasibilityStudyState.machinnarieDetails.activities,
    ];
    newMachineActivityDetailsArray.splice(i, 1);
    const data = {
      ...props.defaultFeasibilityStudyState.machinnarieDetails,
      activities: newMachineActivityDetailsArray,
    };
    props.updateMachineDetailsHandler(data);
  };

  let handleDropdownChange = (i, e, name) => {
    props?.setMachineUploadDisable(true)
    let newMachineActivityDetailsArray = [
      ...props.defaultFeasibilityStudyState.machinnarieDetails.activities,
    ];
    newMachineActivityDetailsArray[i][name] = e.value;
    const data = {
      ...props.defaultFeasibilityStudyState.machinnarieDetails,
      activities: newMachineActivityDetailsArray,
    };
    props.updateMachineDetailsHandler(data);
  };
  let handleChange = (i, e, name) => {
    props?.setMachineUploadDisable(true)
    let newMachineActivityDetailsArray = [
      ...props.defaultFeasibilityStudyState.machinnarieDetails.activities,
    ];
    newMachineActivityDetailsArray[i][name] = e.target.value;
    const data = {
      ...props.defaultFeasibilityStudyState.machinnarieDetails,
      activities: newMachineActivityDetailsArray,
    };
    props.updateMachineDetailsHandler(data);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const removeFile = (idName) => {
    if (document.getElementById(idName)) {
      document.getElementById(idName).value = "";
      if (idName === "feasibility-machine-use") {
        props?.setUploadedFileNameMachine("");
        props?.defaultFeasibilityStudyState?.machinnarieDetails
          ?.actualFileName === "";
        if (props?.editData) {
          const data = {
            ...props?.editData?.machinnarieDetails,
            actualFileName: "",
            uploadLoc: "",
          };

          props.updateMachineDetailsHandler(data);
        }

        setFileUploadedStatusMachine(false);
      }
    }
  };
  // useEffect(() => {
  //   let screenName = "";
  //   let booleanValue = false;
  //   if (props?.editData === undefined) {
  //     if (Object.keys(props.completed).length === 0) {
  //       screenName = "Project Selection";
  //       booleanValue = true;
  //     } else if (Object.keys(props.completed).length === 1) {
  //       screenName = "Farmer Consent";
  //       booleanValue = true; //Fill farmer consent data
  //     }
  //   }

  //   setCompletedStep(screenName);
  //   setIsDisabled(booleanValue);
  // }, [props.completed]);

  useEffect(() => {
    const data = {
      ...props.defaultFeasibilityStudyState.machinnarieDetails,
      actualFileName: props.uploadedFileNameMachine,
      uploadLoc: props?.fileUploadResponse?.key,
    };
    props.updateMachineDetailsHandler(data);
  }, [props.uploadedFileNameMachine]);
  useEffect(() => {
    if (
      props?.editData === undefined &&
      props?.defaultFeasibilityStudyState?.machinnarieDetails
        ?.actualFileName !== ""
    ) {
      setUploadDisable(true);
    }
    //  else if(props?.editData && props?.editData?.machinnarieDetails?.actualFileName !==""){
    //   setUploadDisable(true);
    // }
    else {
      setUploadDisable(false);
    }
  }, [props?.defaultFeasibilityStudyState?.machinnarieDetails?.actualFileName]);
  const handleRadioChange = (ev, radioType) => {
    setRadioValue(radioType);

    if (radioType === "uploadMachineData") {

      const data = {
        ...props?.defaultFeasibilityStudyState?.machinnarieDetails,
        isUploadedMachineData: true,
      }; console.log(data, "jds");

      props.updateMachineDetailsHandler(data);
    } else {
      if (props?.editData) {
        const data = {
          ...props?.editData?.machinnarieDetails,
          isUploadedMachineData: false,
          activities: "",
        };
        props.updateMachineDetailsHandler(data);
      } else {

        const data = {
          ...props?.defaultFeasibilityStudyState?.machinnarieDetails,
          isUploadedMachineData: false,
        };
        props.updateMachineDetailsHandler(data);
      }
    }
  };
  const [radioValue, setRadioValue] = useState("fillFormData");
  // const clearForm = () => {

  //   const data = {
  //     ...props?.editData?.machinnarieDetails,
  //     isUploadedMachineData: false,
  //     activities: "",
  //   };
  //   props.updateMachineDetailsHandler(data);
  //   props.setMachineUploadDisable(false);
  // };
  return (
    <>
      {/* {isDisabled && (
        <div
          style={{ color: "red", fontSize: "20px", marginTop: "6%" }}
          className="form-group col-md-12 text-center"
        >
          Please fill/save the {completedStep} fields.
        </div>
      )} */}

      <div style={{ marginTop: "6%" }}>
        <div> <Radio
          label="Enter Machine Data Manually"
          value={
            props?.defaultFeasibilityStudyState?.machinnarieDetails
              ?.isUploadedMachineData === true
              ? "uploadMachineData"
              : "fillFormData"
          }
          disabled={isDisabled || uploadDisable}
          checked={radioValue === "fillFormData"}
          onChange={(ev) => handleRadioChange(ev, "fillFormData")}
        />
          <Radio

            label="Upload Machine Data"
            value={
              props?.defaultFeasibilityStudyState?.machinnarieDetails
                ?.isUploadedMachineData === true
                ? "uploadMachineData"
                : "fillFormData"
            }
            checked={radioValue === "uploadMachineData"}
            disabled={isDisabled || props.machineUploadDisable}
            onChange={(ev) => handleRadioChange(ev, "uploadMachineData")}
          /></div>
        {/* <Button onClick={clearForm}>Clear</Button> */}
        {/* <div className="col-md-9">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRadioChange}
            disabled={isDisabled}
            value={
              props?.defaultFeasibilityStudyState?.machinnarieDetails
                ?.isUploadedMachineData === true
                ? "uploadMachineData"
                : "fillFormData"
            }
          >
            <FormControlLabel
              // disabled={isDisabled || uploadDisable}
              value="fillFormData"
              control={<Radio />}
              label="Enter Machine Data Manually"
            />
            <FormControlLabel
              // disabled={isDisabled || props.machineUploadDisable}
              value="uploadMachineData"
              control={<Radio />}
              label="Upload Machine Data"
            />
          </RadioGroup>
        </div> */}

        {props?.defaultFeasibilityStudyState?.machinnarieDetails
          ?.isUploadedMachineData === true ? (
          <div className="machineContent">
            <TypoDisplay level={6} className="projectStepper">
              Upload Consent
            </TypoDisplay>

            <div style={{ marginLeft: "5%", marginTop: "-1%" }}>
              <UploadFile
                fileName={
                  props?.defaultFeasibilityStudyState?.machinnarieDetails
                    ?.actualFileName
                }
                folderName="feasibility-machine-use"
                setUploadedFileName={props.setUploadedFileNameMachine}
                setFileUploadResponse={props.setFileUploadResponse}
                setFileUploadedStatusParent={setFileUploadedStatusMachine}
                fileUploadedStatusParent={fileUploadedStatusMachine}
              />
            </div>
          </div>
        ) : (
          //     {props?.defaultFeasibilityStudyState?.machinnarieDetails
          //       ?.actualFileName !== "" && (
          //         <div className="form-group row ">
          //           <div className="col-md-12 mt-4">
          //             <label
          //               className="col-md-4 form-check-label mb-2"
          //               for="soilSamplingData"
          //             >
          //               Uploaded File Name
          //             </label>
          //             <div
          //               className={`"col-sm-12" ${props.editData ? "removeDisable" : "remove"
          //                 }`}
          //             >
          //               {
          //                 props?.defaultFeasibilityStudyState?.machinnarieDetails
          //                   ?.actualFileName
          //               }
          //               <div>
          //                 <Button
          //                   variant="text"
          //                   className="removeButton"
          //                   startIcon={<ClearIcon />}
          //                   onClick={() => {
          //                     removeFile("feasibility-machine-use");
          //                   }}
          //                 >
          //                   Remove
          //                 </Button>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       )}
          //   </div>
          // </div>
          <>
            {props?.defaultFeasibilityStudyState?.machinnarieDetails?.activities?.map(
              (element, index) => (
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Machine Use {index + 1}</Accordion.Header>
                    <Accordion.Body>
                      <div className="parentInput">
                        <div className="childInputName">
                          {" "}
                          <Select
                            label="Activity"
                            variant="outlined"
                            fullWidth
                            disabled={isDisabled}
                            menuMaxHeight="260px"
                            onChange={(e) =>
                              handleDropdownChange(index, e, "Activity")
                            }
                            value={element.Activity}
                          >
                            {MACHINE_ACTIVITY_DROPDOWN?.map((item, index) => {
                              return (
                                <SelectOption key={index} value={item.name}>
                                  {item.name}
                                </SelectOption>
                              );
                            })}
                          </Select>
                        </div>{" "}
                        <div className="childInputName">
                          {" "}
                          <Select
                            label="Timing"
                            variant="outlined"
                            fullWidth
                            disabled={isDisabled}
                            menuMaxHeight="260px"
                            onChange={(e) =>
                              handleDropdownChange(index, e, "Timing")
                            }
                            value={element.Timing}
                          >
                            {MACHINE_TIMING?.map((item, index) => {
                              return (
                                <SelectOption key={index} value={item.name}>
                                  {item.name}
                                </SelectOption>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      <br />
                      <div className="parentInput">
                        <div className="childInputName">
                          {" "}
                          <Textfield
                            label="Equipment"
                            fullWidth
                            variant="outlined"
                            disabled={isDisabled}
                            maxLength={50}
                            value={element.Equipment}
                            onChange={(e) =>
                              handleChange(index, e, "Equipment")
                            }
                          />
                        </div>
                        <div className="childInputName">
                          {" "}
                          <Textfield
                            fullWidth="true"
                            type="number"
                            variant="outlined"
                            disabled={isDisabled}
                            onKeyDown={blockInvalidChar}
                            label="Number or Runs(per year)"
                            value={element["Number or Runs(per year)"]}
                            onChange={(e) =>
                              handleChange(index, e, "Number or Runs(per year)")
                            }
                          />
                        </div>
                      </div>
                      <br />{" "}
                      <div className="parentInput">
                        <div className="childInputName">
                          {" "}
                          <Textfield
                            label="Tractor Power(in hp)"
                            fullWidth
                            type="number"
                            variant="outlined"
                            name="Tractor Power(in hp)"
                            onKeyDown={blockInvalidChar}
                            disabled={isDisabled}
                            maxLength={50}
                            value={element["Tractor Power(in hp)"]}
                            onChange={(e) =>
                              handleChange(index, e, "Tractor Power(in hp)")
                            }
                          />
                        </div>
                        <div className="childInputName">
                          {" "}
                          <Textfield
                            label="Fuel Consumption(in litre/hour)"
                            type="number"
                            onKeyDown={blockInvalidChar}
                            fullWidth
                            variant="outlined"
                            name="Fuel Consumption(in litre/hour)"
                            disabled={isDisabled}
                            value={element["Fuel Consumption(in litre/hour)"]}
                            onChange={(e) =>
                              handleChange(
                                index,
                                e,
                                "Fuel Consumption(in litre/hour)"
                              )
                            }
                          />
                        </div>
                      </div>
                      <br />
                      <div className="parentInput">
                        <div className="childInputName">
                          {" "}
                          <Textfield
                            label="Area Of Activity(in ha)"
                            type="number"
                            variant="outlined"
                            name="Area Of Activity(in ha)"
                            fullWidth
                            disabled={isDisabled}
                            onKeyDown={blockInvalidChar}
                            value={element["Area Of Activity(in ha)"]}
                            onChange={(e) =>
                              handleChange(index, e, "Area Of Activity(in ha)")
                            }
                          />
                        </div>
                        <div className="childInputName">
                          {" "}
                          <Textfield
                            label="Operations Time(in h/ha)"
                            type="number"
                            variant="outlined"
                            InputProps={{
                              inputProps: { min: 0 },
                            }}
                            name="Operations Time(in h/ha)"
                            fullWidth
                            onKeyDown={blockInvalidChar}
                            disabled={isDisabled}
                            value={element["Operations Time(in h/ha)"]}
                            onChange={(e) =>
                              handleChange(index, e, "Operations Time(in h/ha)")
                            }
                          />
                        </div>
                      </div>
                      <br />
                      <div style={{ display: "flex", marginLeft: "1%" }}>
                        <Button
                          disabled={isDisabled}
                          variant="outlined"
                          leadingIcon="add"
                          label="Add Activity"
                          onClick={() => addMachineActivityDetails()}
                        />

                        {/* {props?.defaultFeasibilityStudyState?.machinnarieDetails
                          ?.activities?.length > 1 ? ( */}
                        <div style={{ marginLeft: "1%" }}>
                          <Button
                            disabled={
                              isDisabled ||
                              props?.defaultFeasibilityStudyState
                                ?.machinnarieDetails?.activities?.length === 1
                            }
                            variant="text"
                            label="Remove Activity"
                            onClick={() => removeMachineActivityDetails(index)}
                          />
                        </div>
                        {/* ) : null} */}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )
            )}
          </>
        )}
      </div>
    </>
  );
}
