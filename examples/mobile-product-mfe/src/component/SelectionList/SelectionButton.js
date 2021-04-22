import React, { useContext } from "react";
import styled from "styled-components";

import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 10rem;
  background: #E1DCDC;
  color: gray;
  border: .0px #808080;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #CECECE;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  }
`;

const handleOnClick = async (event, keyValue, section, zoomReqVal, zoomResVal, setZoomReq, setZoomRes) => {
  console.log("[handle SelectionButton click]");

  // prevents broswer refresh
  event.preventDefault();
  if (zoomReqVal.ZoomInput.Selections[section] !== keyValue) {
    await setZoomReq((prevState) => {
      prevState.ZoomInput.Selections[section] = keyValue;
  
      return prevState;
    })

    let _response = await ZoomHandler(zoomReqVal);
    setZoomRes(_response);
  }
};

const SelectionButton = (props) => {
  const { label, section, keyValue } = props;

  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  console.log("[SelectionButton]");

  // console.log("[printing zoomReqVal");
  // console.log(zoomReqVal);

  // console.log("[printing zoomResVal");
  // console.log(zoomResVal);

  return (
    <Button onClick={(e) => handleOnClick(e, keyValue, section, zoomReqVal, zoomResVal, setZoomReq, setZoomRes)}> {label} </Button>
  )
};

export default SelectionButton;
