import React, { useState } from "react";
import {
  Textfield,
  Button,
} from "@element/react-components";

export default function FertilizerType(props) {
  const [fertilizerDetailsArray, setFertilizerDetailsArray] = useState(
    JSON.parse(JSON.stringify(props.questionArray))
  );

  let addFertilizerDetails = () => {
    const MaxNo =
      Math.max(...fertilizerDetailsArray.map((element) => element.recNo)) + 1;
    const fertilizerValue = [
      ...fertilizerDetailsArray,
      { recNo: MaxNo, "1.6.1": "", "1.6.2": "", "1.6.3": "", "1.6.4": "" },
    ];
    const fertilizerDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[5];
    fertilizerDefault["subQuestionsAndSubAnswers"] = fertilizerValue;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setFertilizerDetailsArray(fertilizerValue);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  };

  let removeFertilizerDetails = (i) => {
    let newFertilizerDetailsArray = [...fertilizerDetailsArray];
    newFertilizerDetailsArray.splice(i, 1);
    const fertilizerDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[5];
    fertilizerDefault["subQuestionsAndSubAnswers"] = newFertilizerDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setFertilizerDetailsArray(newFertilizerDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  };

  let handleTextChange = (i, e, name) => {
    let newFertilizerDetailsArray = [...fertilizerDetailsArray];
    newFertilizerDetailsArray[i][name] = e.target.value;
    const fertilizerDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[5];
    fertilizerDefault["subQuestionsAndSubAnswers"] = newFertilizerDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setFertilizerDetailsArray(newFertilizerDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  };

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "3%" }}>

        {fertilizerDetailsArray?.map((element, index) => (
          <div className="row mb-3" key={index}>
            <div className="form-group col-md-3">
              <Textfield
                id={`fertilizerInput_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Fertilizer / input type"
                variant="filled"
                name="1.6.1"
                onChange={(e) => handleTextChange(index, e, "1.6.1")}
                value={element["1.6.1"]}
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
                name="1.6.2"
                onChange={(e) => handleTextChange(index, e, "1.6.2")}
                value={element["1.6.2"]}
              />
            </div>
            <div className="form-group col-md-3">
              <Textfield
                id={`applicationTiming_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Application timing (frequency)"
                variant="filled"
                name="1.6.3"
                onChange={(e) => handleTextChange(index, e, "1.6.3")}
                value={element["1.6.3"]}
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
                name="1.6.4"
                onChange={(e) => handleTextChange(index, e, "1.6.4")}
                value={element["1.6.4"]}
              />
            </div>
            {fertilizerDetailsArray.length > 1 ? (
              <div className="form-group col-md-1">
                <Button
                  disabled={props.isDisabled}
                  variant="outlined"
                  color="error"
                  onClick={() => removeFertilizerDetails(index)}
                >
                  Remove
                </Button>
              </div>
            ) : null}
          </div>
        ))}
        <div className="form-group col-md-3">
          <Button
            disabled={props.isDisabled}
            variant="filled"
            onClick={() => addFertilizerDetails()}
          >
            Add Another Row
          </Button>
        </div>
      </div>
    </>
  );
}
