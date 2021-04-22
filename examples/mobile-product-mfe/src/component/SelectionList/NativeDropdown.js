import default_img from "../../toolkit/default_image.jpeg";
import { Product } from "../../product-context";
import React, { useContext } from "react";
import { View, Text, Picker, StyleSheet, Image } from "react-native";
import Button from "react-bootstrap/Button";
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";
import styled from "styled-components";

// const StyledPicker = styled(Picker)`
//   -webkit-box-align: center;
//   align-items: center;
//   display: flex;
//   flex: 1 1 0%;
//   flex-wrap: wrap;
//   padding: 2px 8px;
//   position: relative;
//   overflow: hidden;
//   box-sizing: border-box;
// `;

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
    <Picker>
      {data.OptionValues.map((option) => {
        return <Picker.Item label={option.Label} value={option.Label} />;
      })}
    </Picker>
  );
};

export default NativeDropdown;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "red",
  },
});
