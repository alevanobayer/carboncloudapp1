import React, { useState } from "react";
import './App.css';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/home";
import Footer from "./Components/Footer/footer";
import Header from "./Components/Header/header"
import EmissionStepper from "./Components/WorkFlows/EmissionsStepper/EmissionStepper";
import FeasibilityStudyStepper from "./Components/WorkFlows/FeasibilityStudy/FeasibilityStudyStepper/FeasibilityStudyStepper";
import FeasibilityPDFDataExtraction from "./Components/WorkFlows/FeasibilityStudy/FeasibilityPDFDataExtraction/FeasibilityPDFDataExtraction";
import ExportFeasibilityStudy from "./Components/WorkFlows/FeasibilityStudy/ExportFeasibilityStudy/ExportFeasibilityStudy";
import ExportSOCData from "./Components/WorkFlows/EmissionsStepper/ExportSOCData/ExportSOCData";
import DraftFeasibilityStudy from "./Components/WorkFlows/FeasibilityStudy/DraftFeasibilityStudy";
import DraftEmission from './Components/WorkFlows/EmissionsStepper/DraftEmission';
import ProjectCreation from "./Components/WorkFlows/ProjectAdministration/ProjectCreation";
import ProjectTracking from "./Components/WorkFlows/ProjectAdministration/ProjectTracking";
import FarmerConfiguration from "./Components/WorkFlows/ProjectAdministration/FarmerConfiguration";
import FarmerDetails from "./Components/WorkFlows/ProjectAdministration/FarmerDetails";
import EmissionTableau from "./Components/WorkFlows/EmissionsStepper/EmissionTableu";
import FeasibilityTableau from "./Components/WorkFlows/FeasibilityStudy/FeasibilityTableau";
import { SignOutButton } from "./Components/SignOutButton";
import { SignInButton } from "./Components/SignInButton";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logoUrl from "./assets/bayer.webp";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import Unauthorised from "./Components/WorkFlows/CommonComponents/Unauthorised";
import ExportSOCDataStatus from "./Components/WorkFlows/EmissionsStepper/ExportSOCData/ExportSocStatus";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  let adminValue=accounts[0].idTokenClaims?.groups?.includes("532927d4-a1fd-4d48-bdda-e4d1882c5847");
  let userValue=accounts[0].idTokenClaims?.groups?.includes("ee789ed5-a4c7-4a17-a222-64cb0a459415");
  return (
    <Router>
      
      <div className="App">
       
{adminValue?    <><Header accounts={accounts} /><Switch>
<div className="main">
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route
            exact
            path="/emissionStepper"
            render={(props) => <EmissionStepper accounts={accounts} {...props} />}
          ></Route>
         
         <Route
            exact
            path="/EmissionTableau"
            render={(props) => <EmissionTableau accounts={accounts} {...props} />}
          ></Route>
          
         <Route
            exact
            path="/FeasibilityTableau"
            render={(props) => <FeasibilityTableau accounts={accounts} {...props} />}
          ></Route>
         
          <Route
            exact
            path="/feasibilityStudyStepper"
            render={(props) => <FeasibilityStudyStepper accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/feasibilityPDFExtraction"
            component={FeasibilityPDFDataExtraction}
          ></Route>
          <Route
            exact
            path="/exportFeasibilityStudy"
            component={ExportFeasibilityStudy}
          ></Route>
          <Route exact path="/exportSOCData" render={(props) => <ExportSOCData accounts={accounts} {...props} />}></Route>
          <Route exact path="/exportSOCDataStatus" render={(props) => <ExportSOCDataStatus accounts={accounts} {...props} />}></Route>
          <Route
            exact
            path="/feasibilityStudyDraftData"
            component={DraftFeasibilityStudy}
          ></Route>
          <Route
            exact
            path="/DraftEmission"
            component={DraftEmission}
          ></Route>
        
          <Route
            exact
            path="/projectCreation"
            render={(props) => <ProjectCreation accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/projectTracking"
            render={(props) => <ProjectTracking accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/farmerConfiguration"
            render={(props) => <FarmerConfiguration accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/farmerDetails"
            render={(props) => <FarmerDetails accounts={accounts} {...props} />}
          ></Route>
         </div>  </Switch>
        <Footer /></> : userValue?    <><Header accounts={accounts} /><Switch>
        <div className="main">   <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route
            exact
            path="/emissionStepper"
            render={(props) => <EmissionStepper accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/enrollmentBaselineStepper"
            component={EnrollmentBaselineStepper}
          ></Route>
          <Route
            exact
            path="/feasibilityStudyStepper"
            render={(props) => <FeasibilityStudyStepper accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/feasibilityPDFExtraction"
            component={FeasibilityPDFDataExtraction}
          ></Route>
          {/* <Route
            exact
            path="/exportFeasibilityStudy"
            component={ExportFeasibilityStudy}
          ></Route> */}
          {/* <Route exact path="/exportSOCData" component={ExportSOCData}></Route> */}
          <Route
            exact
            path="/exportBaselineData"
            component={ExportBaselineProcessData}
          ></Route>
          <Route
            exact
            path="/feasibilityStudyDraftData"
            component={DraftFeasibilityStudy}
          ></Route>
          <Route
            exact
            path="/DraftEmission"
            component={DraftEmission}
          ></Route>
          <Route
            exact
            path="/projectCreation"
            render={(props) => <ProjectCreation accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/projectTracking"
            render={(props) => <ProjectTracking accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/farmerConfiguration"
            render={(props) => <FarmerConfiguration accounts={accounts} {...props} />}
          ></Route>
          <Route
            exact
            path="/farmerDetails"
            render={(props) => <FarmerDetails accounts={accounts} {...props} />}
          ></Route>
          </div> </Switch>
        <Footer /></> :        <Switch>
           <Route exact path="/" component={Unauthorised}></Route>
                <Route
            exact
            path="/unauthorised"
            render={(props) => <Unauthorised accounts={accounts} {...props} />}
          ></Route>
          
        </Switch>}

      </div>

    </Router>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <AppBar position="static" className="headerContent">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                component="img"
                sx={{
                  height: 80,
                  width: 80,
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                }}
                src={logoUrl}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                className="titleName"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                }}
              >
                Carbon Cloud
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  display: { xs: "none", md: "flex" },
                }}
              ></Box>

              <Box sx={{ flexGrow: 0 }}>
                {isAuthenticated ? <SignOutButton /> : <SignInButton />}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>


        <div className="border border-light p-3 mb-4">

          <div className="d-flex align-items-center justify-content-center" style={{ height: '350px' }}>
            <h5 className="card-title">
              Please sign-in to access Carbon cloud.
            </h5>
          </div>

        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  return <MainContent />;
}

