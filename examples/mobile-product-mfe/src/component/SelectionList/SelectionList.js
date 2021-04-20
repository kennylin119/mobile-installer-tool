import React, { useState, useContext } from "react";

// import context api
import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

import SelectionButton from "./SelectionButton";

const SelectionList = (props) => {
  console.log("[SelectionList]");
  const { data } = props;

  //   const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  //   const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  //   console.log("[printing zoomReqVal");
  //   console.log(zoomReqVal);

  //   console.log("[printing zoomResVal");
  //   console.log(zoomResVal);

  let output;
  if (data.OptionValues.length > 7) {
    output = (
      <p>
        {" "}
        This component is {data.OptionValues.length} length so it was not
        rendered. It will be a dropdown in the future{" "}
      </p>
    );
  } else {
    output = data.OptionValues.map((option) => {
      return <SelectionButton label={option.Label} section={data.Variable} keyValue={option.KeyValue}/>;
    });
  }

  return (
    <div>
      <h3>{data.Variable}</h3>
      {output}
    </div>
  );
};

export default SelectionList;
