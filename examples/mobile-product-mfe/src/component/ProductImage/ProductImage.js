import React, { useContext } from "react"
import styled from "styled-components"

import { ZoomResponse } from "../../zoom-context"

const RenderImage = styled.img`
	//mobile first
	height: 90%;
	width: 90%;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: auto;
	margin-right: auto;
	display: block;

	@media only screen and (min-width: 768px) {
		// for desktop
		margin-left: 1em;
		height: 100%;
		width: 100%;
		max-width: 30em;
		margin-top: 50%;	
	}
`

const ProductImage = (props) => {
	//product
	const {product} = props;

	//zoom context
	const { zoomResVal } = useContext(ZoomResponse)

	//variables
	const name = zoomResVal?.AdditionalAttributes[0]?.Name
	const value = zoomResVal?.AdditionalAttributes[0]?.Value
	const cdn = product.CDNPrefix
	const path = "toolkit/ALISSE/Toolkit_Definition_Value_Image_" + name + "_" + value + ".png"

	//combine for final link
	const link = cdn + path


	if(name&&value){
		return (
			<div>
				{/* This Is where ProductImage should be */}
				<RenderImage src={link}></RenderImage>
			</div>
		)
	}
	else{
		return(
			<div>
				{/* Don't load anything since we don't have zoom response yet */}
			</div>
		)
	}
}

export default ProductImage

