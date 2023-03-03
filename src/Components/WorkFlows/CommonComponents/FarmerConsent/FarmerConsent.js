import { useState, useEffect } from "react";
import "./farmerConsent.css";
import "./../../CommonComponents/Baseline.css";
import Box from "@mui/material/Box";
import axios from "axios";
import UploadFile from "../../../Utilities/UploadFile";
import { Document, Page, pdfjs } from "react-pdf";
import { TypoDisplay, Button, TypoSubtitle, Icon, IconButton } from "@element/react-components";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import ClearIcon from "@mui/icons-material/Clear";

export default function FarmerConsent(props) {
  const [completedStep, setCompletedStep] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pdfData,setPdfData]=useState();
  const [download, setDownload] = useState(false);
  let token=window.localStorage.getItem('jwt');
  const type = "pdf";
  const [fileUploadedStatusFarmer, setFileUploadedStatusFarmer] = useState(false);
  const farmerIDSave=props?.defaultEmission?.companyDetails?.farmerId;
  let farmerIdPdf= farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave;
  

  useEffect(() => {
    let screenName = "";
    let booleanValue = false;
    if (props?.editEmissionData === undefined) {
      if (Object.keys(props.completed).length === 0) {
        screenName = "Project Selection";
        booleanValue = true;
      }
    }

    setCompletedStep(screenName);
    setIsDisabled(booleanValue);
  }, [props.completed]);

  useEffect(() => {
    const data = {
      ...props.defaultEmission.farmerConsent,
      actualFileName: props.uploadedFileName,
      uploadLoc: props?.editEmissionData
        ? props?.editEmissionData?.farmerConsent?.uploadLoc
        : props?.fileUploadResponseFarmer?.key,
    };
    props.updateFarmerConsentDetailsHandler(data);
  }, [props.uploadedFileName]);
  const removeFile = (idName) => {
    if (document.getElementById(idName)) {
      document.getElementById(idName).value = "";
      if (idName === "emission_farmer_consent") {
        props?.setUploadedFileName("");
        props?.defaultEmission?.farmerConsent?.actualFileName === "";
        setFileUploadedStatusFarmer(false);
      }
    }
  };
  useEffect(() => {
    async function downloadApi() {
      try {
        // It doesn't matter whether this api responds with the Content-Disposition header or not
        const response = await axios.get(
          `https://backend-carboncloud.emea-dev.int.bayer.com/api/farmerConsent-pdf-download/${farmerIdPdf}`,
          {
            responseType: "blob", // this is important!
            headers: {  'Authorization': `Bearer ${token}` },
          }
        );
        
        setPdfData(new Blob([response.data]))

      } catch (e) { 
        console.log("error")
      } //error handling }
    }

      downloadApi();
     
  }, []);
  const downloadConsentForm = async () => {
    const response = await axios.get(
      `https://backend-carboncloud.emea-dev.int.bayer.com/api/farmerConsent-pdf-download/${farmerIdPdf}`,
      {
        responseType: "blob", // this is important!
        headers: {  'Authorization': `Bearer ${token}` },
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Consent ${props.headerInfo?.farmerFirstName}${" "}${props.headerInfo?.farmerLastName}.pdf`); //this is the name with which the file will be downloaded
    link.click();
    // no need to append link as child to body.
    setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
    setDownload(false);
    if(download){
      downloadConsentForm();
    }
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
      <div className="farmerFeasibility">
        <div className="farmerContent">
          <TypoDisplay level={6} className="projectStepper">
            Upload Consent
          </TypoDisplay>

          <div style={{ marginLeft: "5%", marginTop: "-1%" }}>
            <UploadFile
              type={type}
              fileName={
                props?.defaultEmission?.farmerConsent?.actualFileName
              }
              folderName="emission_farmer_consent"
              uploadeFileName={props.uploadeFileName}
              setUploadedFileName={props?.setUploadedFileName}
              setFileUploadResponse={props.setFileUploadResponseFarmer}
              setFileUploadedStatusParent={setFileUploadedStatusFarmer}
              fileUploadedStatusParent={fileUploadedStatusFarmer}
            />
            {props?.defaultEmission?.farmerConsent
              ?.actualFileName !== "" && (
              <div style={{marginLeft:"-39%",fontSize:"12px"}}>

                      {
                        props?.defaultEmission?.farmerConsent
                          ?.actualFileName
                      }
                    <div>
                  
                </div>
              </div>
            )}
            {/* {props?.defaultEmission?.farmerConsent?.actualFileName !==
              "" && (
                <div className="form-group row ">
                  <div className="col-md-12 mt-4">
                    <label
                      className="col-md-4 form-check-label mb-2"
                      for="soilSamplingData"
                    >
                      Uploaded File Name
                    </label>
                    <div
                      className={`"col-sm-12" ${props.editEmissionData ? "removeDisable" : "remove"
                        }`}
                    >
                      <span style={{ padding: "0.4rem 0.2rem" }}>
                        {" "}
                        {
                          props?.defaultEmission?.farmerConsent
                            ?.actualFileName
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )} */}
          </div>
        </div>
        <div style={{ marginTop: "6%", width: "950px" }}>
          <div className="pdfHeadStyle">
            <div style={{ marginLeft: "2%", marginTop: "5px" }}> <TypoDisplay level={6}>Farmer Consent Form</TypoDisplay></div>

            {" "}
            <Button
              variant="text"
              leadingIcon="download"
              label="Download"
              style={{ marginLeft: "60%" }}
              onClick={downloadConsentForm}
            /> <div>
              {/* <a href={pdfData} target="_blank"><Icon icon={"open_in_new"} /></a> */}

            </div>
          </div>
          <div className="pdfStyle">
            <Box
              sx={{
                height: 400,
              }}
            >
              <Document
                file={pdfData}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.apply(null, Array(numPages))
                  .map((x, i) => i + 1)
                  .map((page) => (
                    <Page pageNumber={page} />
                  ))}
              </Document>
            </Box>
          </div>
        </div>
      </div>


    </>
  );
}
