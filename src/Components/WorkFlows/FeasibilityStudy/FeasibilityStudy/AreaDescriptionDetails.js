import React, { useState } from 'react';
import {
  Textfield,
  Button,
} from "@element/react-components";

export default function AreaDescriptionDetails(props) {
  const [areaDescriptionDetailsArray, setAreaDescriptionDetailsArray] = useState(JSON.parse(JSON.stringify(props.questionArray)));

  let addAreaDescriptionDetails = () => {
    const MaxNo =
      Math.max(...areaDescriptionDetailsArray.map((element) => element.recNo)) + 1;
    const areaValue = [
      ...areaDescriptionDetailsArray,
      { recNo: MaxNo, "4.1.1": "", "4.1.2": "", "4.1.3": "" },
    ];
    const areaDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[13];
    areaDefault["subQuestionsAndSubAnswers"] = areaValue;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setAreaDescriptionDetailsArray(areaValue);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });

  }

  let removeAreaDescriptionDetails = (i) => {
    let newAreaDescriptionDetailsArray = [...areaDescriptionDetailsArray];
    newAreaDescriptionDetailsArray.splice(i, 1);
    const areaDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[13];
    areaDefault["subQuestionsAndSubAnswers"] = newAreaDescriptionDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setAreaDescriptionDetailsArray(newAreaDescriptionDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });

  }

  let handleTextChange = (i, e, name) => {
    let newAreaDescriptionDetailsArray = [...areaDescriptionDetailsArray];
    newAreaDescriptionDetailsArray[i][name] = e.target.value;
    const areaDefault =
      props.questions.feasibilityStudyData.questionsAndAnswers[13];
    areaDefault["subQuestionsAndSubAnswers"] = newAreaDescriptionDetailsArray;
    const data = {
      ...props.questions.feasibilityStudyData.questionsAndAnswers,
    };
    setAreaDescriptionDetailsArray(newAreaDescriptionDetailsArray);
    props.updateFeasibilityStudyDetailsHandler({ questionsAndAnswers: props.questions.feasibilityStudyData.questionsAndAnswers });
  }

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "3%" }}>

        {areaDescriptionDetailsArray?.map((element, index) => (
          <div className="row mb-3" key={index}>
            <div className="form-group col-md-4">
              <Textfield
                id={`region_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Region"
                variant="filled"
                name="4.1.1"
                onChange={(e) => handleTextChange(index, e, "4.1.1")}
                value={element["4.1.1"]}
              />
            </div>
            <div className="form-group col-md-3">
              <Textfield
                id={`area_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="Area (ha)"
                variant="filled"
                name="4.1.2"
                onChange={(e) => handleTextChange(index, e, "4.1.2")}
                value={element["4.1.2"]}
              />
            </div>
            <div className="form-group col-md-3">
              <Textfield
                id={`fileReference_` + index}
                type="text"
                fullWidth
                disabled={props.isDisabled}
                label="File reference"
                variant="filled"
                name="4.1.3"
                onChange={(e) => handleTextChange(index, e, "4.1.3")}
                value={element["4.1.3"]}
              />
            </div>
            {areaDescriptionDetailsArray.length > 1 ?
              <div className="form-group col-md-3">
                <Button
                  disabled={props.isDisabled}
                  variant="outlined" color="error" onClick={() => removeAreaDescriptionDetails(index)}>Remove</Button>
              </div> : null
            }
          </div>
        ))}
        <div className="form-group col-md-3">
          <Button
            disabled={props.isDisabled}
            variant="filled" onClick={() => addAreaDescriptionDetails()}>Add Another Row</Button>
        </div>


      </div>
    </>
  );
}