import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import UploadFile from "../../Utilities/UploadFile";
import { TypoDisplay, Button, Icon, } from "@element/react-components";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingIcon from "../../Utilities/LoadingIcon";
import "./Baseline.css";

export default function BaselineProcess(props) {
  const [completedStep, setCompletedStep] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadedFileName1, setUploadedFileName1] = useState("");
  const [fileUploadedStatusParent, setFileUploadedStatusParent] =
    useState(false);
  const [fileUploadedStatusParent2, setFileUploadedStatusParent2] =
    useState(false);
  const [download, setDownload] = useState(false);
  let projectIDSave = props?.defaultEmission.companyDetails.projectId;
  let farmerIDSave = props?.defaultEmission.companyDetails.farmerId;
  let projectID=projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave;
  let farmerID= farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave;
  let token = window.localStorage.getItem('jwt');
  const downloadupload = () => {
    fetch({ uploadedFileName1 }).then((response) => {
      response.blob().then((blob) => { });
    });
  };
  const removeFile = (idName) => {
    if (document.getElementById(idName)) {
      document.getElementById(idName).value = "";
      if (idName === "emission_soil_sampling_data") {
        props.setUploadSoilFileName("");
        props?.defaultEmission?.baselineSoil?.actualFileName === "";
        if (props?.editEmissionData) {
          const data = {
            ...props?.editEmissionData?.baselineSoil,
            actualFileName: "",
            uploadLoc: "",
          };

          props.updateBaselineHandler(data);
        }
        setFileUploadedStatusParent(false);
      } else {
        props.setUploadFieldFileName("");
        props?.defaultEmission?.baselineField?.actualFileName === "";
        if (props?.editEmissionData) {
          const data = {
            ...props?.editEmissionData?.baselineField,
            actualFileName: "",
            uploadLoc: "",
          };

          props.updateBaselineFileHandler(data);
        }
        setFileUploadedStatusParent2(false);
      }
    }
  };
  useEffect(() => {
    const data = {
      ...props.defaultEmission.uploadSoilFileName,
      actualFileName: props.uploadSoilFileName,
      uploadLoc: props?.fileUploadResponseField?.key,
    };
    props.updateBaselineHandler(data);
  }, [props.uploadSoilFileName]);
  useEffect(() => {
    const data = {
      ...props.defaultEmission.baselineField,
      actualFileName: props.uploadFieldFileName,
      uploadLoc: props?.fileUploadResponseField?.key,
    };
    props.updateBaselineFileHandler(data);
  }, [props.uploadFieldFileName]);

  useEffect(() => {
    let screenName = "";
    let booleanValue = false;
    if (props?.editEmissionData === undefined) {
      if (Object.keys(props.completed || {}).length === 0) {
        screenName = "Project Selection";
        booleanValue = true;
      } else if (Object.keys(props.completed || {}).length === 1) {
        screenName = "Farmer Consent";
        booleanValue = true; //Fill farmer consent data
      }
    }

    setCompletedStep(screenName);
    setIsDisabled(booleanValue);
  }, [props.completed]);
  useEffect(() => {
    async function downloadApi() {
      try {
        // It doesn't matter whether this api responds with the Content-Disposition header or not
        const response = await axios.get(
          `https://backend-carboncloud.emea-dev.int.bayer.com/api/exportFieldData/${projectID}/${farmerID}`,
          {
            responseType: "blob", // this is important!
            headers: { 'Authorization': `Bearer ${token}` },
          }
        );


        const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `FieldData ${props.headerInfo?.farmerFirstName}${" "}${props.headerInfo?.farmerLastName} Template v1.xlsx`); //this is the name with which the file will be downloaded
        link.click();
        // no need to append link as child to body.
        setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
        setDownload(false);
      } catch (e) {
        console.log(props.defaultEmission.companyDetails.projectID);
      } //error handling }
    }

    if (download) {
      downloadApi();

    }
  }, [download]);
  const downloadSoilTemplate = () => {
    fetch("SoilData Template v1.xlsx").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `SoilData ${props.headerInfo?.farmerFirstName}${" "}${props.headerInfo?.farmerLastName} Template v1.xlsx`;
        alink.click();
      });
    });
  };
  const downloadFieldTemplate = () => {
    fetch("FieldData Template v1.xlsx").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        console.log(alink);
        alink.download = "FieldData Template v1.xlsx";
        alink.click();
      });
    });
  };
  return (
    <>
      {/* {isDisabled && (
        <div
          style={{ color: "red", fontSize: "20px" }}
          className="form-group col-md-12 text-center"
        >
          Please fill/save the {completedStep} fields.
        </div>
      )} */}

      <div className="baselineUpload">
        <div className="farmerContent">
          <TypoDisplay level={6} style={{ marginLeft: "-20%" }} >
            Upload Soil  Data
          </TypoDisplay>
          <div style={{ marginLeft: "5%", marginTop: "-1%" }}>
            <UploadFile
              fileName={props?.defaultEmission?.baselineSoil?.actualFileName}
              folderName="emission_soil_sampling_data"
              setUploadedFileName={props.setUploadSoilFileName}
              setFileUploadResponse={props.setFileUploadResponse}
              setFileUploadedStatusParent={setFileUploadedStatusParent}
              fileUploadedStatusParent={fileUploadedStatusParent}
            />
            {/* {props?.defaultEmission?.baselineSoil?.actualFileName !== "" && (
              <div
                className={`"col-sm-9" ${props.editEmissionData ? "removeDisable" : "remove"
                  }`}
              >
                {props?.defaultEmission?.baselineSoil?.actualFileName.slice(
                  0,
                  19
                ) + "..."}
                <div>
                  <Button
                    variant="text"
                    className="removeButton"
                    startIcon={<ClearIcon />}
                    onClick={() => {
                      removeFile("emission_soil_sampling_data");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )} */}
          </div>

          <Button
            variant="outlined"
            style={{ marginLeft: "4%", marginTop: "-2px" }}
            label="Download Template"
            onClick={downloadSoilTemplate}
          />

        </div>
        <div className="farmerContent">
          <TypoDisplay level={6} style={{ marginLeft: "-20%" }} >
            Upload Field  Data
          </TypoDisplay>
          <div style={{ marginLeft: "4%", marginTop: "-1%" }}>
            <UploadFile
              fileName={props?.defaultEmission?.baselineField?.actualFileName}
              folderName="BaseLine_Field_data"
              setUploadedFileName={props.setUploadFieldFileName}
              setFileUploadResponse={props.setFileUploadResponseField}
              setFileUploadedStatusParent={setFileUploadedStatusParent2}
              fileUploadedStatusParent={fileUploadedStatusParent2}
            />
            {/* {props?.defaultEmission?.baselineField?.actualFileName !== "" && (
              <div
                className={`"col-sm-9" ${props.editEmissionData ? "removeDisable" : "remove"
                  }`}
              >
                {props?.defaultEmission?.baselineField?.actualFileName.slice(
                  0,
                  19
                ) + "..."}
                <div>
                  <Button
                    variant="text"
                    className="removeButton"
                    startIcon={<ClearIcon />}
                    onClick={() => {
                      removeFile("BaseLine_Field_data");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )} */}
          </div>

          <Button
            variant="outlined"
            style={{ marginLeft: "4%", marginTop: "-2px" }}
            label="Download Template"
            onClick={() => setDownload(true)}
          />

        </div>
      </div>



    </>
  );
}
