import { useContext } from "react"
import styled from "styled-components"

import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import ZoomHandler from "../../services/ZoomHandler"

const Button = styled.button`
  display: inline-block;
  margin: 0em 1em 0em 0em;
  /* top left/right bottom*/
  padding: 0.5em 1.5em 0.5em;
  /* how to add padding to text?*/
  
  height: 3em;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  font-family: "HelveticaNeue Regular", sans-serif;
  border: none;
  border-radius: 2px;

  line-height: 1em;
  text-align: center;

  &:hover {
    background: #CECECE;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
	font-weight: bold;
	border: .5px solid #808080;
  }
`;

const handleOnClick = async (event, keyValue, section, zoomReqVal, zoomResVal, setZoomReq, setZoomRes) => {
	console.log("[handle SelectionButton click]")

	// prevents broswer refresh
	event.preventDefault()
	if (zoomReqVal.ZoomInput.Selections[section] !== keyValue) {
		await setZoomReq((prevState) => {
			prevState.ZoomInput.Selections[section] = keyValue

			return prevState
		})

		let _response = await ZoomHandler(zoomReqVal)
		setZoomRes(_response)
	}
}

const SelectionButton = (props) => {
	const { label, section, keyValue } = props

	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

	console.log("[SelectionButton]")

	// console.log("[printing zoomReqVal");
	// console.log(zoomReqVal);

	// console.log("[printing zoomResVal");
	// console.log(zoomResVal);

	return <Button onClick={(e) => handleOnClick(e, keyValue, section, zoomReqVal, zoomResVal, setZoomReq, setZoomRes)}> {label} </Button>
}

export default SelectionButton
