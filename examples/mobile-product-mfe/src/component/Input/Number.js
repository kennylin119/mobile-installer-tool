/* eslint-disable operator-linebreak */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { useState, useContext } from "react";
import styled from "styled-components";
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

const NumberInput = styled.input`
  color: rgb(115, 115, 115);
  font-size: 16px;
  background: 0px 0px;
  padding: 4px 10px;
  font-family: inherit;
  display: inline-block;
  border-radius: 3px;
  border: 1px solid rgb(204, 204, 204);
`;

const handleBlur = async (
  event,
  input_name,
  zoomReqVal,
  zoomResVal,
  setZoomReq,
  setZoomRes,
  setErrorDisplay,
  setErrMsg
) => {
  console.log("inside handle Blur");
  event.preventDefault();
  // const input = event.target;
  // console.log(input);
  // console.log(event.target.value);
  console.log(zoomResVal);
  console.log(zoomReqVal);

  const input_value = event.target.value;

  const curr_value = zoomResVal.Features[input_name].CurrentValue;
  const min_value = zoomResVal.Features[input_name].From;
  const max_value = zoomResVal.Features[input_name].To;
  const step = zoomResVal.Features[input_name].Step;
  const unit = zoomResVal.Features[input_name].Unit;

  if (
    input_value < min_value ||
    input_value > max_value ||
    input_value % step !== 0
  ) {
    console.log("your value is bad!");
    setErrorDisplay(true);
    setErrMsg(
      `Please provide a number in the range of ${min_value} ${unit} and ${max_value} ${unit} in steps of ${step} ${unit}`
    );
    // console.log(displayError);
  } else if (curr_value !== event.target.value) {
    await setZoomReq((prevState) => {
      prevState.ZoomInput.Selections[input_name] = event.target.value;
      return prevState;
    });
    setErrorDisplay(false);
    setZoomRes(await ZoomHandler(zoomReqVal));
  }
};

const Number = (props) => {
  console.log("[Number]");
  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  let [displayError, setErrorDisplay] = useState(false);
  let [errMsg, setErrMsg] = useState("");

  const { input_name, data } = props;

  let output = "";
  let header = "";

  if (data?.DefinitionType === "Provided") {
    if (zoomResVal.Features[input_name]) {
      header = <h3>{data.Label}</h3>;
      output = (
        <NumberInput
          type="number"
          pattern="[0-9]*"
          inputmode="decimal"
          name={input_name}
          onBlur={(e) => handleBlur(
            e,
            input_name,
            zoomReqVal,
            zoomResVal,
            setZoomReq,
            setZoomRes,
            setErrorDisplay,
            setErrMsg
          )}
        />
      );
    }
  } else if (data?.DefinitionType === "Resultant") {
    //   if (zoomReqVal)
    // console.log(zoomReqVal);
    console.log(zoomResVal);
    header = <h3>{data.Label}</h3>;
    let result_name = zoomResVal.AdditionalAttributes[0].Name;
    let result_val = zoomResVal.AdditionalAttributes[0].Value;

    output = (
      <p>
        {result_name}
        {' '}
        :
        {result_val}
      </p>
    );
  }
  return (
    <div>
      {header}
      {output}
      {displayError && (
      <p>
        {' '}
        {errMsg}
        {' '}
      </p>
      )}
    </div>
  );
};

export default Number;
