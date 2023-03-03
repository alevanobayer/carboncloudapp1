import { Box } from "@mui/material";
import * as React from "react";
import { TypoDisplay, Typography,TypoLink,Elevation,TypoBody } from "@element/react-components";
import Homepage from "./../../assets/homePage.png";
import "./home.css";

export default function Home() {
  return (
    <><Elevation elevation="2">
      <div
        style={{ zIndex: "1", left: "0", backgroundColor: "#F5F5F5", marginTop: "70px", height: "50px", position: "fixed", border: "1px solid #F5F5F5", width: "100%", }}
      >
        <TypoBody
          level={1}
          style={{
            fontSize: "14px",
            width: "100%",
            height: "30px",
            position: "relative",
            top: "32%",
            marginLeft: "2%",
            left: 0,
          }}
        > <span>
            <a onClick={() => history.push("/home")}>Home</a>           </span>
        </TypoBody>
      </div>
    </Elevation><div className="homeMain">
        <Box
          component="img"
          className="homeImage"
          src={Homepage} />
        <div className="homeParent">
          <div className="homeCarbon">
            <TypoDisplay level={5}>What is Carbon Cloud?</TypoDisplay>
            <br /><br />{" "}
            <Typography type="body1">
              The <TypoLink>Bayer Carbon Program in Europe </TypoLink>brings together expert insights
              from subject matter experts across the agri-food value chain to
              uncover climate-smart solutions that work for everyone. Carbon Cloud
              is a single stop platform to enable Bayer’s carbon projects with
              customers by automating/facilitating data collection, connecting it
              to measurement tools, supporting the construction of Reports based
              on GHG-P guidelines and finally displaying relevant data/results to
              Customers and Growers.
            </Typography>
          </div>
          <div className="Carbon">
            <TypoDisplay level={5}>What does it do?</TypoDisplay>
            <br /><br />{" "}
            <Typography type="body1">
              <ol type="1">
                <li> Facilitate field data collection</li>
                <li>
                  {" "}
                  Automate and/or improve the way data is flowing from the field à
                  quantification methodology/model à final report
                </li>
                <li> Dashboard with main project’s outcomes and relevant data</li>
                <li> Overall project track & management</li>
              </ol>
            </Typography>
          </div>
        </div>
        <Box
          style={{ width: "1200px", height: "340px", backgroundColor: "#F5F5F5" }}
        >
          {" "}
          <div className="homeParent">

            <div className="homeCarbon">
              <div className="services"> <TypoDisplay level={4}>
                Services
              </TypoDisplay>
                <br />
                <br /></div>
              <TypoDisplay level={5}>Emission & SOC Quantification</TypoDisplay>
              <br />{" "}<br />
              <Typography type="body1">
                Its a service collecting real data from farms in order to quantify
                the current GHG Emissions and/or Soil Organic Carbon, which will
                be used to generate a Report based on GHG-P that can be used by
                companies to account it on their Scope 3 (or Scope 1 in case of
                companies with their own farms).
              </Typography>
            </div>
            <div className="Carbon">
              <div className="services"> <TypoDisplay level={4}>

              </TypoDisplay>
                <br />
                <br /></div>
              <TypoDisplay level={5}>Feasibility Study</TypoDisplay>
              <br />{" "}<br />
              <Typography type="body1">
                It’s a service targeting a potential assessment of carbon
                practices adoption on a given region/crop/grower pool given the
                current field management and the viability of more advanced
                projects which will generate assets.
              </Typography>
            </div>
          </div>
        </Box>
        <div className="homeParent">
          <div className="homeCarbon">
            <TypoDisplay level={6}>Get in Touch</TypoDisplay>
            <br />{" "}

            <Typography type="body1">
              Email us on <Typography type="body1-bold">EuropeanCarbonLab@bayer.com</Typography>
            </Typography>
          </div>

        </div>
      </div></>
  );
}
