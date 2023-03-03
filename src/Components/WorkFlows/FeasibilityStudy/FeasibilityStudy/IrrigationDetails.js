import React, { useState } from 'react';
import {
  Textfield,
  Button,
} from "@element/react-components";



export default function IrrigationDetails(props) {
  const [irrigationDetailsArray, setIrrigationDetailsArray] = useState(JSON.parse(JSON.stringify(props.questionArray)));

  let addIrrigationDetails = () => {
    const MaxNo =
      Math.max(...irrigationDetailsArray.map((element) => element.recNo)) + 1;
    const irrigationValue = [
      ...irrigationDetailsArray,
      { recNo: MaxNo, "2.1.1": "", "2.1.2": "", "2.1.3": "", "2.1.4": "" },
    ];
    const irrigationDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[11];
    irrigationDefault["subQuestionsAndSubAnswers"] = irrigationValue;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setIrrigationDetailsArray(irrigationValue);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  let removeIrrigationDetails = (i) => {
    let newIrrigationDetailsArray = [...irrigationDetailsArray];
    newIrrigationDetailsArray.splice(i, 1);
    const irrigationDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[11];
    irrigationDefault["subQuestionsAndSubAnswers"] = newIrrigationDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setIrrigationDetailsArray(newIrrigationDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  let handleTextChange = (i, e, name) => {
    let newIrrigationDetailsArray = [...irrigationDetailsArray];
    newIrrigationDetailsArray[i][name] = e.target.value;
    const irrigationDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[11];
    irrigationDefault["subQuestionsAndSubAnswers"] = newIrrigationDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setIrrigationDetailsArray(newIrrigationDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "3%" }}>
        {irrigationDetailsArray?.map((element, index) => (
          <div className="row mb-3" key={index}>
            <div className="form-group col-md-3">
              <Textfield
                id={`irrigationType_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Irrigation type"
                variant="filled"
                name="2.1.1"
                onChange={(e) => handleTextChange(index, e, "2.1.1")}
                value={element["2.1.1"]}
              />
            </div>
            <div className="form-group col-md-3">
              <Textfield
                id={`waterVolumeUsed_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Water use volume"
                variant="filled"
                name="2.1.2"
                onChange={(e) => handleTextChange(index, e, "2.1.2")}
                value={element["2.1.2"]}
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
                name="2.1.3"
                onChange={(e) => handleTextChange(index, e, "2.1.3")}
                value={element["2.1.3"]}
              />

            </div>
            <div className="form-group col-md-3">
              <Textfield
                id={`powerSourceUsed_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Power source used"
                variant="filled"
                name="2.1.4"
                onChange={(e) => handleTextChange(index, e, "2.1.4")}
                value={element["2.1.4"]}
              />

            </div>
            {irrigationDetailsArray.length > 1 ?
              <div className="form-group col-md-1">
                <Button
                  disabled={props.isDisabled}
                  variant="outlined" color="error" onClick={() => removeIrrigationDetails(index)}>Remove</Button>
              </div> : null
            }
          </div>
        ))}
        <div className="form-group col-md-3">
          <Button
            disabled={props.isDisabled}
            variant="filled" onClick={() => addIrrigationDetails()}>Add Another Row</Button>
        </div>


      </div>
    </>
  );
}