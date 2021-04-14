import React, { useState, useContext } from "react"

// import context api
import { Product } from "../../product-context"
import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import ZoomHandler from "../../services/ZoomHandler"

import SelectionButton from "./SelectionButton"

const SelectionSlider = () => {
	const product_context = useContext(Product)
	const product = product_context.product
	const _updateProduct = product_context.updateProduct

	// console.log("[printing UI Template")
	// console.log(product)

	// console.log("[printing User Controls")
	// console.log(product.UserControls)

	// this might be the basis of the framework algorithm?
	let selectionLists = []
	let searchComponent = "SelectionList"
	for (let i = 0; i < product.UserControls.length; i++) {
		if (product.UserControls[i].ControlType === searchComponent) {
			selectionLists.push(product.UserControls[i])
		}
	}

	// console.log("[Printing Matched Components");
	// console.log(selectionLists);

	// console.log("[Printing Option Values]");
	// console.log(selectionLists[0].OptionValues);

	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

	// console.log("[printing zoomReqVal");
	// console.log(zoomReqVal);

	// console.log("[printing zoomResVal");
	// console.log(zoomResVal);
	return (
		<div>
			{selectionLists.map((list) => {
				return (
					<div>
						<h3>{list.Variable}</h3>
						{list.OptionValues.map((option) => {
							return <SelectionButton label={option.Label} />
						})}
					</div>
				)
			})}
		</div>
	)
}

export default SelectionSlider
