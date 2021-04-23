import React, { useContext } from "react";
import styled from "styled-components";

// Import context api
import { ZoomRequest, ZoomResponse } from "../../zoom-context";

import ZoomHandler from "../../services/ZoomHandler";
import default_img from "../../toolkit/default_image.jpeg";

const IconContainer = styled.div`
  /* transition: border 0.1s ease 0s;
  display: inline-block;
  margin: 0px 27px 10px 0px;
  border: 1px solid transparent;
  border-radius: 3px;
  vertical-align: top;
  width: 94px;
  text-align: center; */
  position: relative;
  text-align: center;

    width: auto;
    height: auto;

  cursor: pointer;
  

  &:hover {
	  border: 1px solid rgb(115, 115, 115);
	  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  }
  &.selected {
    border: 1px solid rgb(25, 130, 148);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  }
`;

const MyIcon = styled.img`
  /* float: center; */
  width: 100%;
  height: 100%;
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
    <IconContainer>
        <MyIcon
          src={image}
          alt={"Image invalid"}
          onClick={(e) =>
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
          }
        ></MyIcon>
      <h1 style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%)",color:"white", "font-size": "25px"}}>{icon_value}</h1>
    </IconContainer>
  );
};

export default ModalIcon;