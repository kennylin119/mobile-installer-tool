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

const ProductImage = (props) => {
	//product context
	const context = useContext(Product)
	const product = context.product

	//zoom context
	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

	console.log("ZOOOOM RES:")
	console.log(zoomResVal)

	const cdn = product.CDNPrefix
	const path = "toolkit/ALISSE/Toolkit_Definition_Value_Image_"+zoomResVal?.AdditionalAttributes[0]?.Name+"_"+zoomResVal?.AdditionalAttributes[0]?.Value+".png"

	const link = cdn + path


	if(zoomResVal){
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
				<RenderImage></RenderImage>
			</div>
		)
	}
}

ProductImage.propTypes = {}

export default ProductImage
