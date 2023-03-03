import { useState, useEffect, useReducer, useCallback } from "react";
import { Accordion } from "react-bootstrap";
import { FarmerConfigurationJSON } from "../CommonComponents/DefaultDataJSON/FarmerConfigurationJSON";
import { GET_REQUEST, POST_REQUEST } from "../../Utilities/RestEndPoint";
import {
  TypoDisplay,
  Textfield,
  Select,
  SelectOption,
  Button,
  Icon,
  TypoBody,
  Dialog,
  DialogButton,Elevation
} from "@element/react-components";
import "./FarmerConfiguration.css";
import { useHistory, useLocation } from "react-router-dom";
import UploadFile from "../../Utilities/UploadFile";

export default function FarmerConfiguration(props) {
  const location = useLocation();
  const history = useHistory();
  const FIED_DATA_OBJECT = { fieldName: "", fileName: "" };
  const FARM_DATA_OBJECT = { farmName: "", fields: [FIED_DATA_OBJECT] };
  const DEFAULT_FARMER_DATA_OBJECT = {
    farmerFirstName: "",
    farmerLastName: "",
    documentID: "",
    farmerAddress: "",
    farmerEmail: "",
    farmerPhone: "",
    farmerCountry: "",
    farmerCrops: "",
    farmerCompanies: "",
    createdBy: props.accounts[0].name,
  };

  const [farmerDetails, setFarmerDetails] = useState(
    JSON.parse(JSON.stringify(DEFAULT_FARMER_DATA_OBJECT))
  );
  const [companyDropDownList, setCompanyDropDownList] = useState([]);
  const [countryDropDownList, setCountryDropDownList] = useState([]);
  const [cropDropDownList, setCropDropDownList] = useState([]);
  const [validation, setValidation] = useState(true);
  const [disable, setDisable] = useState(true);
  const [companyData,setCompanyData]=useState();
  const [openModal, setOpenModal] = useState(false);
  const [fileUploadResponse, setFileUploadResponse] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const [error, setError] = useState({
    farmerFirstName: "",
  });
  const [message, setMessage] = useState("");
  const [cropvalue,setCropValue]=useState();
  const [companyValue,setCompanyValue]=useState();
  const [cropData,setCropData]=useState();
  const companyDropDownListSort = companyDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );
  const countryDropDownListSort = countryDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );
  const cropDropDownListSort = cropDropDownList?.sort((a, b) =>
    a > b ? 1 : -1
  );
  const [apiResponseMessage, setApiResponseMessage] = useState("");
  /*Start Handling State management Logic*/
  const ACTION_TYPES = {
    ADD_FARM_DATA: "add_farm_data",
    ADD_FIELD_DATA: "add_field_data",
    REMOVE_FARM_DATA: "remove_farm_data",
    REMOVE_FIELD_DATA: "remove_field_data",
    UPDATE_FARM_DATA: "update_farm_data",
    UPDATE_FIELD_DATA: "update_field_data",
  };
  useEffect(() => {
    if (location?.state?.detail) {
      setFarmerDetails(location?.state?.detail);
     const companies= location?.state?.detail.farmerCompanies.map(obj=>obj.companyName)
     const crops=location?.state?.detail.farmerCrops.map(obj=>obj.cropName)
     setCropData(crops);
    setCompanyData(companies)
      
    }
    setDisable(true);
  }, [location]);
  console.log(companyData)
  useEffect(() => {
    async function fetchData() {
      let responseData = await GET_REQUEST("getAllProjectInitDetails");
      setCompanyDropDownList(responseData.companiesList);
      setCountryDropDownList(responseData.countriesList);
      setCropDropDownList(responseData.cropList);
    }
    fetchData();
  }, []);
  function reducer(state, action) {
    switch (action.type) {
      case ACTION_TYPES["ADD_FARM_DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["ADD_FIELD_DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["REMOVE_FARM_DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["REMOVE_FIELD_DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_FARM_DATA"]:
        return { ...action.payload };
      case ACTION_TYPES["UPDATE_FIELD_DATA"]:
        return { ...action.payload };
      default:
        throw new Error();
    }
  }
  function replaceHistory(e) {
    if (e) {
      e.preventDefault();

      delete e.returnValue;
    }

    history.replace({ ...history.location, state: undefined });
    window.location.reload();
  }

  const [defaultFarms, dispatch] = useReducer(
    reducer,
    JSON.parse(
      JSON.stringify(
        location?.state?.detail
          ? location?.state?.detail
          : FarmerConfigurationJSON
      )
    )
  );

  let addFarms = () => {
    const finalData = [...defaultFarms.farms, { ...FARM_DATA_OBJECT }];
    const data = { farms: [...finalData] };
    dispatch({ payload: { ...data }, type: "add_farm_data" });
  };
  const updateFieldsFileName = (fileName, farmsIndexValue, fieldindex) => {
    const fields = defaultFarms.farms[farmsIndexValue].fields;
    fields[fieldindex].fileName = fileName;
    const data = {
      farmName: defaultFarms.farms[farmsIndexValue].farmName,
      fields,
    };
    defaultFarms.farms[farmsIndexValue] = data;
    const finalData1 = { farms: [...defaultFarms.farms] };

    dispatch({ payload: { ...finalData1 }, type: "update_field_data" });
  };

  let addFields = (farmsValue, farmsIndexValue) => {
    const finalData = [
      ...defaultFarms.farms[farmsIndexValue].fields,
      { ...FIED_DATA_OBJECT },
    ];
    const data = {
      farmName: defaultFarms.farms[farmsIndexValue].farmName,
      fields: [...finalData],
    };
    defaultFarms.farms[farmsIndexValue] = data;
    const finalData1 = { farms: [...defaultFarms.farms] };
    dispatch({ payload: { ...finalData1 }, type: "add_field_data" });
  };

  const removeFarms = (i) => {
    let newFarms = [...defaultFarms.farms];
    newFarms.splice(i, 1);
    const data = { farms: [...newFarms] };
    dispatch({ payload: { ...data }, type: "remove_farm_data" });
  };
  const removeFields = (farmsIndexValue, fieldsIndexValue) => {
    let newFields = [...defaultFarms.farms[farmsIndexValue].fields];
    newFields.splice(fieldsIndexValue, 1);
    const data = {
      farmName: defaultFarms.farms[farmsIndexValue].farmName,
      fields: [...newFields],
    };
    defaultFarms.farms[farmsIndexValue] = data;
    const finalData1 = { farms: [...defaultFarms.farms] };
    dispatch({ payload: { ...finalData1 }, type: "remove_field_data" });
  };
  /*End Handling State management Logic*/

  let handleFarmsChange = (i, e, name) => {
    let newFarms = [...defaultFarms.farms];
    newFarms[i][name] = e.target.value;
    const data = { farms: [...newFarms] };
    dispatch({ payload: { ...data }, type: "update_farm_data" });
  };

  let handleFieldsChange = (farmsIndex, fieldsIndex, e, name) => {
    const finalData = [...defaultFarms.farms[farmsIndex].fields];
    finalData[fieldsIndex][name] = e.target.value;
    const data = {
      farmName: defaultFarms.farms[farmsIndex].farmName,
      fields: [...finalData],
    };
    defaultFarms.farms[farmsIndex] = data;
    const finalData1 = { farms: [...defaultFarms.farms] };
    dispatch({ payload: { ...finalData1 }, type: "update_field_data" });
  };

  const handleChange = (event, name) => {
    const data = { ...farmerDetails, [name]: event.target.value };
    setFarmerDetails({ ...data });
  };
  const handleCountryChange = (event, name) => {
    const data = { ...farmerDetails, [name]: event.value };
    setFarmerDetails({ ...data });
  };
  const handleCompanyChange = (event, name) => {
    const company = event.map((obj) => obj.value);
    const newCompany = company.map((companyName) => ({ companyName }));
    setCompanyValue(event)

    const data = { ...farmerDetails, [name]: newCompany };
    setFarmerDetails({ ...data });
  };

  const handleCropChange = (event, name) => {
    const crop = event.map((obj) => obj.value);
    const newCrop = crop.map((cropName) => ({ cropName }));
    setCropValue(event)
    const data = { ...farmerDetails, [name]: newCrop };
    setFarmerDetails({ ...data });
  };

  const emailValidation = (event) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,8}(.[a-z{1,8}])?/g;
    //setEmail(event.target.value);
    if (!regEx.test(event.target.value)) {
      setMessage("Email is invalid");
    } else {
      setMessage("");
    }
  };
  const handleError = (evt, name) => {
    if (name === "farmerFirstName" || name === "farmerLastName") {
      if (/[0-9]/.test(evt.key)) {
        evt.preventDefault();
        //   setError({...error,"farmerFirstName":message});
      } else {
        setError({ ...error, farmerFirstName: "" });
      }
    } else if (name === "documentID") {
      !/[0-9a-zA-Z}]/.test(evt.key) && evt.preventDefault();
    } else if (name === "farmerPhone") {
      !/[0-9+}]/.test(evt.key) && evt.preventDefault();
    }
  };
  const handleToClose = () => {
    setOpenModal(false);
    window.location.reload();
  };

  useEffect(() => {
    if (defaultFarms.farms.length > 0) {
      let countOfFarms = 0;
      let countOfFiedData = 0;
      defaultFarms.farms.map((element, index) => {
        for (const [key, value] of Object.entries(element)) {
          if (value === "") {
            countOfFarms++;
            return false;
          }
          if (typeof value === "object") {
            if (value.length > 0) {
              value.map((element, index) => {
                for (const [key, value] of Object.entries(element)) {
                  if (value === "") {
                    countOfFiedData++;
                    return false;
                  }
                }
              });
            }
          }
        }
      });
      let farmDetails = { ...farmerDetails };
      let status = Object?.values(farmDetails)?.every(
        (item) => item?.length > 0
      );
      if (status === true && countOfFarms === 0 && countOfFiedData === 0) {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
  }, [farmerDetails, defaultFarms]);
  const saveFarmerData = () => {
    const finalData = { ...farmerDetails, ...defaultFarms };

    async function saveFarmerInfo() {
      let responseData = await POST_REQUEST("farmer-create", finalData);
      if (responseData.statusCode === 201) {
        setFarmerDetails({ ...DEFAULT_FARMER_DATA_OBJECT });
        setApiResponseMessage(
          `The Farmer ${responseData.farmerId} has been created.`
        );
        dispatch({
          payload: {
            farms: [
              { farmName: "", fields: [{ fieldName: "", fileName: "" }] },
            ],
          },
          type: "add_farm_data",
        });
      } else {
        setApiResponseMessage(`${responseData.message}`);
      }
      setOpenModal(true);
    }
    saveFarmerInfo();
  };
  const actions = (
    <>
      <DialogButton action="ok" variant="text" focused>
        OK
      </DialogButton>
    </>
  );

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
            <a onClick={() => history.push("/home")}>Home</a> {">"} Project
            Administration {">"}Register Farmer

          </span>
        </TypoBody>
      </div>
    </Elevation><div className="mainContent">
        <div className="p-4 pb-4 mainSection">
          <TypoDisplay {...props} level={6}>
            Farmer Registration
          </TypoDisplay>
          <br />

          <br />

          <div>
            <Accordion defaultActiveKey="0" className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Farmer Data</Accordion.Header>
                <Accordion.Body>
                  <div className="parentInput">
                    <div className="childInputName">
                      <Textfield
                        label="First Name"
                        name="farmerFirstName"
                        variant="outlined"
                        fullWidth
                        disabled={location?.state?.detail}
                        value={farmerDetails.farmerFirstName}
                        onChange={(e) => handleChange(e, "farmerFirstName")}
                        onKeyPress={(evt) => handleError(evt, "farmerFirstName")}
                        maxlength={50} />
                    </div>
                    <div className="childInputLastName">
                      <Textfield
                        label="Last Name"
                        name="farmerLastName"
                        variant="outlined"
                        fullWidth
                        disabled={location?.state?.detail}
                        maxlength={50}
                        value={farmerDetails.farmerLastName}
                        onKeyPress={(evt) => handleError(evt, "farmerLastName")}
                        onChange={(e) => handleChange(e, "farmerLastName")} />
                    </div>
                  </div>
                  <br />
                  <div className="childInput">
                    {" "}
                    <Textfield
                      label="Email ID"
                      variant="outlined"
                      type="email"
                      fullWidth
                      disabled={location?.state?.detail}
                      maxlength={50}
                      value={farmerDetails.farmerEmail}
                      onBlur={(e) => emailValidation(e)}
                      onChange={(e) => handleChange(e, "farmerEmail")} />
                  </div>
                  {message && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "9px",
                      }}
                    >
                      {message}
                    </span>
                  )}
                  <br />
                  <div className="childInput">
                    {" "}
                    <Textfield
                      label="Phone Number"
                      variant="outlined"
                      type="text"
                      fullWidth
                      disabled={location?.state?.detail}
                      maxlength={16}
                      value={farmerDetails.farmerPhone}
                      onKeyPress={(evt) => handleError(evt, "farmerPhone")}
                      onChange={(e) => handleChange(e, "farmerPhone")} />
                  </div>{" "}
                  <br />
                  <div className="childInput">
                    <Textfield
                      label="Document ID"
                      name="documentID"
                      variant="outlined"
                      type="text"
                      disabled={location?.state?.detail}
                      fullWidth
                      maxLength={16}
                      onKeyPress={(evt) => handleError(evt, "documentID")}
                      value={farmerDetails.documentID}
                      onChange={(e) => handleChange(e, "documentID")} />
                  </div>
                  <br />
                  <div className="childInput">
                    {" "}
                    <Textfield
                      label="Address"
                      variant="outlined"
                      fullWidth
                      disabled={location?.state?.detail}
                      maxlength={250}
                      value={farmerDetails.farmerAddress}
                      onChange={(e) => handleChange(e, "farmerAddress")} />
                  </div>
                  <br />
                  <div className="childInput">
                    {" "}
                    <Select
                      label="Country"
                      variant="outlined"
                      fullWidth
                      menuMaxHeight='250px'
                      disabled={location?.state?.detail}
                      value={farmerDetails.farmerCountry}
                      onChange={(e) => handleCountryChange(e, "farmerCountry")}
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Project Info</Accordion.Header>
                <Accordion.Body>
                  <div className="childInput">
                    {" "}
                    {location?.state?.detail ? <Textfield
                      label="Company"
                      variant="outlined"
                      fullWidth
                      disabled={location?.state?.detail}
                      value={companyData?.map((data) => data)} /> : <Select
                        label="Company"
                        variant="outlined"
                        fullWidth
                        menuMaxHeight='250px'
                        multiSelect
                        value={companyValue}
                        onChange={(e) => handleCompanyChange(e, "farmerCompanies")}
                      >
                      {companyDropDownListSort?.map((item, index) => {
                        return (
                          <SelectOption key={index} value={item}>
                            {item}
                          </SelectOption>
                        );
                      })}
                    </Select>}
                  </div>
                  <br />
                  <div className="childInput">
                    {" "}
                    {location?.state?.detail ? <Textfield
                      label="Crop"
                      variant="outlined"
                      fullWidth
                      disabled={location?.state?.detail}
                      value={cropData?.map((data) => data)} /> : <Select
                        label="Crop"
                        variant="outlined"
                        fullWidth
                        multiSelect
                        menuMaxHeight='250px'

                        value={cropvalue}
                        onChange={(e) => handleCropChange(e, "farmerCrops")}
                      >
                      {cropDropDownListSort?.map((item, index) => {
                        return (
                          <SelectOption key={index} value={item}>
                            {item}
                          </SelectOption>
                        );
                      })}
                    </Select>}
                  </div>
                  <br />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {defaultFarms.farms.map((element, index) => (
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Farm {index + 1} Data</Accordion.Header>
                  <Accordion.Body>
                    <div className="childInput">
                      <Textfield
                        id="farmName"
                        type="text"
                        variant="outlined"
                        disabled={location?.state?.detail}
                        key={`farms${index}`}
                        label="Farm Name"
                        fullWidth
                        value={location?.state?.detail
                          ? `${element.farmName}${"-"}${element.farmId}`
                          : element.farmName}
                        onChange={(e) => handleFarmsChange(index, e, "farmName")} />
                    </div>

                    <br />

                    {element.fields?.map((item, i) => (
                      <>
                        <div className="childInput">
                          <Textfield
                            label={`Field Name${i + 1}`}
                            variant="outlined"
                            disabled={location?.state?.detail}
                            fullWidth
                            key={`fields${i}`}
                            value={location?.state?.detail
                              ? `${item.fieldName}${"-"}${item.fieldId}`
                              : item.fieldName}
                            onChange={(e) => handleFieldsChange(index, i, e, "fieldName")} />
                        </div>
                        <br />
                        <div className="parentInput">
                          <div style={{ marginLeft: "1%" }}>

                              <UploadFile
                                folderName="field_boundary"
                                farmIndex={index}
                                fileName={defaultFarms.farms[index].fields[i].fileName}
                                fieldIndex={i}
                                updateFields={updateFieldsFileName}
                                setUploadedFileName={setUploadFileName}
                                setFileUploadResponse={setFileUploadResponse}
                                uploadBox="uploadInputBoxWithoutMargin"
                                uploadButton="uploadInputButtonWithoutMargin" />
                                {defaultFarms.farms[index].fields[i].fileName !== "" && (
              <div style={{fontSize:"12px"}}>

                      {
                        defaultFarms.farms[index].fields[i].fileName
                      }
                    <div>
                  
                </div>
              </div>
            )}
                          </div>
                          <div className="removeField">
                            {" "}
                            <Button
                              key={`fieldsButton${i}`}
                              variant="text"
                              themeColor="onUnknownBlack"
                              disabled={element.fields.length === 1}
                              onClick={() => removeFields(index, i)}
                              label="Remove Field" />
                          </div>
                        </div>
                      </>
                    ))}
                    <br />
                    <div className="parentInput">
                      <div className="childInput">
                        <Button
                          variant="filled"
                          color="error"
                          disabled={location?.state?.detail ||
                            defaultFarms.farms.length === 1}
                          label="Remove Farm"
                          onClick={() => removeFarms(index)}
                          fullWidth />
                      </div>
                      <div className="childInput">
                        <Button
                          key={`farmsButton${index}`}
                          variant="filled"
                          disabled={location?.state?.detail}
                          onClick={() => addFields(element, index)}
                          fullWidth
                          label="Add Field" />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
            <div className="parentInputButton">
              <div className="childInput">
                <Button
                  variant="outlined"
                  disabled={location?.state?.detail}
                  onClick={() => addFarms()}
                  fullWidth
                  label={"Add Farm"} />
              </div>
              {location?.state?.detail ? (
                <div className="childInput">
                  <Button
                    variant="filled"
                    fullWidth
                    label="Create New"
                    disabled={validation}
                    onClick={() => {
                      replaceHistory();
                    } } />
                </div>
              ) : (
                <div className="childInput">
                  <Button
                    variant="filled"
                    label="Save"
                    // disabled={validation}
                    onClick={saveFarmerData}
                    fullWidth />
                </div>
              )}
            </div>
          </div>

          {openModal && (
            <div>
              <Dialog open={openModal} actions={actions} onClosed={handleToClose}>
                <div style={{ display: "flex" }}>
                  <Icon icon="check_circle_outline" style={{ color: "green" }} />
                  <TypoDisplay level={6}>Success</TypoDisplay>
                </div>
                <div style={{ marginTop: "4%" }}>
                  <TypoBody>{apiResponseMessage}</TypoBody>
                </div>
              </Dialog>
              {/* <Dialog
              open={openModal}
              onClose={handleToClose}
              maxWidth="lg"
              minWidth="lg"
            >
              <div>
                <DialogTitle style={{ textAlign: "center" }}>
                  <CheckCircleOutlineIcon
                    sx={{ color: "green", marginRight: "1%" }}
                  />
                  <span>Success</span>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <span></span>
                    <DialogActions>
                      <Button
                        onClick={handleToClose}
                        color="primary"
                        variant="outlined"
                      >
                        Ok
                      </Button>
                    </DialogActions>
                  </DialogContentText>
                </DialogContent>
              </div>
            </Dialog> */}
            </div>
          )}
        </div>
      </div></>
  );
}
