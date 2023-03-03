import React from "react";
import UploadFile from "../../../Utilities/UploadFile";
import { TypoDisplay } from "@element/react-components";
import { GET_REQUEST } from '../../../Utilities/RestEndPoint';
import { YEAR_DROPDOWN, } from "../../CommonComponents/CommonStaticData";

export default function ExtractionUpload(props) {
    let acceptType = "pdf";
    return (
        <>
            {props?.defaultFeasibilityStudyState?.ExtractionDetails?.pdfExtractionData?.map((element, index) => (
                  <div className="extractionContent">
                  <TypoDisplay level={6} className="extractiontStepper">
                    Upload Analysis PDF
                  </TypoDisplay>
      
                  <div style={{marginLeft: "10%",marginTop:"4%" }}>
                  <UploadFile
                    fileName={props?.uploadedFileName}
                    type={acceptType}
                    folderName="PDF-Data-Extraction"
                    setUploadedFileName={props?.setUploadedFileName}
                    setFileUploadResponse={props?.setFileUploadResponse}
                  />
                  </div>
                  {/* {uploadedFileName !== "" && (
                    <div className="form-group row ">
                      <div className="col-sm-12">
                        <TextField
                          id="uploadFileName"
                          type="text"
                          name="farmerAddress"
                          fullWidth={true}
                          readOnly
                          className="inputBoxMUI"
                          value={uploadedFileName}
                        />
                      </div>
                    </div>
                  )} */}
                </div>
            ))}
        </>
    );
}
