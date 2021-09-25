/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useContext } from 'react';
import styled from 'styled-components';

// Import context api
import { ZoomRequest, ZoomResponse } from '../../../zoom-context';

import ZoomHandler from '../../services/ZoomHandler';
import default_img from '../../toolkit/default_image.jpeg';

const RenderIcon = styled.div`
  transition: border 0.1s ease 0s;
  display: inline-block;
  margin: 0px 27px 10px 0px;
  border: 1px solid transparent;
  border-radius: 3px;
  vertical-align: top;
  width: 94px;
  text-align: center;

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
  float: center;
  width: 60px;
  height: 80px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
`;

// ! This is where we will call updateProduct through the context. No need to pass data back anymore
// eslint-disable-next-line max-len
const handleOnClick = async (
  event,
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

  const selected = document.querySelectorAll(`.${componentName}.selected`);
  const new_selected = document.getElementById(icon_value);

  // console.log('start print select');
  // console.log(selected);
  // console.log(componentName);
  // console.log(new_selected);
  // console.log(icon_value);

  // if (selected && selected !== new_selected) {
  //   selected.classList.remove("selected");
  // }
  if (selected) {
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    }
  }

  new_selected.classList.add('selected');
};

const Icon = ({
  icon_key,
  cdn,
  icon_value,
  icon_image,
  icon_selected,
  componentName,
}) => {
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
    <RenderIcon id={icon_value} className={componentName}>
      <MyIcon
        src={image}
        alt="Image invalid"
        onClick={(e) => handleOnClick(
          e,
          icon_key,
          icon_value,
          icon_selected,
          zoomReqVal,
          setZoomReq,
          zoomResVal,
          updateZoomAndRenderLayout,
          componentName,
        )}
      />
      {' '}
      {icon_value}
      {' '}
    </RenderIcon>
  );
};

export default Icon;
