/* eslint-disable array-callback-return */
import { useContext } from 'react';
import styled from 'styled-components';

import { ZoomRequest, ZoomResponse } from '../../../zoom-context';
import ZoomHandler from '../../services/ZoomHandler';

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
  updateZoomAndRenderLayout,
  children_components,
) => {
  console.log('[handle SelectionButton click]');

  // prevents broswer refresh
  event.preventDefault();
  if (zoomReqVal.ZoomInput.Selections[section] !== keyValue) {
    await setZoomReq((prevState) => {
      prevState.ZoomInput.Selections[section] = keyValue;

      // remove any child dependencies selections
      if (children_components) {
        children_components.map((child) => {
          if (prevState.ZoomInput.Selections[child]) {
            delete prevState.ZoomInput.Selections[child];
          }
        });
      }

      return prevState;
    });

    updateZoomAndRenderLayout(await ZoomHandler(zoomReqVal));
  }

  const selected = document.querySelectorAll(`.${section}.selected`);
  const new_selected = document.getElementById(label);

  if (selected) {
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    }
  }
  new_selected.classList.add('selected');
};

const SelectionButton = (props) => {
  const {
    label, section, keyValue, children_components,
  } = props;
  const { zoomReqVal, setZoomReq } = useContext(ZoomRequest);
  const { zoomResVal, updateZoomAndRenderLayout } = useContext(ZoomResponse);

  console.log('[SelectionButton]');


  // show if icon is selected or not
  let selected = '';
  if (keyValue === zoomResVal.Features[section].CurrentValue) {
    selected = 'selected';
  }

  return (
    <Button
      id={label}
      className={`${section} ${selected}`}
      onClick={(e) => handleOnClick(
        e,
        keyValue,
        label,
        section,
        zoomReqVal,
        zoomResVal,
        setZoomReq,
        updateZoomAndRenderLayout,
        children_components,
      )}
    >
      {' '}
      {label}
      {' '}
    </Button>
  );
};

export default SelectionButton;
