import React, {useState} from 'react';
import { Button } from '@mui/material';


export default function TillagePractises() {
  const [tillageDetailsArray, setTillageDetailsArray] = useState([{"tillageType": "", "tillageTiming": "", "machineryName": ""}]);

  let addTillageDetails = () => {
    setTillageDetailsArray([...tillageDetailsArray, {"tillageType": "", "tillageTiming": "", "machineryName": ""}])
  }

  let removeTillageDetails = (i) => {
      let newTillageDetailsArray = [...tillageDetailsArray];
      newTillageDetailsArray.splice(i, 1);
      setTillageDetailsArray(newTillageDetailsArray)
  }

  let handleTextChange = (i, e) => {
    let newTillageDetailsArray = [...tillageDetailsArray];
    newTillageDetailsArray[i][e.target.name] = e.target.value;
    setTillageDetailsArray(newTillageDetailsArray);
  }

  return (
      <>
      <div className='mt-2' style={{marginLeft: "40px"}}>
        <div className="row mb-3">
          <div className="form-group col-md-3">
            <label for="tillageType">Tillage type (e.g. conventional, reduced, no-till)</label>
          </div>
          <div className="form-group col-md-3">
            <label for="tillageTiming">Tillage timing (frequency, seasons)</label>
          </div>
          <div className="form-group col-md-3">
            <label for="machineryName">Machinery used (e.g. mouldboard plough, chisel, disk, drill)</label>
          </div>
          <div className="form-group col-md-3">
            <label for=""></label>
          </div>
        </div>
        {tillageDetailsArray?.map((element, index) => (
             <div className="row mb-3" key={index}>
                <div className="form-group col-md-3">
                  <input
                      id={`tillageType_`+index}
                      type="text"
                      name="tillageType"
                      className="form-control"
                      onChange={e => handleTextChange(index, e)}
                      value={element.tillageType || ""}
                    />
                </div>
                <div className="form-group col-md-3">
                  <input
                      id={`tillageTiming_`+index}
                      type="text"
                      name="tillageTiming"
                      onChange={e => handleTextChange(index, e)}
                      className="form-control"
                      value={element.tillageTiming || ""}
                    />
                </div>
                <div className="form-group col-md-3">
                  <input
                      id={`machineryName_`+index}
                      type="text"
                      name="machineryName"
                      onChange={e => handleTextChange(index, e)}
                      className="form-control"
                      value={element.machineryName || ""}
                    />
                </div>
                {index ? 
                    <div className="form-group col-md-3">
                      <Button variant="outlined" color="error" onClick={() => removeTillageDetails(index)}>Remove</Button>
                    </div> : null
                }                
            </div>
          ))}
        <div className="form-group col-md-3">
          <Button variant="contained" onClick={() => addTillageDetails()}>Add</Button>
        </div>
        
        
      </div>
      </>
  );
}