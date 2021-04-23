import React, { useContext } from "react";
import styled from "styled-components";

// Import context api
import { ZoomRequest, ZoomResponse } from "../../zoom-context";

import ZoomHandler from "../../services/ZoomHandler";
import default_img from "../../toolkit/default_image.jpeg";

const IconContainer = styled.div`
  position: relative;
  text-align: center;
  width: auto;
  height: auto;
  cursor: pointer;
  &:hover {
	  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  }
  &.selected {
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  }
`;

const MyIcon = styled.img`
  /* float: center; */
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  //when hover parent IconContainre, change brightness of image
  -webkit-filter: brightness(80%);
  ${IconContainer}:hover &{
    -webkit-filter: brightness(100%);
  }
  
`;

const IconText = styled.h1 `
  position:absolute;
  top:40%;
  left:50%;
  transform: translate(-50%,-50%);
  color:white;
  font-size: 5vw;

  @media only screen and (min-width: 768px) {
		// for desktop
		font-size: 30px;
	}
`;

// ! This is where we will call updateProduct through the context. No need to pass data back anymore :)
const handleOnClick = async (
  event,
  setShowModal,
  icon_key,
  icon_value,
  icon_selected,
  zoomReqVal,
  setZoomReq,
  zoomResVal,
  setZoomRes,
  componentName
) => {
  event.preventDefault();
  console.log("[handleOnClick]");

  console.log(icon_key);
  console.log(icon_value);
  console.log(icon_selected);

  setShowModal();

  if (icon_selected != icon_key) {
    // Modifying the zoom request
    await setZoomReq((prevState) => {
      // First, modify the prevState
      prevState.ZoomInput.Selections[componentName] = icon_key;

      // Then, spread the prevState into set function
      return {
        ...prevState,
      };
    });

    // call zoom handler and set the response
    let _response = await ZoomHandler(zoomReqVal);
    setZoomRes(_response);
  }
};

const ModalIcon = (props) => {
  // destructuring the props
  const {
    setShowModal,
    icon_key,
    cdn,
    icon_value,
    icon_image,
    icon_selected,
    componentName,
  } = props;

  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  let image;

  // Handle if there is an image or not
  if (cdn && icon_image) {
    image = `${cdn}${icon_image}`;
  } else {
    image = default_img;
  }

  return (
    <IconContainer onClick={(e) =>
      handleOnClick(
        e,
        setShowModal,
        icon_key,
        icon_value,
        icon_selected,
        zoomReqVal,
        setZoomReq,
        zoomResVal,
        setZoomRes,
        componentName
      )
    }>
      <MyIcon src={image} alt={"Image invalid"}></MyIcon>
      <IconText>{icon_value}</IconText>
    </IconContainer>
  );
};

export default ModalIcon;