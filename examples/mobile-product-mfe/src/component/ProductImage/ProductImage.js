import React, { useContext } from "react"
import styled from "styled-components"

import { Product } from "../../product-context"
import PropTypes from "prop-types"
import { ZoomRequest, ZoomResponse } from "../../zoom-context"

const RenderImage = styled.img`
	height: 65%;
	width: 65%;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: auto;
	margin-right: auto;
	display: block;
`

import ZoomHandler from "../../services/ZoomHandler"

const ProductImage = (props) => {
	//product context
	const context = useContext(Product)
	const product = context.product

	//zoom context
	const zoomReq = useContext(ZoomRequest).zoom

	const ZoomRescontext = useContext(ZoomResponse).zoom

	let res = ZoomHandler(zoomReq)

	console.log("ZOOOOOM")

	console.log(res)

		

	
	//console.log(zoom)

	// console.log('zoom:')
	// console.log(zoom)
	// let model;
	// if(zoom?.AdditionalAttributes[0]?.PSTORE_MODEL){
	// 	model = zoom.AdditionalAttributes[0].PSTORE_MODEL;
	// }

	const cdn = product.CDNPrefix
	const path = "toolkit/ALISSE/Toolkit_Definition_Value_Image_PSTORE_MODEL_HW-S-AZ-S-10101-10101-AZ-E.png"

	const link = cdn + path

	return (
		<div>
			{/* <p>This Is where ProductImage should be</p> */}
			<RenderImage src={link}></RenderImage>
		</div>
	)
}

ProductImage.propTypes = {}

export default ProductImage
