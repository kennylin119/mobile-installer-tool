import React, { useContext } from "react"
import { Product } from "../../product-context"
import PropTypes from "prop-types"

const ProductImage = (props) => {
	const context = useContext(Product)
	const product = context.product

	const cdn = product.CDNPrefix
	const path = "toolkit/ALISSE/Toolkit_Definition_Value_Image_PSTORE_MODEL_HW-S-AB-S-00100-AB.png"

	const link = cdn + path

	return (
		<div>
			<p>This Is where ProductImage should be</p>
			<img src={link} className='productImage'></img>
		</div>
	)
}

ProductImage.propTypes = {}

export default ProductImage
