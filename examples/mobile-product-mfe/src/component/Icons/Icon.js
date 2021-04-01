import React, { useContext } from "react"
import { Product } from "../../product-context"

import default_img from "../../toolkit/default_image.jpeg"
import { handleIconCallback } from "./Icons"

// ! This is where we will call updateProduct through the context. No need to pass data back anymore :)
const handleOnClick = (event, key, value, selected, updateProduct) => {
	console.log(key)
	console.log(value)
	console.log(selected)
	console.log(updateProduct)

	// prevent browser reload/refresh
	event.preventDefault()

	// handleIconCallback(key, value, selected)
}

const Icon = (props) => {
	// pass handleIconCallback function through props
	const { icon_key, cdn, icon_value, icon_image, icon_selected } = props
	const context = useContext(Product)
	const _updateProduct = context.updateProduct

	let image

	// Handle if there is an image or not
	if (cdn && icon_image) {
		image = `${cdn}${icon_image}`
	} else {
		image = default_img
	}

	return (
		<div id='icon-box'>
			{<img id='icon' src={image} alt={"Image invalid"} onClick={(e) => handleOnClick(e, icon_key, icon_value, icon_selected, _updateProduct)}></img>}
			{icon_value}
		</div>
	)
}

export default Icon
