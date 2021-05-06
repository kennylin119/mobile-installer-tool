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
  min_value,
  max_value,
  setErrorDisplay,
  displayError
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

  if (input_value < min_value || input_value > max_value) {
    console.log("your value is too big!");
    setErrorDisplay(true);
    // console.log(displayError);
  } else if (
    zoomReqVal.ZoomInput.Selections[input_name] !== event.target.value
  ) {
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

  const { input_name, data } = props;

  const min_value = zoomResVal.Features[input_name].From;
  const max_value = zoomResVal.Features[input_name].To;
  // let error_msg = `<p> Please provide a number in the range of ${min_value} and ${max_value} in steps of </p>`;

  let output = "";
  if (data?.DefinitionType === "Provided") {
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
          min_value,
          max_value,
          setErrorDisplay,
          displayError
        )}
      />
    );
  } else if (data?.DefinitionType === "Resultant") {
    //   if (zoomReqVal)
    // console.log(zoomReqVal);
    // console.log(zoomResVal);
    output = <p> This is a resultant </p>;
  }
  return (
    <div>
      <h3>{data.Label}</h3>
      {output}
      {/* {displayError && error_msg} */}
    </div>
  );
};

export default Number;
