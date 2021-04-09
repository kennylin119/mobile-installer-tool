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
const handleOnClick = (event, icon_key, icon_value, icon_selected, zoomResVal, setZoomRes, zoomReqVal, setZoomReq) => {
	console.log("[handleOnClick]")
	console.log(icon_key)
	console.log(icon_value)
	console.log(icon_selected)

	console.log(zoomResVal)
	console.log(setZoomRes)

	console.log(zoomReqVal)
	console.log(setZoomReq)

	// prevent browser reload/refresh
	event.preventDefault()

	// TODO: START HERE
	// modify the zoomReqVal before passing into zoom handler
	// call zoom handler
	// zoom handler sends the zoomResVal object
	// ! NOTE: ZoomHanlder calls an async function. How do I await for ZoomHandler to finish, then print the result using log
	// ZoomHandler(zoomReqVal)
	// 	.then((response) => {
	// 		console.log(response)
	// 		//update the ZoomResponse
	// 	})
	// 	.catch((err) => {
	// 		// Do something with the error
	// 	})
}

const Icon = (props) => {
	// pass handleIconCallback function through props
	const { icon_key, cdn, icon_value, icon_image, icon_selected } = props

	const product_context = useContext(Product)
	const product = product_context.product
	const _updateProduct = product_context.updateProduct

	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

	console.log("[printing zoomResVal]")
	console.log(zoomResVal)

	let image

	// Handle if there is an image or not
	if (cdn && icon_image) {
		image = `${cdn}${icon_image}`
	} else {
		image = default_img
	}

	return (
		<RenderIcon>
			{<MyIcon src={image} alt={"Image invalid"} onClick={(e) => handleOnClick(e, icon_key, icon_value, icon_selected, zoomResVal, setZoomRes, zoomReqVal, setZoomReq)}></MyIcon>}
			{icon_value}
		</RenderIcon>
	)
}

export default Icon
