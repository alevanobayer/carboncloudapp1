import React, { useState } from "react";
import {
  Textfield,
  Button,
} from "@element/react-components";
export default function TillagePractises(props) {
  const [tillageDetailsArray, setTillageDetailsArray] = useState(
    JSON.parse(JSON.stringify(props.questionArray))
  );

  let addTillageDetails = () => {
    const MaxNo =
      Math.max(...tillageDetailsArray.map((element) => element.recNo)) + 1;
    const tillageValue = [
      ...tillageDetailsArray,
      { recNo: MaxNo, "1.2.1": "", "1.2.2": "", "1.2.3": "" },
    ];
    const tillageDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[1];
    tillageDefault["subQuestionsAndSubAnswers"] = tillageValue;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setTillageDetailsArray(tillageValue);
    props.updateFeasibilityStudyDetailsHandler({
      questionsAndAnswers:
        props.questions.feasibilityStudyData.questionsAndAnswers,
    });
  };

  let removeTillageDetails = (i) => {
    let newTillageDetailsArray = [...tillageDetailsArray];
    newTillageDetailsArray.splice(i, 1);

    const tillageDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[1];
    tillageDefault["subQuestionsAndSubAnswers"] = newTillageDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setTillageDetailsArray(newTillageDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({
      questionsAndAnswers:
        props.questions.feasibilityStudyData.questionsAndAnswers,
    });
  };

  let handleTextChange = (i, e, name) => {
    let newTillageDetailsArray = [...tillageDetailsArray];
    newTillageDetailsArray[i][name] = e.target.value;

    const tillageDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[1];
    tillageDefault["subQuestionsAndSubAnswers"] = newTillageDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setTillageDetailsArray(newTillageDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({
      questionsAndAnswers:
        props.questions.feasibilityStudyData.questionsAndAnswers,
    });
  };

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "3%" }}>

        {tillageDetailsArray?.map((element, index) => (
          <div className="row mb-3" key={index}>
            <div className="form-group col-md-4">
              <Textfield
                id={`tillageType_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Tillage type (conventional)"
                variant="filled"
                name="1.2.1"
                onChange={(e) => handleTextChange(index, e, "1.2.1")}
                value={element["1.2.1"]}
              />
            </div>
            <div className="form-group col-md-4">
              <Textfield
                id={`tillageTiming_` + index}
                type="text"
                label="Tillage timing (frequency)"
                disabled={props.isDisabled}
                fullWidth
                variant="filled"
                name="1.2.2"
                onChange={(e) => handleTextChange(index, e, "1.2.2")}
                value={element["1.2.2"]}
              />

            </div>
            <div className="form-group col-md-4">
              <Textfield
                id={`machineryName_` + index}
                type="text"
                fullWidth
                label="Machinery used (chisel)"
                disabled={props.isDisabled}
                variant="filled"
                name="1.2.3"
                onChange={(e) => handleTextChange(index, e, "1.2.3")}
                value={element["1.2.3"]}
              />
            </div>
            {tillageDetailsArray.length > 1 ? (
              <div className="form-group col-md-3">
                <Button
                  disabled={props.isDisabled}
                  variant="outlined"
                  color="error"
                  onClick={() => removeTillageDetails(index)}
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
            onClick={() => addTillageDetails()}
          >
            Add Another Row
          </Button>
        </div>
      </div>
    </>
  );
}
