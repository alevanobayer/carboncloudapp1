import React, { useState } from 'react';
import {
  Textfield,
  Button,
} from "@element/react-components";


export default function EnergyFuelData(props) {
  const [energyFuelDetailsArray, setEnergyFuelDetailsArray] = useState(JSON.parse(JSON.stringify(props.questionArray)));

  let addEnergyFuelDetails = () => {
    const MaxNo =
      Math.max(...energyFuelDetailsArray.map((element) => element.recNo)) + 1;
    const energyValue = [
      ...energyFuelDetailsArray,
      { recNo: MaxNo, "3.1.1": "", "3.1.2": "", "3.1.3": "" },
    ];
    const energyDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[12];
    energyDefault["subQuestionsAndSubAnswers"] = energyValue;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setEnergyFuelDetailsArray(energyValue);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });

  }

  let removeEnergyFuelDetails = (i) => {
    let newEnergyFuelDetailsArray = [...energyFuelDetailsArray];
    newEnergyFuelDetailsArray.splice(i, 1);
    const energyDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[12];
    energyDefault["subQuestionsAndSubAnswers"] = newEnergyFuelDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setEnergyFuelDetailsArray(newEnergyFuelDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });

  }

  let handleTextChange = (i, e, name) => {
    let newEnergyFuelDetailsArray = [...energyFuelDetailsArray];
    newEnergyFuelDetailsArray[i][name] = e.target.value;
    const energyDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[12];
    energyDefault["subQuestionsAndSubAnswers"] = newEnergyFuelDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setEnergyFuelDetailsArray(newEnergyFuelDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "3%" }}>

        {energyFuelDetailsArray?.map((element, index) => (
          <div className="row mb-3" key={index}>
            <div className="form-group col-md-4">
              <Textfield
                id={`activityType_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Activity (irrigation)"
                variant="filled"
                name="3.1.1"
                onChange={(e) => handleTextChange(index, e, "3.1.1")}
                value={element["3.1.1"]}
              />
            </div>
            <div className="form-group col-md-4">
              <Textfield
                id={`electricityUsed_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Electricity used"
                variant="filled"
                name="3.1.2"
                onChange={(e) => handleTextChange(index, e, "3.1.2")}
                value={element["3.1.2"]}
              />
            </div>
            <div className="form-group col-md-4">
              <Textfield
                id={`fossilFuelUsed_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Fossil fuel used"
                variant="filled"
                name="3.1.3"
                onChange={(e) => handleTextChange(index, e, "3.1.3")}
                value={element["3.1.3"]}
              />
            </div>
            {energyFuelDetailsArray.length > 1 ?
              <div className="form-group col-md-3">
                <Button
                  disabled={props.isDisabled}
                  variant="outlined" color="error" onClick={() => removeEnergyFuelDetails(index)}>Remove</Button>
              </div> : null
            }
          </div>
        ))}
        <div className="form-group col-md-3">
          <Button
            disabled={props.isDisabled}
            variant="filled" onClick={() => addEnergyFuelDetails()}>Add Another Row</Button>
        </div>


      </div>
    </>
  );
}