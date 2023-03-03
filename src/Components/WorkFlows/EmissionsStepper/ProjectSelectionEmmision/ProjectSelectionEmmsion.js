import React from "react";
import { Select, SelectOption, } from "@element/react-components";
import { GET_REQUEST, } from "../../../Utilities/RestEndPoint";

export default function ProjectSelectionEmmision(props) {
  const handleDropdownChange = async (ev, name) => {
    if (name = "projectId") {
      let nameData = ev.value;
      let projectIdFarmerData = nameData.substring(nameData.indexOf('-') + 1, nameData.length)
      let farmerId = await GET_REQUEST(
        `getAllFarmers/${projectIdFarmerData}`
      );
      props?.setFarmerIDData(farmerId.farmers);
    }

    const data = { ...props.defaultEmission.companyDetails, [name]: ev.value };
    props.updateCompanyDetailsHandler(data);
  };

const handleDropdownFarmerChange =  async (ev, name) => {
  if (name = "farmerId") {
    let nameData = ev.value;
    let projectIdFarmerData = nameData.substring(nameData.indexOf('-') + 1, nameData.length)
    let infoData =
    projectIdFarmerData &&
      (await GET_REQUEST(
        `getFarmerDetails/${projectIdFarmerData}`
      ));
    props?.setHeaderInfo(infoData);
  }

  const data = {
    ...props.defaultEmission.companyDetails,
    [name]: ev.value,
  };
  props.updateCompanyDetailsHandler(data);
};


  return (
    <>
      <div className="mainFeasibility">
        <div className="selectionContent">
          <Select
            label={"Project List"}
            variant="outlined"
            menuMaxHeight='260px'
            value={props?.defaultEmission?.companyDetails?.projectId}
            onChange={(ev) => handleDropdownChange(ev, "projectId")}
            disabled={props?.disableEmissionValues}
            fullWidth={true}
          >
            {props?.editEmissionData ? (
              <SelectOption
                value={
                  props?.editEmissionData.companyDetails?.projectId
                }
              >
                {props?.editEmissionData.companyDetails?.projectId}
              </SelectOption>
            ) : (
              props?.projectIDData &&
              props.projectIDData?.map((item) => {
                return <SelectOption value={item}>{item}</SelectOption>;
              })
            )}
          </Select>


          <div style={{ marginTop: "3%" }}>
            <Select
              variant="outlined"
              onChange={(ev) => handleDropdownFarmerChange(ev, "farmerId")}
              label={"Farmer ID"}
              menuMaxHeight='260px'
              disabled={props.disableEmissionValues || props.defaultEmission.companyDetails?.projectId === ""}
              value={props?.defaultEmission?.companyDetails?.farmerId}
            >
             {props?.editEmissionData ? (
              <SelectOption
                value={
                  props?.editEmissionData.companyDetails?.farmerId
                }
              >
                {props?.editEmissionData.companyDetails?.farmerId}
              </SelectOption>
            ) : (props?.farmerIDData &&
                props.farmerIDData?.map((item, index) => {
                  return (
                    <SelectOption value={item}>
                      {item}
                    </SelectOption>
                  );
                }))}
            </Select>
          </div></div>
      </div>
    </>
  );
}
