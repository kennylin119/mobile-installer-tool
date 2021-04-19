import React, { useState, useContext } from "react"

// import context api
import { Product } from "../../product-context"
import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import ZoomHandler from "../../services/ZoomHandler"

import SelectionButton from "./SelectionButton"

const SelectionList = (props) => {
	console.log("[SelectionList]")
	const { variable, data, cdn } = props

	console.log("[printing User Controls")
	console.log(data)

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
			<h3>{data.Variable}</h3>
			{data.OptionValues.map((option) => {
				return <SelectionButton label={option.Label} />
			})}
		</div>
	)
}

export default SelectionList
