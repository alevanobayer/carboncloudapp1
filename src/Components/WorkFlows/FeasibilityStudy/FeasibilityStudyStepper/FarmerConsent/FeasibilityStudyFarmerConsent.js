import { useState, useEffect } from "react";
import "../../../CommonComponents/FarmerConsent/farmerConsent.css";
import Box from "@mui/material/Box";
import axios from "axios";
import UploadFile from "../../../../Utilities/UploadFile";
import { TypoDisplay, Button, Icon, } from "@element/react-components";
import { Document, Page, pdfjs } from "react-pdf";
import Consent from "./Consent.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FeasibilityStudyFarmerConsent(props) {
  const [completedStep, setCompletedStep] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pdfData,setPdfData]=useState();
  const [download, setDownload] = useState(false);
  const farmerIDSave=props?.defaultFeasibilityStudyState?.companyDetails?.farmerId;
 let farmerIdPdf= farmerIDSave.includes('-') ? farmerIDSave.substring(farmerIDSave.indexOf('-') + 1, farmerIDSave.length) : farmerIDSave;
  const [fileUploadedStatusFarmer, setFileUploadedStatusFarmer] =
    useState(false);
    let token=window.localStorage.getItem('jwt');
  const type = "pdf";

  const removeFile = (idName) => {
    if (document.getElementById(idName)) {
      document.getElementById(idName).value = "";
      if (idName === "feasibility-farmer-consent") {
        props?.setUploadedFileName("");
        props?.defaultFeasibilityStudyState?.farmerConsent?.actualFileName ===
          "";

        if (props?.editData) {
          const data = {
            ...props?.editData?.farmerConsent,
            actualFileName: "",
          };
          props.updateFarmerConsentDetailsHandler(data);
        }
        setFileUploadedStatusFarmer(false);
      }
    }
  };
  useEffect(() => {
    let screenName = "";
    let booleanValue = false;
    if (props?.editData === undefined) {
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
      ...props.defaultFeasibilityStudyState.farmerConsent,
      actualFileName: props.uploadedFileName,
      uploadLoc: props?.editData
        ? props?.editData?.farmerConsent?.uploadLoc
        : props?.fileUploadResponseFarmer?.key,
    };
    props.updateFarmerConsentDetailsHandler(data);
  }, [props.uploadedFileName]);
  console.log(props?.headerInfo);
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

  // const downloadConsentForm = () => {
  //   fetch("Consent Agreement Farmers Template v1.docx").then((response) => {
  //     response.blob().then((blob) => {
  //       const fileURL = window.URL.createObjectURL(blob);
  //       let alink = document.createElement("a");
  //       alink.href = fileURL;
  //       alink.download = "Consent Agreement Farmers Template v1.docx";
  //       alink.click();
  //     });
  //   });
  // };
  return (
    <>
      {/* {isDisabled && (
        <div
          style={{ color: "red", fontSize: "20px",marginTop: "6%"  }}
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

          <div style={{ marginLeft: "5%",marginTop:"-1%" }}>
            <UploadFile
              type={type}
              fileName={
                props?.defaultFeasibilityStudyState?.farmerConsent
                  ?.actualFileName
              }
              folderName="feasibility-farmer-consent"
              uploadeFileName={props.uploadeFileName}
              setUploadedFileName={props.setUploadedFileName}
              setFileUploadResponse={props.setFileUploadResponseFarmer}
              setFileUploadedStatusParent={setFileUploadedStatusFarmer}
              fileUploadedStatusParent={fileUploadedStatusFarmer}
              disabled={props.disableFarmerValues}
            />
            {props?.defaultFeasibilityStudyState?.farmerConsent
              ?.actualFileName !== "" && (
              <div style={{marginLeft:"-39%",fontSize:"12px"}}>

                      {
                        props?.defaultFeasibilityStudyState?.farmerConsent
                          ?.actualFileName
                      }
                    <div>
                  
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: "6%",width:"950px" }}>
          <div className="pdfHeadStyle">
          <div style={{marginLeft:"2%",marginTop:"5px"}}> <TypoDisplay level={6}>Farmer Consent Form</TypoDisplay></div> 
           
              {" "}
              <Button
                variant="text"
                leadingIcon="download"
                label="Download"
                style={{marginLeft:"60%"}}
                onClick={downloadConsentForm}
              /> <div>
                {/* <Button href = {pdfData} target = "_blank"><Icon  icon={"open_in_new"}/></a> */}
              
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
