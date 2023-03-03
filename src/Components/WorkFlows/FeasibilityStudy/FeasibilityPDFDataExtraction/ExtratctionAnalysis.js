import { useState, useEffect, useReducer } from "react";
import { Select, SelectOption, Textfield } from "@element/react-components";
import { GET_REQUEST } from '../../../Utilities/RestEndPoint';
import { YEAR_DROPDOWN, } from "../../CommonComponents/CommonStaticData";

export default function ExtractionAnalysis(props) {

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    return (
        <>
            {props?.defaultFeasibilityStudyState?.ExtractionDetails?.pdfExtractionData?.map((element, index) => (
                <div className="mainFeasibility">
                    <div className="selectionContent">
                        <div className="parentInput">
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="Absolute Potential"
                                    label="Absolute Potential"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Absolute Potential")}
                                    value={element["Absolute Potential"]} />
                            </div>
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    name="Hectares"
                                    onKeyDown={blockInvalidChar}
                                    label="Hectares"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Hectares")}
                                    value={element.Hectares} />
                            </div>
                        </div>
                        <br />
                        <div className="parentInput">
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="Potential Reduction"
                                    label="Potential Reduction"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Potential Reduction")}
                                    value={element["Potential Reduction"]} />
                            </div>
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="Quantification"
                                    label="Quantification"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Quantification")}
                                    value={element.Quantification} />
                            </div>
                        </div>
                        <br />
                        <div className="parentInput">
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="Sequestration"
                                    label="Sequestration"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Sequestration")}
                                    value={element.Sequestration} />
                            </div>
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="Quantification/ha"
                                    label="Quantification/ha"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Quantification/ha")}
                                    value={element["Quantification/ha"]} />
                            </div>
                        </div>
                        <br />
                        <div className="parentInput">
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="SOC Quantification/ha"
                                    label="SOC Quantification/ha"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "SOC Quantification/ha")}
                                    value={element["SOC Quantification/ha"]} />
                            </div>
                            <div className="childInputName">
                                <Textfield
                                    type="number"
                                    onKeyDown={blockInvalidChar}
                                    name="Reduction"
                                    label="Reduction"
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={e => props.handleChange(index, e, "Reduction")}
                                    value={element.Reduction} />
                            </div>
                        </div>
                        <br />
                        <div className="interventionInput">
                          
                        <Textfield
                id="InterventionsId"
                type="text"
                name="Interventions"
                label="Interventions"
                fullWidth={true}
                variant="outlined"
                textarea={true}
                onChange={e => props.handleChange(index, e,"Interventions")}
                
                value={element.Interventions} />
                        </div>
                        <br />
                    </div>
                </div>
            ))}
        </>
    );
}
