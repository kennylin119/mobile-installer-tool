import React, { useContext } from "react"
import { Product } from "../../product-context"

const TestComponent = (props) => {
	console.log("[TestComponent]")

	return (
		<Product.Consumer>
			{({ product, updateProduct }) => {
				console.log("[Inside TestComponent Consumer]")
				console.log(product)

				updateProduct()
			}}
		</Product.Consumer>
	)
}

export default TestComponent
