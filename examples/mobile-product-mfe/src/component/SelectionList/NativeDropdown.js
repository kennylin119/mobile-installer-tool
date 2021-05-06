/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-state */
/* eslint-disable lines-between-class-members */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-class-assign */
import React, { useContext } from 'react';
import {
  View, Text, Picker, StyleSheet, Image,
} from 'react-native';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import { ZoomRequest, ZoomResponse } from '../../zoom-context';
import ZoomHandler from '../../services/ZoomHandler';

import default_img from '../../toolkit/default_image.jpeg';
import { Product } from '../../product-context';

/* i dont think this style is being used rn */
const StyledPicker = styled(Picker)`
  font-family: "HelveticaNeue Regular", sans-serif;
  border-radius: 3px;
`;

const handleOnClick = async (
  event,
  keyValue,
  label,
  section,
  zoomReqVal,
  zoomResVal,
  setZoomReq,
  updateZoomAndRenderLayout,
) => {
  console.log('[handle NativeDropdown click]');

  if (zoomReqVal.ZoomInput.Selections[section] !== keyValue) {
    await setZoomReq((prevState) => {
      prevState.ZoomInput.Selections[section] = keyValue;
      return prevState;
    });

    updateZoomAndRenderLayout(await ZoomHandler(zoomReqVal));
  }

  // const selected = document.querySelectorAll(`.${section}.selected`);
  // const new_selected = document.getElementById(label);

  // console.log('start print select');
  // console.log(selected);
  // console.log(section);
  // console.log(new_selected);
  // console.log(label);

  // if (selected && selected !== new_selected) {
  //   selected.classList.remove("selected");
  // }
  // if (selected) {
  //   for (let i = 0; i < selected.length; i++) {
  //     selected[i].classList.remove('selected');
  //   }
  // }
  // new_selected.classList.add('selected');
};

// class NativeDropdown extends React.Component {
//   state = { selection: '' };
//   convertArrayToObject = (array, key) => {
//     const initialValue = {};
//     return array.reduce((obj, item) => {
//       return {
//         ...obj,
//         [item[key]]: item,
//       };
//     }, initialValue);
//   };
//   updateSelection = (selection) => {
//     this.setState({ selection: selection });
//   };
// }

const NativeDropdown = (props) => {
  console.log('[NativeDropdown]');
  const { data, section } = props;

  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, updateZoomAndRenderLayout } = useContext(ZoomResponse);

  // View that is returned
  // TODO: When a color is selected, only display the coresponding image
  return (
    <StyledPicker
      onValueChange={(itemValue, itemPosition) => {
        console.log(itemValue);
        handleOnClick(
          null,
          itemValue,
          data.OptionValues.find((object) => object.KeyValue === itemValue)?.Label,
          section,
          zoomReqVal,
          zoomResVal,
          setZoomReq,
          updateZoomAndRenderLayout,
        );
      }}
    >
      {data.OptionValues.map((option) => {
        console.log(option);
        return (
          <StyledPicker.Item
            label={option.Label}
            value={option.KeyValue}
          />
        );
      })}
    </StyledPicker>
  );
};

export default NativeDropdown;
