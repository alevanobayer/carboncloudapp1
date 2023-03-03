import React, { useState, useCallback } from "react";
import {
  Drawer,
  DrawerContent,
  IconButton,
  Menu,
  TypoBody,
  Typography,
  ActionItem,
  List,
  ListItem,
  TopAppBar,
  Divider,
  Elevation,
  Icon,
} from "@element/react-components";
import logoUrl from "../../assets/corp.png";
import { useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";


const Header = (props) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleOnClick = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const [selected, setSelected] = useState();
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "redirect") {
      localStorage.clear(),
        instance.logoutRedirect({
          postLogoutRedirectUri: "/",
        });
    }
  };
  const handleAction = useCallback((activated, selectedIds) => {
    setSelected(selectedIds);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Drawer variant="dismissible" open={open} belowTopAppBar style={{ height: "100%" }}>
        <DrawerContent>
          <List selected={selected} onAction={handleAction}>
            <ListItem>
              <Typography type="display6">Project Administration</Typography>
            </ListItem>
            <ListItem
              onClick={() => {
                history.location.pathname==="/projectCreation"?window.location.reload():    history.push("/projectCreation");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody categoryIdKey="1" level={1}>
                Project Creation
              </TypoBody>
            </ListItem>
            <ListItem
              onClick={() => {
                history.location.pathname==="/projectTracking"?window.location.reload():    history.push("/projectTracking");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody categoryIdKey="2" level={1}>
                Project Tracking
              </TypoBody>
            </ListItem>{" "}
            <ListItem
              onClick={() => {
                history.location.pathname==="/farmerConfiguration"?window.location.reload():    history.push("/farmerConfiguration");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>Farmer Configuration</TypoBody>
            </ListItem>{" "}
            <ListItem
              onClick={() => {
              history.location.pathname==="/farmerDetails"?window.location.reload():  history.push("/farmerDetails");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>Farmer Details</TypoBody>
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                history.location.pathname==="/feasibilityStudyStepper"?window.location.reload():       history.push("/feasibilityStudyStepper");
                handleOnClick();
              }}>
              <Typography type="display6">Feasibility Study</Typography>
            </ListItem>
            <ListItem
              onClick={() => {
                history.location.pathname==="/feasibilityStudyStepper"?window.location.reload():       history.push("/feasibilityStudyStepper");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>New Study</TypoBody>
            </ListItem>
            <ListItem
              onClick={() => {
                history.location.pathname==="/feasibilityStudyDraftData"?window.location.reload():      history.push("/feasibilityStudyDraftData");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>Project List</TypoBody>
            </ListItem>{" "}
            <ListItem
              onClick={() => {
                history.location.pathname==="/exportFeasibilityStudy"?window.location.reload():      history.push("/exportFeasibilityStudy");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>Export Data</TypoBody>
            </ListItem>{" "}
            <ListItem
              onClick={() => {
                history.location.pathname==="/feasibilityPDFExtraction"?window.location.reload():       history.push("/feasibilityPDFExtraction");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>PDF Extraction</TypoBody>
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                history.location.pathname==="/emissionStepper"?window.location.reload():     history.push("/emissionStepper");
                handleOnClick();
              }}
              style={{ marginTop: "5%" }}>
              <Typography type="display6">
                Emmission & SOC Quantification
              </Typography>
            </ListItem>
            <ListItem
              onClick={() => {
                history.location.pathname==="/emissionStepper"?window.location.reload():       history.push("/emissionStepper");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>New Study</TypoBody>
            </ListItem>
            <ListItem
              onClick={() => {
                history.location.pathname==="/DraftEmission"?window.location.reload():     history.push("/DraftEmission");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>Project List</TypoBody>
            </ListItem>{" "}
            <ListItem
              onClick={() => {
                history.location.pathname==="/exportSOCData"?window.location.reload():      history.push("/exportSOCData");
                handleOnClick();
              }}
            >
              {" "}
              <TypoBody level={1}>Export E&SOC Data</TypoBody>
            </ListItem>{" "}

            <Divider />
            <br />
            <ListItem
              onClick={() => {
                history.location.pathname==="/Tableu"?window.location.reload():     history.push("/EmissionTableau");
                handleOnClick();
              }}
              style={{ marginTop: "5%" }}>
              <Typography type="display6">
              Baseline Tableau Dasboard
              </Typography>
            </ListItem>
            <Divider />
            <br />
            <ListItem
              onClick={() => {
                history.location.pathname==="/Tableu"?window.location.reload():     history.push("/FeasibilityTableau");
                handleOnClick();
              }}
              style={{ marginTop: "5%" }}>
              <Typography type="display6">
              Feasibility Tableau Dasboard
              </Typography>
            </ListItem>
            <ListItem

            />
          </List>
        </DrawerContent>
      </Drawer>
        <TopAppBar
        elevated
          logo={
            <img
              src={logoUrl}
              alt="logo"
              style={{ height: "100%", width: "100%" }}
            />
          }
          logoSize={"small"}
          style={{ height: "70px" }}
          navigation={<IconButton ariaLabel="menu" icon="menu" />}
          actions={
            <>
              <ActionItem icon="home" label="home" onClick={() => history.push("/home")} />
              {/* <ActionItem icon="notifications" label="Check Notifications" /> */}
              <Menu
                // {...props}
                anchorEl={anchorEl}
                open={isMenuOpen}
                trigger={
                  <IconButton onClick={handleProfileMenuOpen}>
                    <Icon icon="account_circle" />
                  </IconButton>
                }
                onClose={handleMenuClose}
              >
                {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
                <ListItem onClick={handleMenuClose}>My account</ListItem>
                <ListItem onClick={() => handleLogout("redirect")}>
                  LogOut
                </ListItem>
              </Menu>
            </>
          }
          onNavigation={handleOnClick}
          title="Carbon Cloud"
        >
        </TopAppBar>

      {/* <Elevation elevation="2">
        <div
          style={{ zIndex:"1",backgroundColor: "#F5F5F5", marginTop: "70px", height: "50px",position:"fixed",border:"1px solid #F5F5F5", width:"100%", }}
        >
          <TypoBody
            level={1}
            style={{
              fontSize:"14px",
              width: "100%",
              height: "30px",
              position: "relative",
              top: "32%",
              marginLeft: "2%",
            }}
          >
            {getPath()}
          </TypoBody>
        </div>
      </Elevation> */}
    </>
  );
};
export default Header;
