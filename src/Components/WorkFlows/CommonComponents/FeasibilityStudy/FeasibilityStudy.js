import { useState } from "react";
import Typography from '@mui/material/Typography';
import './feasibility.css'
import DynamicTableInput from "./DynamicTableInput";


export default function FeasibilityStudy(props) {
  const defaultData = props?.defaultFeasibilityStudyState.feasibilityStudyData.question1; 
  const [questions, setQuestionsData] = useState(defaultData);
  
  const handleChange = (event) => {
    const data = {...questions, [event.target.name]: event.target.value};
    setQuestionsData({...data});
    props.updateFeasibilityStudyDetailsHandler(data); 
}
  const TILLAGEDATA = {"dummyObject": {"tillageType": "", "tillageTiming": "", "machineryName": ""},
                        "columns": 3,
                        "labelNames": {
                          "LABEL_1": "Tillage type (e.g. conventional, reduced, no-till)",
                          "LABEL_2": "Tillage timing (frequency, seasons)",
                          "LABEL_3": "Machinery used (e.g. mouldboard plough, chisel, disk, drill)",
                        },
                        "questionSeries":"question1.2",
                        "fieldNames": ['tillageType', 'tillageTiming', 'machineryName']
                        };
  const FERTILIZERDATA = {"dummyObject": {"fertilizerInput": "", "amount": "", "applicationTiming": "", "machineryUsed": ""},
                        "columns": 4,
                        "labelNames": {
                          "LABEL_1": "Fertilizer / input type",
                          "LABEL_2": "Amount (per ha)",
                          "LABEL_3": "Application timing (frequency, season",
                          "LABEL_4": "Machinery used",
                        },
                        "questionSeries":"question1.6",
                        "fieldNames": ['fertilizerInput', 'amount', 'applicationTiming', 'machineryUsed']
                        };

  const CURRENTWEED_PESTCONTROL = {"dummyObject": {"agroChemicalType": "", "amount": "", "applicationTiming": "", "machineryUsed": ""},
                        "columns": 4,
                        "labelNames": {
                          "LABEL_1": "Agrochemical type",
                          "LABEL_2": "Amount (per ha)",
                          "LABEL_3": "Application timing (frequency, season",
                          "LABEL_4": "Machinery used",
                        },
                        "questionSeries":"question1.7",
                        "fieldNames": ['agroChemicalType', 'amount', 'applicationTiming', 'machineryUsed']
                        };

  const IRRIGATION_TYPE = {"dummyObject": {"irrigationType": "", "waterVolumeUsed": "", "applicationTiming": "", "powerSourceUsed": ""},
                        "columns": 4,
                        "labelNames": {
                          "LABEL_1": "Irrigation type",
                          "LABEL_2": "Water use volume (per ha and year)",
                          "LABEL_3": "Application timing (frequency, season",
                          "LABEL_4": "Power source used",
                        },
                        "questionSeries":"question2.1",
                        "fieldNames": ['irrigationType', 'waterVolumeUsed', 'applicationTiming', 'powerSourceUsed']
                        };
  const ENERGY_FUEL_DATA = {"dummyObject": {"activityType": "", "electricityUsed": "", "fossilFuelUsed": ""},
                        "columns": 3,
                        "labelNames": {
                          "LABEL_1": "Activity (e.g. irrigation, tillage run, spraying run)",
                          "LABEL_2": "Electricity used (quantity per ha, per year)",
                          "LABEL_3": "Fossil fuel used (quantity per fuel type, ha, year)",
                        },
                        "questionSeries":"question3.1",
                        "fieldNames": ['activityType', 'electricityUsed', 'fossilFuelUsed']
                        };
  const AREA_DESCRIPTION = {"dummyObject": {"region": "", "area": "", "fileRefernce": ""},
                        "columns": 3,
                        "labelNames": {
                          "LABEL_1": "Region",
                          "LABEL_2": "Area (ha)",
                          "LABEL_3": "File reference (GIS file or kml/kmz)",
                        },
                        "questionSeries":"question4.1",
                        "fieldNames": ['region', 'area', 'fileRefernce']
                        };


  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Feasibility Study
      </Typography>
      <div style={{ minHeight: '150px' }}>
       {
        <div>
            <span className="sectionName">
          1. Current practices on farms in the project area
        </span>
        <br />
        <br />
        <span className="labelCls" >1.1. Please describe current production approach and land management applied (practices over last 3 years) on the project area:<span style={{ color: 'red', marginLeft: '4%' }}>*</span></span>
        <input
          id="fname"
          type="text"
          name="question1.1"
          className="question"
          onChange={handleChange}
          value={questions["question1.1"]}
        />
        <br />
        <br />
        <span className="labelCls">1.2. Please describe current tillage practices applied:</span>
          <DynamicTableInput data={TILLAGEDATA} questionNo={"question1"} {...props} />
        <br />
        <br />
        <span className="labelCls">1.3. Please describe current planting approach and techniques (e.g. manual planting, seedlings from nursery, direct seeding):</span>
        <input
          id="fname"
          type="text"
          name="question1.3"
          className="question"
          onChange={handleChange}
          value={questions["question1.3"]}
        />
        <br />
        <br />
        <span className="labelCls">1.4. Please describe if cover crops are planted between tomatoes rows or after harvesting on the field (during winter):</span>
        <input
          id="fname"
          type="text"
          name="question1.4"
          className="question"
          onChange={handleChange}
          value={questions["question1.4"]}
        />
        <br />
        <br />
        <span className="labelCls">1.5. Please describe if crop rotation is being applied on the field:</span>
        <input
          id="fname"
          type="text"
          name="question1.5"
          className="question"
          onChange={handleChange}
          value={questions["question1.5"]}
        />
        <br />
        <br />
        <span className="labelCls">1.6. Is fertilizer (synthetic or organic, N, P, K), manure and other inputs (e.g. green manure, mulch, compost, gypsum, liming) used on the fields? Please indicate type and amount applied per ha and year, as well as timing of application (if varying between years, please indicate range and average):</span>
          <DynamicTableInput data={FERTILIZERDATA} questionNo={"question1"} {...props} />
        <br />
        <br />
        <span className="labelCls">1.7. Please describe current weed and pest control (type and amount applied):</span>
        <DynamicTableInput data={CURRENTWEED_PESTCONTROL}  questionNo={"question1"} {...props} />
        <br />
        <br />
        <span className="labelCls">1.8. Is integrated pest management (combination of improved genetics, chemical protection, and biological solutions such as predatory insects to protect the tomatoes) applied? Please describe:</span>
        <input
          id="fname"
          type="text"
          name="question1.8"
          className="question"
          onChange={handleChange}
          value={questions["question1.8"]}
        />
        <br />
        <br />
        <span className="labelCls">1.9. Please describe current harvesting techniques (including machinery used):</span>
        <input
          id="fname"
          type="text"
          name="question1.9"
          className="question"
          onChange={handleChange}
          value={questions["question1.9"]}
        />
        <br />
        <br />
        <span className="labelCls">1.10. Please indicate current yield per year for main crop (tomatoes). If there is significant variation between years, please indicate lower and upper levels as well as average yield:</span>
        <input
          id="fname"
          type="text"
          name="question1.10"
          className="question"
          onChange={handleChange}
          value={questions["question1.10"]}
        />
        <br />
        <br />
        <span className="labelCls">1.11. Please provide current soil organic carbon levels for the fields (if available):</span>
        <input
          id="fname"
          type="text"
          name="question1.11"
          className="question"
          onChange={handleChange}
          value={questions["question1.11"]}
        /> 
        <br />
        <br />
        </div>}
        {
        <div>
        <span className="sectionName">
        2. Water Usage
      </span>
      <br />
      <br />
      <span className="labelCls">2.1. Please describe current irrigation practices.</span>
      <DynamicTableInput data={IRRIGATION_TYPE} questionNo={"question2"} {...props} />
      <br />
      <br />
      </div>}
      {
      <div>
         <span className="sectionName">
        3. Energy and Fuel Usage
      </span>
      <br />
      <br />
      <span className="labelCls">3.1. Please describe current energy and fuel usage from machinery and pump irrigation.</span>
      <DynamicTableInput data={ENERGY_FUEL_DATA} questionNo={"question3"} {...props}  />
      <br />
      <br />
      </div>}
      {<div>
        <span className="sectionName">
        4. Project area description
      </span>
      <br />
      <br />
      <span className="labelCls">4.1. Where is the location of the current project region (i.e. area encompassing project fields, not including settlements, forests)? Please provide a digital map with area boundary coordinates as georeferenced GIS data (ESRI shape files in WGS84 coordinate system). If GIS capacity is not available, please provide a Google Earth kml/kmz files of the respective area clearly delineating the boundary.</span>
      <DynamicTableInput data={AREA_DESCRIPTION} {...props}/>
      <br />
      <br />
      <span className="labelCls">4.2. What is the total area of the project area in ha (hectares)? This should include all fields that are considering changing cultivation method / practices with the goal of of GHG reduction.</span>
      <input
        id="fname"
        type="text"
        name="question4.2"
        className="question"
        onChange={handleChange}
        value={questions["question4.2"]}
      />
      <br />
      <br />
      <span className="labelCls">4.3. If the land is not owned by the farmer growing the main crop (tomatoes), is a lease of the land in place? If yes, when does the lease end?</span>
      <input
        id="fname"
        type="text"
        name="question4.3"
        className="question"
        onChange={handleChange}
        value={questions["question4.3"]}
      />
      <br />
      <br />
      <span className="labelCls">4.4. When did the current land holder (farmer) purchase or lease the land?</span>
      <input
        id="fname"
        type="text"
        name="question4.4"
        className="question"
        onChange={handleChange}
       value={questions["question4.4"]}
      />
      <br />
      <br />
      <span className="labelCls">4.5. Are there water bodies or rivers adjoining the project area? Please describe:</span>
      <input
        id="fname"
        type="text"
        name="question4.5"
        className="question"
        onChange={handleChange}
        value={questions["question4.5"]}
      />
      <br />
      <br />
      <span className="labelCls">4.6. Is the project area currently degraded (soil erosion, loss of vegetation cover, loss of productivity, classified as degraded land, etc.)? Please describe:</span>
      <input
        id="fname"
        type="text"
        name="question4.6"
        className="question"
        onChange={handleChange}
        value={questions["question4.6"]}
      />
      <br />
      <br />
      <span className="labelCls">4.7. Does the project area include non-accessible or non-useable land (e.g. too steep, too remote)? If yes, please indicate area size.</span>
      <input
        id="fname"
        type="text"
        name="question4.7"
        className="question"
        onChange={handleChange}
        value={questions["question4.7"]}
      />
      <br />
      <br />
      </div>}
      </div>
    </div>
  );
}