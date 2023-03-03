// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import FarmerConsentData1 from './FarmerConsentData1';
// import FarmerConsentData2 from './FarmerConsentData2';
// import EnrollmentEligibility from './EnrollmentEligibility';
// import FarmerSignature from './FarmerSignature';
// import BaselineProcess from './BaselineProcess';
// import FeasibilityStudy from './FeasibilityStudy/FeasibilityStudy';

// const steps = ['Farmer Consent', 'Feasibility Study', 'Farmer Consent', 'Enrollment & Eligibility', 'Farmer Signature', 'Baseline Process'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <FarmerConsentData1 />;
//     case 1:
//       return <FeasibilityStudy />;
//     case 2:
//       return <FarmerConsentData2 />;
//     case 3:
//         return <EnrollmentEligibility />;
//     case 4:
//         return <FarmerSignature />;
//     case 5:
//         return <BaselineProcess />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

// const theme = createTheme();

// export default function CarbonCloudStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
//         <Paper variant="outlined" sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}>
//           <Typography component="h1" variant="h4" align="center">
//             Work Flow
//           </Typography>
//           <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <>
//             {activeStep === steps.length ? (
//               <>
//                 <Typography variant="h5" gutterBottom>
//                   Thank you.
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   Farmer Data is inserted successfully.
//                 </Typography>
//               </>
//             ) : (
//               <>
//                 {getStepContent(activeStep)}
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                   {activeStep !== 0 && (
//                     <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
//                       Back
//                     </Button>
//                   )}

//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 3, ml: 1 }}
//                   >
//                     {activeStep === steps.length - 1 ? 'Complete the process' : 'Next'}
//                   </Button>
//                 </Box>
//               </>
//             )}
//           </>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// }