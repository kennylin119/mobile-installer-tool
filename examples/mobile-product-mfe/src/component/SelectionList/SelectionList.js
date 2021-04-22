import React, { useState, useContext } from "react";
import styled from "styled-components";

// import context api
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

import NativeDropdown from "./NativeDropdown";
import SelectionButton from "./SelectionButton";

const HScroller = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  flex-direction: row;

  /* supposed to hide scrollbar but doesn't work */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectionList = (props) => {
  console.log("[SelectionList]");
  const { data, variable } = props;

  let output;
  if (data.OptionValues.length > 7) {
    output = <NativeDropdown data={data} />;
  } else {
    output = data.OptionValues.map((option) => {
      return (
        <SelectionButton
          label={option.Label}
          section={variable}
          keyValue={option.KeyValue}
        />
      );
    });
  }

  return (
    <div>
      <h3>{variable}</h3>
      <HScroller>{output}</HScroller>
    </div>
  );
};

export default SelectionList;
