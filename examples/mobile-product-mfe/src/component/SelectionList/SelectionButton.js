import { useContext } from "react"
import styled from "styled-components"

import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import ZoomHandler from "../../services/ZoomHandler"

const Button = styled.button`
	display: inline-block;
	border-radius: 3px;
	padding: 0.5rem 0;
	margin: 0.5rem 1rem;
	width: 10rem;
	background: light gray;
	color: gray;
	border: 2px solid black;
	text-align: center;
`

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
