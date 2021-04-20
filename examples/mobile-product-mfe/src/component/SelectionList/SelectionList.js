import React, { useState, useContext } from "react";

// import context api
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

import NativeDropdown from "./NativeDropdown";
import SelectionButton from "./SelectionButton";

const SelectionList = (props) => {
  console.log("[SelectionList]");
  const { data, variable } = props;

  let output;
  if (data.OptionValues.length > 7) {
    output = <NativeDropdown variable={variable} data={data} />;
    //   <p>
    //     {" "}
    //     This component is {data.OptionValues.length} length so it was not
    //     rendered. It will be a dropdown in the future{" "}
    //   </p>
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
      {output}
    </div>
  );
};

export default SelectionList;
