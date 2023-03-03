import React from "react";
import { Select, SelectOption, Button } from "@element/react-components";
import "../../../ProjectAdministration/ProjectCreation.css";
import { GET_REQUEST, POST_REQUEST } from "../../../../Utilities/RestEndPoint";
export default function ProjectSelectionFeasibilty(props) {
  const handleFarmChange = (ev, name) => {
    let farmValue = props?.farmData?.filter(
      (element) => element.farmId === ev.value
    )[0].farmName;
    const data = {
      ...props.defaultFeasibilityStudyState.companyDetails,
      farmId: ev.value,
      farmName: farmValue,
    };
    props.updateCompanyDetailsHandler(data);
  };
  const handleDropdownChange = async (ev, name) => {
    if (name = "projectId") {
      let nameData = ev.value;
      let projectIdFarmerData = nameData.substring(nameData.indexOf('-') + 1, nameData.length)
      let farmerId = await GET_REQUEST(
        `getAllFarmers/${projectIdFarmerData}`
      );
      props?.setFarmerIDData(farmerId.farmers);
    }

    const data = {
      ...props.defaultFeasibilityStudyState.companyDetails,
      [name]: ev.value,
    };
    props.updateCompanyDetailsHandler(data);
  };

  const handleDropdownFarmerChange =  async (ev, name) => {
    if (name = "farmerId") {
      let nameData = ev.value;
      let projectIdFarmerData = nameData.substring(nameData.indexOf('-') + 1, nameData.length)

      let farmId = await GET_REQUEST(
        `getAllFarms/${projectIdFarmerData}`
      );
      let infoData =
      projectIdFarmerData &&
        (await GET_REQUEST(
          `getFarmerDetails/${projectIdFarmerData}`
        ));
      props?.setHeaderInfo(infoData);
      props?.setFarmData(farmId);
      // props?.setFarmerIDData(farmerId.farmers);
    }

    const data = {
      ...props.defaultFeasibilityStudyState.companyDetails,
      [name]: ev.value,
    };
    props.updateCompanyDetailsHandler(data);
  };
  const farmDisable = !(
    props.defaultFeasibilityStudyState?.companyDetails?.farmerId !== "" &&
    props.defaultFeasibilityStudyState?.companyDetails?.projectId !== ""
  );
  return (
    <>
      <div className="mainFeasibility">
        <div className="selectionContent">
          <Select
            variant="outlined"
            disabled={props.disableCompanyDetailsValues}
            menuMaxHeight='260px'
            onChange={(ev) => handleDropdownChange(ev, "projectId")}
            value={
              props?.editData
                ? props?.editData.companyDetails?.projectId
                : props?.defaultFeasibilityStudyState?.companyDetails?.projectId
            }
            label={"Project List"}
          >
            {props?.editData ? (
              <SelectOption
                value={
                  props?.editData.companyDetails?.projectId
                }
              >
                {props?.editData.companyDetails?.projectId}
              </SelectOption>
            ) : (
              props?.projectIDData &&
              props?.projectIDData?.map((item) => {
                return <SelectOption value={item}>{item}</SelectOption>;
              })
            )}
          </Select>

          <div style={{ marginTop: "3%" }}>
            {" "}
            <Select
              variant="outlined"
              menuMaxHeight='260px'
              onChange={(ev) => handleDropdownFarmerChange(ev, "farmerId")}
              disabled={props.disableCompanyDetailsValues||props.defaultFeasibilityStudyState?.companyDetails?.projectId === ""}
              value={
                props.editData
                  ? props?.editData.companyDetails?.farmerId
                  : props?.defaultFeasibilityStudyState?.companyDetails
                    ?.farmerId
              }
              label={"Farmer ID"}
            >
              {props?.editData ? (
                <SelectOption
                  value={
                    props?.editData.companyDetails?.farmerId
                  }
                >
                  {props?.editData.companyDetails?.farmerId}
                </SelectOption>
              ) : (

                props?.farmerIDData &&
                props?.farmerIDData?.map((item) => {
                  return (
                    <SelectOption value={item}>
                      {item}
                    </SelectOption>
                  );
                }))}
            </Select>
          </div>
          <div style={{ marginTop: "3%" }}>
            <Select
              variant="outlined"
              menuMaxHeight='260px'
              onChange={(ev) =>
                handleFarmChange(
                  ev,
                  props.defaultFeasibilityStudyState?.companyDetails?.farmName
                )
              }
              disabled={farmDisable || props.disableCompanyDetailsValues}
              value={
                props?.editData
                  ? props?.editData?.companyDetails?.farmName
                  : props.defaultFeasibilityStudyState?.companyDetails?.farmId
              }
              label={"Farm ID"}
              className="dropDownInput"
            >
              {props?.editData ? (
                <SelectOption
                  value={
                    props?.editData &&
                    props?.editData?.companyDetails &&
                    props?.editData?.companyDetails?.farmName
                  }
                >
                  {props?.editData &&
                    props?.editData?.companyDetails &&
                    props?.editData?.companyDetails?.farmName}
                </SelectOption>
              ) : (
                Array.isArray(props?.farmData) &&
                props?.farmData?.map((item, index) => {
                  return (
                    <SelectOption key={index} value={item?.farmId}>
                      {item?.farmName}
                    </SelectOption>
                  );
                })
              )}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
