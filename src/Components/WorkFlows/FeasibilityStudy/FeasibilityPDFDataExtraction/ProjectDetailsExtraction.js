import { useState, useEffect,useReducer } from "react";
import { Select, SelectOption,Textfield } from "@element/react-components";
import { GET_REQUEST} from '../../../Utilities/RestEndPoint';
import { YEAR_DROPDOWN,} from "../../CommonComponents/CommonStaticData";

export default function ProjectDetailsExtraction(props) {
    const [message,setMessage]=useState(false);
    const handleDropdownChange = async (ev, name) => {
        if (name === "projectID") {
          let projectIDSave=ev.value
          let projectIdName= projectIDSave.includes('-') ? projectIDSave.substring(projectIDSave.indexOf('-')+1,projectIDSave.length) : projectIDSave;
          props?.setProjectID(projectIdName);
          props?.setProjectIDData(ev.value);
      
          let report = await GET_REQUEST(
            `getPdfExtractionProject?projectId=${projectIdName}`
          );
          if(report===true){
            setMessage(true);
          }      else{
            setMessage(false);
          }
        }
      }

  return (
    <>
    {props?.defaultFeasibilityStudyState?.ExtractionDetails?.pdfExtractionData?.map((element, index) => (
      <div className="mainFeasibility">
        <div className="selectionContent">
          <Select
            label={"Project ID"}
            variant="outlined"
            value={props?.projectIDData}
            onChange={(ev) => handleDropdownChange(ev, "projectID")}
            fullWidth={true}
          >

            {props?.exportData &&
              props.exportData?.map((item) => {
                return <SelectOption value={item}>{item}</SelectOption>;
              })}
          </Select>

          {message&&<span style={{color:'red'}}>Warning! Data already extracted.</span>}
         

        <div style={{ marginTop: "3%" }}>
          <Select
            variant="outlined"
            onChange={(e) => props?.handleChange(index,e, "Year")}
            label={"Year"}
            fullWidth={true}
            value={element.Year}
          >
            {YEAR_DROPDOWN.map((item) => {
                return (
                  <SelectOption value={item}>
                    {item}
                  </SelectOption>
                );
              })}
          </Select>
        </div>
        <div style={{ marginTop: "3%" }}>
               <Textfield
                 type="text"
                 name="Region"
                 label="Region"
                 fullWidth={true}
                 variant="outlined"
                 onChange={e => props.handleChange(index, e,"Region")}
                 value={element.Region} />
             </div>
             <div style={{ marginTop: "3%" }}>
               <Textfield
                 type="text"
                 name="Supplier"
                 label="Supplier"
                 fullWidth={true}
                 variant="outlined"
                 onChange={e => props.handleChange(index, e,"Supplier")}
                 value={element.Supplier} />
             </div>
             <div style={{ marginTop: "3%" }}>
               <Textfield
                 type="text"
                 name="Number of Grower"
                 label="Number of Grower"
                 fullWidth={true}
                 variant="outlined"
                 onChange={e => props.handleChange(index, e,"Number of Grower")}
                 value={element["Number of Grower"]} />
             </div>
        </div>
      </div>
    ))}
    </>
  );
}
