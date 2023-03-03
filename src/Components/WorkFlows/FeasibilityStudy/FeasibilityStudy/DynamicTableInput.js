import React, {useState} from 'react';
import { Button } from '@mui/material';



export default function DynamicTableInput(props) {

  const QUESTION_1_NAMES = ["question1.1", "question1.2", "question1.3", "question1.4", "question1.5", "question1.6", "question1.7", "question1.8", "question1.9", "question1.10", "question1.11"];
  const QUESTION_2_NAMES = ["question2.1"];
  const QUESTION_3_NAMES = ["question3.1",];
  const QUESTION_4_NAMES = ["question4.1", "question4.2", "question4.3", "question4.4", "question4.5", "question4.6", "question4.7"];
  const {dummyObject, columns, labelNames, questionSeries,fieldNames,} = props?.data;

  const setQuestionsData = props.setQuestionsData;

  const [questions, setQuestions] = useState(props.questions)
  const [arrayData, setArrayData] = useState(JSON.parse(JSON.stringify(props.questionArray)));

  let addRowData = () => {
    setArrayData([...arrayData, JSON.parse(JSON.stringify(props.questionArray))])
  }

  let removeRowData = (i, questionSeries) => {
      let newarrayData = [...arrayData];
      newarrayData.splice(i, 1);
      //setArrayData(newarrayData);
      const questionSeriesName = questionSeries;
      //const data = {...props?.defaultFeasibilityStudyState?.feasibilityStudyData,[questionSeries]: newarrayData};
  
      if (QUESTION_1_NAMES.includes(questionSeriesName)) {
        let data = [];
        if (questionSeriesName === "question1.2") {
           data = {...questions.question1, "question1.2": newarrayData};
        } else if (questionSeriesName === "question1.6") {
           data = {...questions.question1, "question1.6": newarrayData};
        } else if (questionSeriesName === "question1.7") {
           data = {...questions.question1, "question1.7": newarrayData};
        }
        const finalData = {...questions};
        finalData.question1 = {...data};
        setQuestionsData({...finalData});
        setArrayData(newarrayData);
        props.updateFeasibilityStudyDetailsHandler(finalData); 
      } else  if (QUESTION_2_NAMES.includes(questionSeriesName)) {
        const data = {...questions.question2, "question2.1": newarrayData};
        const finalData = {...questions};
        finalData.question2 = {...data};
        setQuestionsData({...finalData});
        setArrayData(newarrayData);
        props.updateFeasibilityStudyDetailsHandler(finalData); 
      } else  if (QUESTION_3_NAMES.includes(questionSeriesName)) {
        const data = {...questions.question3, 'question3.1': newarrayData};
        const finalData = {...questions};
        finalData.question3 = {...data};
        setQuestionsData({...finalData});
        setArrayData(newarrayData);
        props.updateFeasibilityStudyDetailsHandler(finalData); 
      } else if (QUESTION_4_NAMES.includes(questionSeriesName)) {
        const data = {...questions.question4, 'question4.1': newarrayData};
        const finalData = {...questions};
        finalData.question4 = {...data};
        setQuestionsData({...finalData});
        setArrayData(newarrayData);
        props.updateFeasibilityStudyDetailsHandler(finalData); 
      } 
  }

  let handleTextChange = (i, e, questionSeries) => {
    let newarrayData = [...arrayData];
    newarrayData[i][e.target.name] = e.target.value;
    setArrayData(newarrayData);
    const questionSeriesName = questionSeries;
    //const data = {...props?.defaultFeasibilityStudyState?.feasibilityStudyData,[questionSeries]: newarrayData};

    if (QUESTION_1_NAMES.includes(questionSeriesName)) {
      let data = [];
      if (questionSeriesName === "question1.2") {
         data = {...questions.question1, "question1.2": newarrayData};
      } else if (questionSeriesName === "question1.6") {
         data = {...questions.question1, "question1.6": newarrayData};
      } else if (questionSeriesName === "question1.7") {
         data = {...questions.question1, "question1.7": newarrayData};
      }
      const finalData = {...questions};
      finalData.question1 = {...data};
      setQuestionsData({...finalData});
      setArrayData(newarrayData);
      props.updateFeasibilityStudyDetailsHandler(finalData); 
    } else  if (QUESTION_2_NAMES.includes(questionSeriesName)) {
      const data = {...questions.question2, "question2.1": newarrayData};
      const finalData = {...questions};
      finalData.question2 = {...data};
      setQuestionsData({...finalData});
      setArrayData(newarrayData);
      props.updateFeasibilityStudyDetailsHandler(finalData); 
    } else  if (QUESTION_3_NAMES.includes(questionSeriesName)) {
      const data = {...questions.question3, 'question3.1': newarrayData};
      const finalData = {...questions};
      finalData.question3 = {...data};
      setQuestionsData({...finalData});
      setArrayData(newarrayData);
      props.updateFeasibilityStudyDetailsHandler(finalData); 
    } else if (QUESTION_4_NAMES.includes(questionSeriesName)) {
      const data = {...questions.question4, 'question4.1': newarrayData};
      const finalData = {...questions};
      finalData.question4 = {...data};
      setQuestionsData({...finalData});
      setArrayData(newarrayData);
      props.updateFeasibilityStudyDetailsHandler(finalData); 
    } 
  }

  // let handleTextChange = (i, e) => {
  //   let newarrayData = [...arrayData];
  //   newarrayData[i][e.target.name] = e.target.value;
  //   setArrayData(newarrayData);
  //   const data = {...props?.defaultFeasibilityStudyState?.feasibilityStudyData,[questionSeries]: newarrayData};

  //   props.updateFeasibilityStudyDetailsHandler(data); 
  // }
  

  let getElementValue = (element, fieldName) => {
    return element[fieldName] || ""
  }

  return (
      <>
      <div className='mt-2' style={{marginLeft: "40px"}}>
        <div className="row">
          <div className="form-group col-md-3">
            <label className="dynamicLabelCls" for={fieldNames[0]}>{labelNames.LABEL_1}</label>
          </div>
          <div className="form-group col-md-3">
            <label className="dynamicLabelCls" for={fieldNames[1]}>{labelNames.LABEL_2}</label>
          </div>
          <div className="form-group col-md-3">
            <label className="dynamicLabelCls" for={fieldNames[2]}>{labelNames.LABEL_3}</label>
          </div>
          {columns === 4 && 
            <div className="form-group col-md-3">
              <label className="dynamicLabelCls" for={fieldNames[3]}>{labelNames.LABEL_4}</label>
            </div>
          }
          <div className="form-group col-md-3">
            <label for=""></label>
          </div>
        </div>
        {arrayData?.map((element, index) => (
             <div className="row mb-3" key={index}>
                <div className="form-group col-md-3">
                  <input
                      id={fieldNames[0]+`_`+index}
                      type="text"
                      name={fieldNames[0]}
                      className="form-control"
                      onChange={e => handleTextChange(index, e, questionSeries)}
                      value={getElementValue(element, fieldNames[0])}
                    />
                </div>
                <div className="form-group col-md-3">
                  <input
                      id={fieldNames[1]+`_`+index}
                      type="text"
                      name={fieldNames[1]}
                      onChange={e => handleTextChange(index, e, questionSeries)}
                      className="form-control"
                      value={getElementValue(element, fieldNames[1])}
                    />
                </div>
                <div className="form-group col-md-3">
                  <input
                      id={fieldNames[2]+`_`+index}
                      type="text"
                      name={fieldNames[2]}
                      onChange={e => handleTextChange(index, e, questionSeries)}
                      className="form-control"
                      value={getElementValue(element, fieldNames[2])}
                    />
                </div>
                {columns === 4 &&
                  <div className="form-group col-md-2">
                    <input
                        id={fieldNames[3]+`_`+index}
                        type="text"
                        name={fieldNames[3]}
                        onChange={e => handleTextChange(index, e, questionSeries)}
                        className="form-control"
                        value={getElementValue(element, fieldNames[3])}
                      />
                  </div>
                }
                {index ? 
                    <div className="form-group col-md-1">
                      <Button variant="outlined" color="error" onClick={() => removeRowData(index, questionSeries)}>Remove</Button>
                    </div> : null
                }                
            </div>
          ))}
        <div className="form-group col-md-3">
          <Button variant="contained" onClick={() => addRowData()}>Add</Button>
        </div>
        
        
      </div>
      </>
  );
}