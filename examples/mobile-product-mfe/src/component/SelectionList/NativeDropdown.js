import default_img from "../../toolkit/default_image.jpeg";
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from "react-native";
import Button from "react-bootstrap/Button";
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";
import styled from "styled-components";


/* i dont think this style is being used rn*/
const StyledPicker = styled(Picker)`
  font-family: "HelveticaNeue Regular", sans-serif;
  border-radius: 3px;
`;

class NativeDropdown extends React.Component {
  convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  state = { selection: "" };
  updateSelection = (selection) => {
    this.setState({ selection: selection });
  };
}

NativeDropdown = (props) => {
  const { data } = props;

  // Setting the Zoom context
  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  // View that is returned
  // TODO: When a color is selected, only display the coresponding image
  return (
    <StyledPicker>
      {data.OptionValues.map((option) => {
        return <StyledPicker.Item label={option.Label} value={option.Label} />;
      })}
    </StyledPicker>
  );
};

export default NativeDropdown;
