import React, { useContext } from "react"

import { Product } from "../../product-context"
import { ZoomRequest, ZoomResponse } from "../../zoom-context"

import ZoomHandler from "../../services/ZoomHandler"
import default_img from "../../toolkit/default_image.jpeg"
import { handleIconCallback } from "./Icons"

// ! This is where we will call updateProduct through the context. No need to pass data back anymore :)
const handleOnClick = (event, key, value, selected, product, updateProduct, zoom, updateZoom) => {
	console.log("[handleOnClick]")
	console.log(key)
	console.log(value)
	console.log(selected)

	console.log(product)
	console.log(updateProduct)

	console.log(zoom)
	console.log(updateZoom)

	// prevent browser reload/refresh
	event.preventDefault()

	let res_obj

	// TODO: START HERE
	// modify the zoom before passing into zoom handler
	// call zoom handler
	// zoom handler sends the zoom object
	// get the response from zoom handler
	// ! NOTE: ZoomHanlder calls an async function. How do I await for ZoomHandler to finish, then print the result using log
	ZoomHandler(zoom)
		.then((response) => {
			console.log(response)
			//update the ZoomResponse
		})
		.catch((err) => {
			// Do something with the error
		})
}

const Icon = (props) => {
	// pass handleIconCallback function through props
	const { icon_key, cdn, icon_value, icon_image, icon_selected } = props

	const product_context = useContext(Product)
	const product = product_context.product
	const _updateProduct = product_context.updateProduct

	const zoom_request_context = useContext(ZoomRequest)
	const zoom = zoom_request_context.zoom
	const _updateZoom = zoom_request_context.updateZoom

	let image

	// Handle if there is an image or not
	if (cdn && icon_image) {
		image = `${cdn}${icon_image}`
	} else {
		image = default_img
	}

	return (
		<div id='icon-box'>
			{<img id='icon' src={image} alt={"Image invalid"} onClick={(e) => handleOnClick(e, icon_key, icon_value, icon_selected, product, _updateProduct, zoom, _updateZoom)}></img>}
			{icon_value}
		</div>
	)
}

export default Icon
