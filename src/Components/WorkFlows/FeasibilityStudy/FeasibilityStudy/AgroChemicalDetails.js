import React, { useState } from 'react';
import {
  Textfield,
  Button,
} from "@element/react-components";


export default function AgroChemicalDetails(props) {
  const [agroChemicalDetailsArray, setAgroChemicalDetailsArray] = useState(JSON.parse(JSON.stringify(props.questionArray)));

  let addAgroChemicalDetails = () => {
    const MaxNo =
      Math.max(...agroChemicalDetailsArray.map((element) => element.recNo)) + 1;
    const agroValue = [
      ...fertilizerDetailsArray,
      { recNo: MaxNo, "1.7.1": "", "1.7.2": "", "1.7.3": "", "1.7.4": "" },
    ];
    const agroDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[6];
    agroDefault["subQuestionsAndSubAnswers"] = agroValue;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setAgroChemicalDetailsArray(agroValue);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  let removeAgroChemicalDetails = (i) => {
    let newAgroChemicalDetailsArray = [...agroChemicalDetailsArray];
    newAgroChemicalDetailsArray.splice(i, 1);

    const agroDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[6];
    agroDefault["subQuestionsAndSubAnswers"] = newAgroChemicalDetailsArray;

    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setAgroChemicalDetailsArray(newAgroChemicalDetailsArray);

    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  let handleTextChange = (i, e,name) => {
    let newAgroChemicalDetailsArray = [...agroChemicalDetailsArray];
    newAgroChemicalDetailsArray[i][name] = e.target.value;
    const agroDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[6];
    agroDefault["subQuestionsAndSubAnswers"] = newAgroChemicalDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setAgroChemicalDetailsArray(newAgroChemicalDetailsArray);

    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "3%"  }}>
        {agroChemicalDetailsArray?.map((element, index) => (
          <div className="row mb-3" key={index}>
            <div className="form-group col-md-3">
            <Textfield
                id={`agroChemicalType_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Agrochemical type"
                variant="filled"
                name="1.7.1"
                onChange={(e) => handleTextChange(index, e, "1.7.1")}
                value={element["1.7.1"]}
              />
            </div>
            <div className="form-group col-md-3">
            <Textfield
                id={`amount_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Amount (per ha)"
                variant="filled"
                name="1.7.2"
                onChange={(e) => handleTextChange(index, e, "1.7.2")}
                value={element["1.7.2"]}
              />
              
            </div>
            <div className="form-group col-md-3">
            <Textfield
                id={`applicationTiming_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Application timing"
                variant="filled"
                name="1.7.3"
                onChange={(e) => handleTextChange(index, e, "1.7.3")}
                value={element["1.7.3"]}
              />
              
            </div>
            <div className="form-group col-md-3">
            <Textfield
                id={`machineryUsed_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Machinery used"
                variant="filled"
                name="1.7.4"
                onChange={(e) => handleTextChange(index, e, "1.7.4")}
                value={element["1.7.4"]}
              />
              
            </div>
            {agroChemicalDetailsArray.length > 1 ?
              <div className="form-group col-md-1">
                <Button 
                disabled={props.isDisabled} 
                variant="outlined" color="error" onClick={() => removeAgroChemicalDetails(index)}>Remove</Button>
              </div> : null
            }
          </div>
        ))}
        <div className="form-group col-md-3">
          <Button 
          disabled={props.isDisabled} 
          variant="filled" onClick={() => addAgroChemicalDetails()}>Add Another Row</Button>
        </div>


      </div>
    </>
  );
}