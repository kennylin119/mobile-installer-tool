import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ZoomRequest, ZoomResponse } from '../../../zoom-context';
import Icon from './Icon';
import Grid from '../Grid/Grid';

const ImageContainer = styled.div`
  width: 100%;
  height: 175px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  overflow-x: auto;

  /* supposed to hide scrollbar but doesn't work */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// Function to parse an array into an object based on a key
const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};

const Icons = (props) => {
  console.log('[Icons]');
  const { variable, data, cdn } = props;

  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  console.log(variable);
  console.log(data);

  const zoomResComponentData = zoomResVal.Features[variable];

  const icons = data.OptionValues;
  const iconsObj = convertArrayToObject(icons, 'KeyValue');
  console.log(zoomResComponentData);

  if (zoomResComponentData?.ValidKeys.length > 7) {
    return (
      <Grid
        variable={variable}
        data={data}
        cdn={cdn}
        zoomResComponentData={zoomResComponentData}
        iconsObj={iconsObj}
      />
    );
  }
  return (
    <div>
      <h3>{data.Label}</h3>
      <ImageContainer>
        {/* <div className="img-container-title">{variable}</div> */}
        {zoomResComponentData?.ValidKeys.map((obj) => (
          <Icon
            key={obj}
            cdn={cdn}
            icon_key={obj}
            icon_value={iconsObj[obj].Label}
            icon_image={iconsObj[obj].Image}
            icon_selected={zoomResComponentData.CurrentValue}
            componentName={variable}
          />
        ))}
      </ImageContainer>
    </div>
  );
};

export default Icons;
