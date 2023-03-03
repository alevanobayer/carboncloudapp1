// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import { Accordion } from 'react-bootstrap';

// export default function EnrollmentEligibility() {
//   return (
//     <>
//       <Typography variant="h6" gutterBottom>
//         Enrollment & Eligibility
//       </Typography>
//       <Accordion className='mb-4'>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>FARMER INFORMATION</Accordion.Header>
//           <Accordion.Body>
//           <div>
//             <div className="form-group row">
//               <label for="inputEmail3" className="col-sm-2 col-form-label">Info 1:</label>
//               <div className="col-sm-5">
//                 <input type="email" className="form-control" id="inputEmail3"  />
//               </div>
//             </div>
//             <br />
//             <div className="form-group row">
//               <label for="inputPassword3" className="col-sm-2 col-form-label">Info 2:</label>
//               <div className="col-sm-5">
//                 <input type="password" className="form-control" id="inputPassword3"  />
//               </div>
//             </div>
//             <br />
//             <div className="form-group row">
//               <label for="inputEmail3" className="col-sm-2 col-form-label">Info 3:</label>
//               <div className="col-sm-5">
//                 <input type="email" className="form-control" id="inputEmail3"  />
//               </div>
//             </div>
//             <br />
//             <div className="form-group row">
//               <label for="inputPassword3" className="col-sm-2 col-form-label">Info 4:</label>
//               <div className="col-sm-5">
//                 <input type="password" className="form-control" id="inputPassword3"  />
//               </div>
//             </div>
//           </div>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//       <Accordion className='mb-4'>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>FIELD/CROP SELECTION</Accordion.Header>
//           <Accordion.Body>
//               <div>
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-5">
//                       <table className="table table-bordered">
//                         <tbody>
//                           <tr>
//                             <td>
//                               <div className="custom-control custom-checkbox">
//                                 <input type="checkbox" className="custom-control-input" id="customCheck1" checked />
//                               </div>
//                             </td>
//                             <td>FIELD/CROP 1</td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <div className="custom-control custom-checkbox">
//                                 <input type="checkbox" className="custom-control-input" id="customCheck2" />
//                               </div>
//                             </td>
//                             <td>FIELD/CROP 2</td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <div className="custom-control custom-checkbox">
//                                 <input type="checkbox" className="custom-control-input" id="customCheck3" />
//                               </div>
//                             </td>
//                             <td>FIELD/CROP 3</td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <div className="custom-control custom-checkbox">
//                                 <input type="checkbox" className="custom-control-input" id="customCheck3" />
//                               </div>
//                             </td>
//                             <td>FIELD/CROP 4</td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <div className="custom-control custom-checkbox">
//                                 <input type="checkbox" className="custom-control-input" id="customCheck3" />
//                               </div>
//                             </td>
//                             <td>FIELD/CROP 5</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//       <Accordion className='mb-4'>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>ELIGIBILITY FORM</Accordion.Header>
//           <Accordion.Body>
//           <div className="form-group row">
//               <label  className="col-sm-2 col-form-label">Question 1:</label>
//               <div className="col-sm-5">
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
//                   <label className="form-check-label" for="inlineRadio1">Yes</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
//                   <label className="form-check-label" for="inlineRadio2">No</label>
//                 </div>
//               </div>
//           </div>
//           <br />
//           <div className="form-group row">
//               <label  className="col-sm-2 col-form-label">Question 2:</label>
//               <div className="col-sm-5">
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
//                   <label className="form-check-label" for="inlineRadio1">Yes</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
//                   <label className="form-check-label" for="inlineRadio2">No</label>
//                 </div>
//               </div>
//           </div>
//           <br />
//           <div className="form-group row">
//               <label  className="col-sm-2 col-form-label">Question 3:</label>
//               <div className="col-sm-5">
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
//                   <label className="form-check-label" for="inlineRadio1">Yes</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
//                   <label className="form-check-label" for="inlineRadio2">No</label>
//                 </div>
//               </div>
//           </div>
//           <br />
//           <div className="form-group row">
//               <label  className="col-sm-2 col-form-label">Question 4:</label>
//               <div className="col-sm-5">
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
//                   <label className="form-check-label" for="inlineRadio1">Yes</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
//                   <label className="form-check-label" for="inlineRadio2">No</label>
//                 </div>
//               </div>
//           </div>
//           <br />
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//     </>
//   );
// }