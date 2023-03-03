import React, {useState} from 'react';
import { Button } from '@mui/material';



export default function DynamicTableInput(props) {
  const {dummyObject, columns, labelNames, questionSeries,fieldNames,} = props?.data;

  const [arrayData, setArrayData] = useState([JSON.parse(JSON.stringify(dummyObject))]);

  let addRowData = () => {
    setArrayData([...arrayData, JSON.parse(JSON.stringify(dummyObject))])
  }

  let removeRowData = (i) => {
      let newarrayData = [...arrayData];
      newarrayData.splice(i, 1);
      setArrayData(newarrayData)
  }

  let handleTextChange = (i, e) => {
    let newarrayData = [...arrayData];
    newarrayData[i][e.target.name] = e.target.value;
    setArrayData(newarrayData);
    const data = {...props?.defaultFeasibilityStudyState?.feasibilityStudyData,[questionSeries]: newarrayData};

    props.updateFeasibilityStudyDetailsHandler(data); 
  }
  

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
                      <Button variant="outlined" color="error" onClick={() => removeRowData(index)}>Remove</Button>
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