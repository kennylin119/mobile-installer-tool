import { useContext } from "react";
import styled from "styled-components";

import { ZoomRequest, ZoomResponse } from "../../zoom-context";
import ZoomHandler from "../../services/ZoomHandler";

const Button = styled.button`
  display: inline-block;
  margin: 0em 1em 0em 0em;
  /* top left/right bottom*/
  padding: 0.5em 2.5em 0.5em;
  /* how to add padding to text?*/

  height: 3em;
  white-space: nowrap;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  font-family: "HelveticaNeue Regular", sans-serif;
  border: none;
  border-radius: 3px;

  line-height: 1em;
  text-align: center;

  &:hover {
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
    font-weight: bold;
    border: 0.5px solid #808080;
  }

  &.selected {
    background: #cecece;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
    font-weight: bold;
    border: 0.5px solid #115b67;
  }
`;

const handleOnClick = async (
  event,
  keyValue,
  label,
  section,
  zoomReqVal,
  zoomResVal,
  setZoomReq,
  setZoomRes
) => {
  console.log("[handle SelectionButton click]");

  // prevents broswer refresh
  event.preventDefault();
  if (zoomReqVal.ZoomInput.Selections[section] !== keyValue) {
    await setZoomReq((prevState) => {
      prevState.ZoomInput.Selections[section] = keyValue;
      return prevState;
    });

    setZoomRes(await ZoomHandler(zoomReqVal));
  }

  let selected = document.querySelectorAll(`.${section}.selected`);
  let new_selected = document.getElementById(label);

  console.log('start print select')
  console.log(selected);
  console.log(section);
  console.log(new_selected);
  console.log(label);
  
  // if (selected && selected !== new_selected) {
  //   selected.classList.remove("selected");
  // }
  if (selected ) {
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove("selected");
    }  
  }
  new_selected.classList.add("selected");
};

const SelectionButton = (props) => {
  const { label, section, keyValue } = props;
  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, setZoomRes } = useContext(ZoomResponse);

  console.log("[SelectionButton]");

  return (
    <Button
      id={label}
      className={section}
      onClick={(e) =>
        handleOnClick(
          e,
          keyValue,
          label,
          section,
          zoomReqVal,
          zoomResVal,
          setZoomReq,
          setZoomRes
        )
      }
    >
      {" "}
      {label}{" "}
    </Button>
  );
};

export default SelectionButton;
