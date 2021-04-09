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
	const {zoomReqVal,setZoomReq} = useContext(ZoomRequest)
	const {zoomResVal,setZoomRes} = useContext(ZoomResponse)
		

	const cdn = product.CDNPrefix
	const path = "toolkit/ALISSE/Toolkit_Definition_Value_Image_PSTORE_MODEL_HW-S-AZ-S-10101-10101-AZ-E.png"

	const link = cdn + path

	return (
		<div>
			{/* <p>This Is where ProductImage should be</p> */}
			<RenderImage src={link}></RenderImage>
			<h2>{zoomResVal}</h2>
			<button onClick={()=>setZoomRes("Testing Request")}>Click to change zoomRes</button>
			<h2>{zoomReqVal}</h2>
			<button onClick={()=>setZoomReq("Testing Response")}>Click to change zoomReq</button>
		</div>
	)
}

ProductImage.propTypes = {}

export default ProductImage
