/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Picker } from 'react-native';
import { ZoomRequest, ZoomResponse } from '../../../zoom-context';
import ZoomHandler from '../../services/ZoomHandler';

// Zoom response
const handleOnClick = async (event, keyValue, section, zoomReqVal, zoomResVal, setZoomReq, setZoomRes) => {
  console.log('[Handle Image-SelectionButton click]');

  // prevents broswer refresh
  event.preventDefault();
  if (zoomReqVal.ZoomInput.Selections[section] !== keyValue) {
    await setZoomReq((prevState) => {
      prevState.ZoomInput.Selections[section] = keyValue;

      return prevState;
    });

    const _response = await ZoomHandler(zoomReqVal);
    setZoomRes(_response);
  }
};

const NativeDropdownItem = (props) => {
  // Setting the props and Zoom res
  const { label, section, keyValue } = props;
  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  // Returning the picker item
  return (
    <Picker.Item label={label} value={label} onClick={(e) => handleOnClick(e, keyValue, section, zoomReqVal, zoomResVal, setZoomReq, setZoomRes)}>
      {' '}
      {label}
      {' '}
    </Picker.Item>
  );
};

export default NativeDropdownItem;
