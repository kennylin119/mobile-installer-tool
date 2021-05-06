import React, { useContext } from 'react';
import styled from 'styled-components';

// Import context api
import { ZoomRequest, ZoomResponse } from '../../zoom-context';

import ZoomHandler from '../../services/ZoomHandler';
import default_img from '../../toolkit/default_image.jpeg';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;


  cursor: pointer;

  /* &:hover {
	  border: 1px solid rgb(115, 115, 115);
	  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  }
  &.selected {
    border: 1px solid rgb(25, 130, 148);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  } */

`;

const MyIcon = styled.img`
  width: 24vw;
  height: 24vw;
  //when hover parent IconContainre, change brightness of image
  -webkit-filter: brightness(100%);
  ${IconContainer}:hover &{
    -webkit-filter: brightness(120%);
  } 

  @media only screen and (min-width: 768px) {
		// for desktop
		width: 190px;
    height: 190px;
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
  updateZoomAndRenderLayout,
  componentName,
) => {
  event.preventDefault();
  console.log('[handleOnClick]');

  console.log(icon_key);
  console.log(icon_value);
  console.log(icon_selected);

  setShowModal();
  document.querySelector('body').style.overflow = 'visible';
  document.getElementById('fixed-buttons').style.display = 'block';

  if (icon_selected !== icon_key) {
    // Modifying the zoom request
    await setZoomReq((prevState) => {
      // First, modify the prevState
      prevState.ZoomInput.Selections[componentName] = icon_key;

      // Then, spread the prevState into set function
      return {
        ...prevState,
      };
    });

    updateZoomAndRenderLayout(await ZoomHandler(zoomReqVal));
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
  const { zoomResVal, updateZoomAndRenderLayout } = useContext(ZoomResponse);

  let image;

  // Handle if there is an image or not
  if (cdn && icon_image) {
    image = `${cdn}${icon_image}`;
  } else {
    image = default_img;
  }

  return (
    <IconContainer onClick={(e) => handleOnClick(
      e,
      setShowModal,
      icon_key,
      icon_value,
      icon_selected,
      zoomReqVal,
      setZoomReq,
      zoomResVal,
      updateZoomAndRenderLayout,
      componentName,
    )}
    >
      <MyIcon src={image} alt="Image invalid" />
      <div style={{ 'text-align': 'center' }}>{icon_value}</div>
    </IconContainer>
  );
};

export default ModalIcon;
