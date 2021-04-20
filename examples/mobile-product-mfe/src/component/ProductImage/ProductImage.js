import React, { useContext } from "react"
import styled from "styled-components"

import { Product } from "../../product-context"
import PropTypes from "prop-types"
import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import ZoomHandler from "../../services/ZoomHandler"

const RenderImage = styled.img`
	height: 65%;
	width: 65%;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: auto;
	margin-right: auto;
	display: block;
`

const ProductImage = () => {
	//product context
	const context = useContext(Product)
	const product = context.product

	//zoom context
	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

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

