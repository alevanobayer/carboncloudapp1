import { useState, useEffect } from "react";
import {
  TypoBody,
  Textfield,
  Select,
  SelectOption,
  Button, Radio
} from "@element/react-components";
import { Accordion } from "react-bootstrap";
import "./feasibility.css";
import TillagePractises from "./TillagePractises";
import FertilizerType from "./FetilizerType";
import AgroChemicalDetails from "./AgroChemicalDetails";
import IrrigationDetails from "./IrrigationDetails";
import EnergyFuelData from "./EnergyFuelData";
import AreaDescriptionDetails from "./AreaDescriptionDetails";

export default function FeasibilityStudy(props) {


  const defaultData = props?.defaultFeasibilityStudyState;
  const [questions, setQuestionsData] = useState(defaultData);
  const [completedStep, setCompletedStep] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    let screenName = "";
    let booleanValue = false;
    if(props?.editData === undefined){
      if (Object.keys(props.completed).length === 0) {
        screenName = "Project Selection";
        booleanValue = true;
      } else if (Object.keys(props.completed).length === 1) {
        screenName = "Farmer Consent";
        booleanValue = true; //Fill farmer consent data
      } else if (Object.keys(props.completed).length === 2) {
        screenName = "Machine Details";
        booleanValue = true; //Fill machine data
      }
    }

    setCompletedStep(screenName);
    setIsDisabled(booleanValue);

  }, [props.completed]);
  const handleChange = (questionNo, event, name) => {
    const changeQuestion =
      props?.defaultFeasibilityStudyState?.feasibilityStudyData
        ?.questionsAndAnswers[questionNo];
    changeQuestion[name] = event.target.value;
    const data = {
      ...props?.defaultFeasibilityStudyState?.feasibilityStudyData
        ?.questionsAndAnswers,
    };
    props.updateFeasibilityStudyDetailsHandler({
      questionsAndAnswers:
        props.defaultFeasibilityStudyState.feasibilityStudyData
          .questionsAndAnswers,
    });
  };
  return (
    <><Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Current Farming Practice</Accordion.Header>
        <Accordion.Body>
          <TypoBody level={1} className="labelCls">
          1.Please describe current production approach and land
            management applied (practices over last 3 years) on the project
            area:
          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            label="Answer"
            name="1.1"
            variant='embedded'
            disabled={isDisabled}
            onChange={(event) => handleChange(0, event, "1.1")}
            value={
              props?.defaultFeasibilityStudyState?.feasibilityStudyData
                ?.questionsAndAnswers[0][1.1]
            }
          />
          <br />
          <TypoBody level={1} className="labelCls">
            2. Please describe current tillage practices applied:

          </TypoBody>
         
          <TillagePractises
            isDisabled={isDisabled}
            questions={props?.defaultFeasibilityStudyState}
            questionArray={
              props?.defaultFeasibilityStudyState.feasibilityStudyData
                .questionsAndAnswers[1].subQuestionsAndSubAnswers
            }
            questionNo={"question1"}
            {...props}
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
          3. Please describe current planting approach and techniques
            (e.g. manual planting, seedlings from nursery, direct seeding):

          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            name="1.3"
            variant='embedded'
            label="Answer"
            disabled={isDisabled}
            onChange={(event) => handleChange(2, event, "1.3")}
            value={
              props?.defaultFeasibilityStudyState.feasibilityStudyData
                .questionsAndAnswers[2]["1.3"]
            }
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
            4. Please describe if cover crops are planted between tomatoes
            rows or after harvesting on the field (during winter):

          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            name="1.4"
            variant='embedded'
            label="Answer"
            disabled={isDisabled}
            onChange={(event) => handleChange(3, event, "1.4")}
            value={
              props?.defaultFeasibilityStudyState.feasibilityStudyData
                .questionsAndAnswers[3]["1.4"]
            }
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
            5. Please describe if crop rotation is being applied on the
            field:
          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            name="1.5"
            variant='embedded'
            label="Answer"
            disabled={isDisabled}
            onChange={(event) => handleChange(4, event, "1.5")}
            value={
              props?.defaultFeasibilityStudyState.feasibilityStudyData
                .questionsAndAnswers[4]["1.5"]
            }
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
            6. Is fertilizer (synthetic or organic, N, P, K), manure and
            other inputs (e.g. green manure, mulch, compost, gypsum, liming)
            used on the fields? Please indicate type and amount applied per ha
            and year, as well as timing of application (if varying between
            years, please indicate range and average):

          </TypoBody>
          <FertilizerType
            isDisabled={isDisabled}
            questions={props?.defaultFeasibilityStudyState}
            questionArray={
              questions.feasibilityStudyData.questionsAndAnswers[5]
                .subQuestionsAndSubAnswers
            }
            questionNo={"question1"}
            {...props}
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
            7. Please describe current weed and pest control (type and
            amount applied):
          </TypoBody>
          <AgroChemicalDetails
            isDisabled={isDisabled}
            questions={props?.defaultFeasibilityStudyState}
            questionArray={
              questions.feasibilityStudyData.questionsAndAnswers[6]
                .subQuestionsAndSubAnswers
            }
            questionNo={"question1"}
            {...props}
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
          8. Is integrated pest management (combination of improved
            genetics, chemical protection, and biological solutions such as
            predatory insects to protect the tomatoes) applied? Please
            describe:
          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            disabled={isDisabled}
            variant='embedded'
            label="Answer"
            name="1.8"
            onChange={(event) => handleChange(7, event, "1.8")}
            value={
              questions.feasibilityStudyData.questionsAndAnswers[7]["1.8"]
            }
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
          9. Please describe current harvesting techniques (including
            machinery used):
          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            disabled={isDisabled}
            variant='embedded'
            label="Answer"
            name="1.9"
            onChange={(event) => handleChange(8, event, "1.9")}
            value={
              questions.feasibilityStudyData.questionsAndAnswers[8]["1.9"]
            }
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
            10. Please indicate current yield per year for main crop
            (tomatoes). If there is significant variation between years,
            please indicate lower and upper levels as well as average yield:

          </TypoBody>
          <Textfield
            id="fname"
            type="text"
            name="1.10"
            disabled={isDisabled}
            variant='embedded'
            label="Answer"
            onChange={(event) => handleChange(9, event, "1.10")}
            value={
              questions.feasibilityStudyData.questionsAndAnswers[9]["1.10"]
            }
          />
          <br />
          <br />
          <TypoBody level={1} className="labelCls">
            11. Please provide current soil organic carbon levels for the
            fields (if available):
          </TypoBody>
          <Textfield
            id="fname"
            variant='embedded'
            label="Answer"
            disabled={isDisabled}
            type="text"
            name="1.11"
            onChange={(event) => handleChange(10, event, "1.11")}
            value={
              questions.feasibilityStudyData.questionsAndAnswers[10]["1.11"]
            }
          />
          <br />
          <br />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion><Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Energy & Water Usage</Accordion.Header>
          <Accordion.Body>
            <TypoBody level={1} className="labelCls">
              1. Please describe current irrigation practices.

            </TypoBody>
            <IrrigationDetails
              isDisabled={isDisabled}
              questions={props?.defaultFeasibilityStudyState}
              questionArray={
                questions.feasibilityStudyData.questionsAndAnswers[11]
                  .subQuestionsAndSubAnswers
              }
              questionNo={"question2"}
              {...props}
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              2. Please describe current energy and fuel usage from machinery
              and pump irrigation.
            </TypoBody>
            <EnergyFuelData
              isDisabled={isDisabled}
              questions={props?.defaultFeasibilityStudyState}
              questionArray={
                questions.feasibilityStudyData.questionsAndAnswers[12]
                  .subQuestionsAndSubAnswers
              }
              questionNo={"question3"}
              {...props}
            />
            <br />
            <br />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion><Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Project Area Description</Accordion.Header>
          <Accordion.Body>

            <TypoBody level={1} className="labelCls">
              1. Where is the location of the current project region (i.e.
              area encompassing project fields, not including settlements,
              forests)? Please provide a digital map with area boundary
              coordinates as georeferenced GIS data (ESRI shape files in WGS84
              coordinate system). If GIS capacity is not available, please
              provide a Google Earth kml/kmz files of the respective area
              clearly delineating the boundary.

            </TypoBody>
            <AreaDescriptionDetails
              isDisabled={isDisabled}
              questions={props?.defaultFeasibilityStudyState}
              questionArray={
                questions.feasibilityStudyData.questionsAndAnswers[13]
                  .subQuestionsAndSubAnswers
              }
              questionNo={"question4"}
              {...props}
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              2. What is the total area of the project area in ha (hectares)?
              This should include all fields that are considering changing
              cultivation method / practices with the goal of of GHG reduction.

            </TypoBody>
            <Textfield
              id="fname"
              type="text"
              name="4.2"
              variant='embedded'
              label="Answer"
              disabled={isDisabled}
              onChange={(event) => handleChange(14, event, "4.2")}
              value={
                questions.feasibilityStudyData.questionsAndAnswers[14]["4.2"]
              }
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              3. If the land is not owned by the farmer growing the main crop
              (tomatoes), is a lease of the land in place? If yes, when does the
              lease end?
            </TypoBody>
            <Textfield
              id="fname"
              type="text"
              name="4.3"
              variant='embedded'
              disabled={isDisabled}
              label="Answer"
              onChange={(event) => handleChange(15, event, "4.3")}
              value={
                questions.feasibilityStudyData.questionsAndAnswers[15]["4.3"]
              }
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              4. When did the current land holder (farmer) purchase or lease
              the land?
            </TypoBody>
            <Textfield
              id="fname"
              type="text"
              name="4.4"
              disabled={isDisabled}
              variant='embedded'
              label="Answer"
              onChange={(event) => handleChange(16, event, "4.4")}
              value={
                questions.feasibilityStudyData.questionsAndAnswers[16]["4.4"]
              }
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              5. Are there water bodies or rivers adjoining the project area?
              Please describe:
            </TypoBody>
            <Textfield
              id="fname"
              type="text"
              name="4.5"
              disabled={isDisabled}
              variant='embedded'
              label="Answer"
              onChange={(event) => handleChange(17, event, "4.5")}
              value={
                questions.feasibilityStudyData.questionsAndAnswers[17]["4.5"]
              }
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              6. Is the project area currently degraded (soil erosion, loss of
              vegetation cover, loss of productivity, classified as degraded
              land, etc.)? Please describe:

            </TypoBody>
            <Textfield
              id="fname"
              type="text"
              name="4.6"
              disabled={isDisabled}
              variant='embedded'
              label="Answer"
              onChange={(event) => handleChange(18, event, "4.6")}
              value={
                questions.feasibilityStudyData.questionsAndAnswers[18]["4.6"]
              }
            />
            <br />
            <br />
            <TypoBody level={1} className="labelCls">
              7. Does the project area include non-accessible or non-useable
              land (e.g. too steep, too remote)? If yes, please indicate area
              size.
            </TypoBody>
            <Textfield
              id="fname"
              type="text"
              name="4.7"
              disabled={isDisabled}
              variant='embedded'
              label="Answer"
              onChange={(event) => handleChange(19, event, "4.7")}
              value={
                questions.feasibilityStudyData.questionsAndAnswers[19]["4.7"]
              }
            />
            <br />
            <br />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion></>
  );
}
