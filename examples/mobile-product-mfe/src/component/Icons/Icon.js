import React, { useContext } from "react"
import styled from "styled-components"

// Import context api
import { ZoomRequest, ZoomResponse } from "../../zoom-context"

import ZoomHandler from "../../services/ZoomHandler"
import default_img from "../../toolkit/default_image.jpeg"

const RenderIcon = styled.div`
	float: left;
	width: 100px;
	height: 95px;
	background-color: white;
`

const MyIcon = styled.img`
	float: center;
	width: 60px;
	height: 80px;
	padding: 0.5rem 0;
	margin: 0.5rem 1rem;
`

// ! This is where we will call updateProduct through the context. No need to pass data back anymore :)
const handleOnClick = async (event, icon_key, icon_value, icon_selected, zoomReqVal, setZoomReq, zoomResVal, setZoomRes, componentName) => {
	event.preventDefault()
	console.log("[handleOnClick]")

	console.log(icon_key)
	console.log(icon_value)
	console.log(icon_selected)

	if (icon_selected != icon_key) {
		// Modifying the zoom request
		await setZoomReq((prevState) => {
			// First, modify the prevState
			prevState.ZoomInput.Selections[componentName] = icon_key

			// Then, spread the prevState into set function
			return {
				...prevState,
			}
		})

		// call zoom handler and set the response
		let _response = await ZoomHandler(zoomReqVal)
		setZoomRes(_response)
	}
}

const Icon = (props) => {
	// destructuring the props
	const { icon_key, cdn, icon_value, icon_image, icon_selected, componentName } = props

	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

	let image

	// Handle if there is an image or not
	if (cdn && icon_image) {
		image = `${cdn}${icon_image}`
	} else {
		image = default_img
	}

	return (
		<RenderIcon>
			{<MyIcon src={image} alt={"Image invalid"} onClick={(e) => handleOnClick(e, icon_key, icon_value, icon_selected, zoomReqVal, setZoomReq, zoomResVal, setZoomRes, componentName)}></MyIcon>}
			{icon_value}
		</RenderIcon>
	)
}

export default Icon
