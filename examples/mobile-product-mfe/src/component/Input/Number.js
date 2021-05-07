/* eslint-disable operator-linebreak */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { StyleSheet, TextInput } from "react-native";
import { useState, useContext } from "react";
import styled from "styled-components";
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

const styles = StyleSheet.create({
  input: {
    color: (115, 115, 115),
    padding: (4, 10),
    height: 30,
    margin: 12,
    borderWidth: 1,
  },
});

const NumberInput = styled(TextInput)`
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
  updateZoomAndRenderLayout,
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
    updateZoomAndRenderLayout(await ZoomHandler(zoomReqVal));
  }
};

const Number = (props) => {
  console.log("[Number]");
  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, updateZoomAndRenderLayout } = useContext(ZoomResponse);

  let [displayError, setErrorDisplay] = useState(false);
  let [errMsg, setErrMsg] = useState("");

  const { input_name, data, convertObject } = props;

  let output = "";
  let header = "";
  console.log(data);

  if (data?.DefinitionType === "Provided") {
    console.log("[In Provided]");
    if (zoomResVal.Features[input_name]) {
      header = <h3>{data.Label}</h3>;
      output = (
        <TextInput
          keyboardType="decimal-pad"
          style={styles.input}
          name={input_name}
          onBlur={(e) => handleBlur(
            e,
            input_name,
            zoomReqVal,
            zoomResVal,
            setZoomReq,
            updateZoomAndRenderLayout,
            setErrorDisplay,
            setErrMsg
          )}
        />
      );
    }
  } else if (data?.DefinitionType === "Resultant") {
    //   if (zoomReqVal)
    console.log("[In Resultant]");
    // console.log(zoomResVal);
    console.log(data);
    header = <h3>{data.Label}</h3>;

    let result_attr = convertObject(zoomResVal.AdditionalAttributes, "Name");
    if (result_attr[input_name]) {
      console.log("[result_attr]");
      console.log(result_attr);
      let result_name = result_attr[input_name].Name;
      let result_val = result_attr[input_name].Value;

      output = (
        <p>
          {result_name}
          {' '}
          :
          {result_val}
        </p>
      );
    }
    // console.log(result_attr);
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
