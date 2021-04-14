import React, { useContext } from "react"
import styled from "styled-components"

// Import context api
import { Product } from "../../product-context"
import { ZoomRequest, ZoomResponse } from "../../zoom-context"

import ZoomHandler from "../../services/ZoomHandler"
import default_img from "../../toolkit/default_image.jpeg"
import { handleIconCallback } from "./Icons"

const RenderIcon = styled.div`
	float: left;
	width: 60px;
	height: 60px;
	background-color: white;
`

const MyIcon = styled.img`
	float: center;
	width: 58px;
	height: 58px;
`

// ! This is where we will call updateProduct through the context. No need to pass data back anymore :)
const handleOnClick = (event, icon_key, icon_value, icon_selected, zoomReqVal, setZoomReq, zoomResVal, setZoomRes, componentName) => {
	event.preventDefault()
	console.log("[handleOnClick]")

	console.log(icon_key)
	console.log(icon_value)
	console.log(icon_selected)

	console.log(zoomReqVal)
	// console.log(setZoomReq)

	console.log("[start]")
	if (icon_selected != icon_key) {
		setZoomReq((prevState) => {
			prevState.ZoomInput.Selections[componentName] = icon_key
			return {
				...prevState,
			}
		})

		console.log(zoomReqVal)

		// call zoom handler and set the response
		ZoomHandler(zoomReqVal).then((response) => {
			setZoomRes(response)
		})

		console.log(zoomResVal)
	}
}

const Icon = (props) => {
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
