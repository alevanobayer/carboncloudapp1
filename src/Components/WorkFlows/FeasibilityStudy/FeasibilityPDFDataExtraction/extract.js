// import { useState, useEffect, useReducer } from "react";
// import Typography from "@mui/material/Typography";
// import "../../../WorkFlows/FeasibilityStudy/FeasibilityStudy.css";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   DialogActions,
//   Input,
// } from "@mui/material";
// import { YEAR_DROPDOWN } from "../../CommonComponents/CommonStaticData";
// import { FeasibilityStudyJSON } from "../../CommonComponents/DefaultDataJSON/FeasibilityStudyJSON";
// import UploadFile from "../../../Utilities/UploadFile";
// import { GET_REQUEST, POST_REQUEST } from "../../../Utilities/RestEndPoint";
// import "./extraction.css";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// export default function FeasibilityPDFDataExtraction(props) {
//   const [exportData, setExportData] = useState([]);
//   const [projectID, setProjectID] = useState();
//   const [fileUploadResponse, setFileUploadResponse] = useState("");
//   const [uploadedFileName, setUploadedFileName] = useState("");
//   const [openModalExtraction, setOpenModalExtraction] = useState(false);
//   const [message, setMessage] = useState(false);
//   let acceptType = "pdf";

//   const ACTION_TYPES = {
//     UPDATE_EXTRACTION: "update_extraction",
//   };
//   function reducer(state, action) {
//     switch (action.type) {
//       case ACTION_TYPES["UPDATE_EXTRACTION"]:
//         return { ...action.payload };
//       default:
//         throw new Error();
//     }
//   }
//   const [defaultFeasibilityStudyState, dispatch] = useReducer(
//     reducer,
//     JSON.parse(JSON.stringify(FeasibilityStudyJSON))
//   );
//   useEffect(() => {
//     console.log(fileUploadResponse, "From machine use");
//   }, [fileUploadResponse]);

//   const ITEM_HEIGHT = 58;
//   useEffect(() => {
//     async function fetchData() {
//       let projectSelection = await GET_REQUEST(
//         `getAllExportFeasibilityStudyDetails`
//       );
//       setExportData(projectSelection);
//     }
//     fetchData();
//   }, []);
//   const updateExtractionHandler = (ExtractionObj) => {
//     const data = {
//       ...defaultFeasibilityStudyState,
//       ExtractionDetails: ExtractionObj,
//     };
//     dispatch({ payload: { ...data }, type: "update_extraction" });
//   };
//   const handleDropdownChange = async (ev, projectExportData) => {
//     if (ev.target.name === "ProjectID") {
//       setProjectID(ev.target.value);
//       let report = await GET_REQUEST(
//         `getPdfExtractionProject?projectId=${ev.target.value}`
//       );
//       if (report === true) {
//         setMessage(true);
//       } else {
//         setMessage(false);
//       }
//     }
//   };

//   let handleChange = (i, e) => {
//     let newExtractionDetailsArray = [
//       ...defaultFeasibilityStudyState.ExtractionDetails.pdfExtractionData,
//     ];
//     newExtractionDetailsArray[i][e.target.name] = e.target.value;
//     const data = {
//       ...defaultFeasibilityStudyState.ExtractionDetails,
//       pdfExtractionData: newExtractionDetailsArray,
//     };
//     updateExtractionHandler(data);
//   };
//   const finalData = {
//     projectId: projectID,
//     isUploadedPdfFile:
//       defaultFeasibilityStudyState?.ExtractionDetails?.isUploadedPdfFile,
//     uploadLoc: fileUploadResponse.key,
//     actualFileName: uploadedFileName,
//     pdfExtractionData:
//       defaultFeasibilityStudyState?.ExtractionDetails?.pdfExtractionData[0],
//   };
//   const extractionDataSave = () => {
//     async function extractionDataApiCall() {
//       let responseData = await POST_REQUEST("pdfExtraction-create", finalData);
//       if (responseData.statusCode === 201) {
//         setOpenModalExtraction(true);
//       }
//     }
//     extractionDataApiCall();
//   };
//   const blockInvalidChar = (e) =>
//     ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

//   const isEmpty =
//     defaultFeasibilityStudyState.ExtractionDetails.pdfExtractionData[0];
//   //  const isEmpty = !Object.values(defaultFeasibilityStudyState.ExtractionDetails.pdfExtractionData[0]).some(x =>  x!=="");
//   const DisableButon =
//     uploadedFileName === "" ||
//     projectID === "" ||
//     isEmpty.Quantification === "" ||
//     isEmpty["Quantification/ha"] === "" ||
//     isEmpty.Region === "" ||
//     isEmpty.Sequestration === "" ||
//     isEmpty.Supplier === "" ||
//     isEmpty["SOC Quantification/ha"] === "" ||
//     isEmpty["Number of Grower"] === "" ||
//     isEmpty.Reduction === "" ||
//     isEmpty.Hectares === "" ||
//     isEmpty["Absolute Potential"] === "" ||
//     isEmpty["Potential Reduction"] === "" ||
//     isEmpty.Interventions === "";
//   return (
//     <div className="mainContent">
//       <section className="p-4 pb-4 mainSection">
//         <Typography component="h1" variant="h4" align="center">
//           PDF Data Extraction/Manual Input
//         </Typography>
//         <br />
//         <br />
//         {defaultFeasibilityStudyState?.ExtractionDetails?.pdfExtractionData?.map(
//           (element, index) => (
//             <div>
//               <div className="form-group row col-md-12 ">
//                 <label for="activity" className="col-md-2 col-form-label ">
//                   Project ID
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <Select
//                     name="ProjectID"
//                     key="companyID"
//                     className="dropDownInputExport"
//                     value={projectID || ""}
//                     MenuProps={{
//                       style: {
//                         maxHeight: ITEM_HEIGHT * 4.5,
//                         width: "20ch",
//                       },
//                     }}
//                     onChange={handleDropdownChange}
//                     // disabled={props.disableCompanyDetailsValues}
//                     fullWidth={true}
//                   >
//                     {exportData &&
//                       exportData?.map((item) => {
//                         return (
//                           <MenuItem key={index} value={item}>
//                             {item}
//                           </MenuItem>
//                         );
//                       })}
//                   </Select>

//                   {message && (
//                     <span style={{ color: "red" }}>
//                       Warning! Data already extracted.
//                     </span>
//                   )}
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label for="UOM" className="col-md-2 col-form-label ">
//                   Quantification
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-sm-3">
//                   <TextField
//                     id="Quantification"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Quantification"
//                     onChange={(e) => handleChange(index, e)}
//                     className="dropDownInputExport"
//                     value={element.Quantification}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-1 "></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label for="Year" className="col-md-2 col-form-label ">
//                   Year<span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <Select
//                     name="Year"
//                     key="YearId"
//                     className="dropDownInputExport"
//                     value={element.Year}
//                     MenuProps={{
//                       style: {
//                         maxHeight: ITEM_HEIGHT * 4.5,
//                         width: "20ch",
//                       },
//                     }}
//                     onChange={(e) => handleChange(index, e)}
//                     // disabled={props.disableCompanyDetailsValues}
//                     fullWidth={true}
//                   >
//                     {YEAR_DROPDOWN?.map((item) => {
//                       return <MenuItem value={item}>{item}</MenuItem>;
//                     })}
//                   </Select>
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label
//                   for="Quantification/ha"
//                   className="col-md-2 col-form-label "
//                 >
//                   Quantification/ha
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3">
//                   <TextField
//                     id="Quantification/haId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Quantification/ha"
//                     className="boxes"
//                     onChange={(e) => handleChange(index, e)}
//                     value={element["Quantification/ha"]}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-1 col-form-label"></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label for="Region" className="col-md-2 col-form-label ">
//                   Region
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <TextField
//                     id="RegionId"
//                     type="text"
//                     name="Region"
//                     className="boxes"
//                     onChange={(e) => handleChange(index, e)}
//                     value={element.Region}
//                   />
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label
//                   for="Quantification/ha"
//                   className="col-md-2 col-form-label "
//                 >
//                   Sequestration
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3">
//                   <TextField
//                     id="SequestrationId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Sequestration"
//                     className="boxes"
//                     onChange={(e) => handleChange(index, e)}
//                     value={element.Sequestration}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-1 col-form-label"></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label for="Region" className="col-md-2 col-form-label ">
//                   Supplier
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <TextField
//                     id="SupplierId"
//                     type="text"
//                     name="Supplier"
//                     className="boxes"
//                     onChange={(e) => handleChange(index, e)}
//                     value={element.Supplier}
//                   />
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label
//                   for="Quantification/ha"
//                   className="col-md-2 col-form-label "
//                 >
//                   SOC Quantification/ha
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3">
//                   <TextField
//                     id="SOCId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="SOC Quantification/ha"
//                     className="boxes"
//                     onChange={(e) => handleChange(index, e)}
//                     value={element["SOC Quantification/ha"]}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-1 col-form-label"></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label for="Region" className="col-md-2 col-form-label ">
//                   Number of Grower
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <TextField
//                     id="GrowerId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Number of Grower"
//                     className="boxes"
//                     onChange={(e) => handleChange(index, e)}
//                     value={element["Number of Grower"]}
//                   />
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label
//                   for="Quantification/ha"
//                   className="col-md-2 col-form-label "
//                 >
//                   Reduction
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3">
//                   <TextField
//                     id="ReductionId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     onChange={(e) => handleChange(index, e)}
//                     name="Reduction"
//                     className="boxes"
//                     value={element.Reduction}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-1 col-form-label"></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label for="Region" className="col-md-2 col-form-label ">
//                   Hectares
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <TextField
//                     id="HectaresId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Hectares"
//                     onChange={(e) => handleChange(index, e)}
//                     className="boxes"
//                     value={element.Hectares}
//                   />
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label
//                   for="Quantification/ha"
//                   className="col-md-2 col-form-label "
//                 >
//                   Absolute Potential
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3">
//                   <TextField
//                     id="PotentialId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Absolute Potential"
//                     onChange={(e) => handleChange(index, e)}
//                     className="boxes"
//                     value={element["Absolute Potential"]}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-1 col-form-label"></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label
//                   for="Quantification/ha"
//                   className="col-md-2 col-form-label "
//                 >
//                   Potential Reduction
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 " style={{ marginLeft: "10px" }}>
//                   <TextField
//                     id="ReductionId"
//                     type="number"
//                     onKeyDown={blockInvalidChar}
//                     name="Potential Reduction"
//                     onChange={(e) => handleChange(index, e)}
//                     className="boxes"
//                     value={element["Potential Reduction"]}
//                   />
//                 </div>
//                 <div className="col-md-1 col-form-label"></div>
//                 <label for="Region" className="col-md-2 col-form-label ">
//                   Interventions
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div className="col-md-3 ">
//                   <TextField
//                     id="InterventionsId"
//                     type="text"
//                     name="Interventions"
//                     InputProps={{
//                       style: {
//                         height: "120px",
//                       },
//                     }}
//                     onChange={(e) => handleChange(index, e)}
//                     className="bigBox"
//                     value={element.Interventions}
//                   />
//                 </div>
//               </div>

//               <div
//                 className="col-md-1 col-form-label"
//                 style={{ marginTop: "-7%" }}
//               ></div>
//               <br />
//               <div className="form-group row col-md-12 ">
//                 <label for="Region" className="col-md-2 col-form-label ">
//                   Upload PDF Data
//                   <span style={{ color: "red", marginLeft: "4%" }}>*</span>
//                 </label>
//                 <div
//                   className="col-sm-5"
//                   style={{ marginTop: "-2%", marginLeft: "2px", width: "40%" }}
//                 >
//                   <UploadFile
//                     fileName={uploadedFileName}
//                     type={acceptType}
//                     folderName="PDF-Data-Extraction"
//                     setUploadedFileName={setUploadedFileName}
//                     setFileUploadResponse={setFileUploadResponse}
//                   />
//                   {uploadedFileName !== "" && (
//                     <div className="form-group row ">
//                       <div className="col-sm-12">
//                         <TextField
//                           id="uploadFileName"
//                           type="text"
//                           name="farmerAddress"
//                           fullWidth={true}
//                           readOnly
//                           className="inputBoxMUI"
//                           value={uploadedFileName}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//         <div className="submitButton">
//           <Button
//             variant="contained"
//             sx={{ mt: 3, ml: 1 }}
//             disabled={DisableButon}
//             onClick={extractionDataSave}
//           >
//             {"Submit"}
//           </Button>
//         </div>
//         {openModalExtraction && (
//           <div>
//             <Dialog open={openModalExtraction} maxWidth="lg" minWidth="lg">
//               <div>
//                 <DialogTitle style={{ textAlign: "center" }}>
//                   <CheckCircleOutlineIcon
//                     sx={{ color: "green", marginRight: "1%" }}
//                   />
//                   <span>Success</span>
//                 </DialogTitle>
//                 <DialogContent>
//                   <DialogContentText>
//                     <span>Data successfully extracted and stored</span>
//                   </DialogContentText>
//                 </DialogContent>
//               </div>
//               <DialogActions>
//                 <Button
//                   onClick={() => window.location.reload()}
//                   color="primary"
//                   variant="outlined"
//                 >
//                   OK
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
