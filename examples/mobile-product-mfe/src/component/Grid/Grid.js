import React, { useState, useContext } from "react"

import { ZoomRequest, ZoomResponse } from "../../zoom-context"
import GridModal from "./GridModal"

const handleOnClick = (showModal, setShowModal) => {
	setShowModal(!showModal)
}

const Grid = (props) => {
	console.log("[Grid]")
	const { variable, data, cdn, zoomResComponentData, iconsObj } = props
	let [showModal, setShowModal] = useState(false)

	const { zoomReqVal, setZoomReq } = useContext(ZoomRequest)
	const { zoomResVal, setZoomRes } = useContext(ZoomResponse)

	return (
		<div>
			<input type='submit' value='Choose Fabric' onClick={(e) => handleOnClick(showModal, setShowModal)}></input>
			{showModal ? <GridModal showModal={showModal} setShowModal={setShowModal} variable={variable} data={data} cdn={cdn} zoomResComponentData={zoomResComponentData} iconsObj={iconsObj} /> : null}
		</div>
	)
}

export default Grid
